import { DurableObject } from "cloudflare:workers";
import { count, eq, getTableColumns } from "drizzle-orm";
import { drizzle, DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import migrations from "../drizzle/migrations";
import { poll, pollOptions, votes } from "./db/schema";
import { PollWithOptions, PollWithResults, Vote, VoteInsert } from "./db/types";
import { Result } from "./utils/result";
import { WebSocketMessage } from "./utils/types";

export class PollDurableObject extends DurableObject {
  storage: DurableObjectStorage;
  db: DrizzleSqliteDODatabase<any>;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);

    this.storage = this.ctx.storage;
    this.db = drizzle(this.storage, { logger: false });

    ctx.blockConcurrencyWhile(async () => {
      await this._migrate();
    });
  }

  async createPoll(
    pollInsert: typeof poll.$inferInsert,
    pollOptionsInsert: (typeof pollOptions.$inferInsert)[]
  ): Promise<Result<PollWithOptions>> {
    const [createdPoll, createdPollOptions] = await Promise.all([
      this.db.insert(poll).values(pollInsert).returning(),
      this.db.insert(pollOptions).values(pollOptionsInsert).returning(),
    ]);

    return {
      success: true,
      data: {
        ...createdPoll[0],
        options: createdPollOptions,
      },
    };
  }

  async selectPoll(): Promise<Result<PollWithOptions>> {
    const [pollData, pollOptionsData] = await Promise.all([
      this.db.select().from(poll),
      this.db.select().from(pollOptions),
    ]);

    if (!pollData || pollData.length === 0) {
      return {
        success: false,
        message: "Poll not found.",
        tRPCError: "NOT_FOUND",
      };
    }

    return {
      success: true,
      data: {
        ...pollData[0],
        options: pollOptionsData,
      },
    };
  }

  async selectPollWithResults(): Promise<Result<PollWithResults>> {
    const pollData = await this.db.select().from(poll);

    if (!pollData || pollData.length === 0) {
      return {
        success: false,
        message: "Poll not found",
        tRPCError: "NOT_FOUND",
      };
    }

    const optionsWithVotes = await this.db
      .select({
        ...getTableColumns(pollOptions),
        votesCount: count(votes.id),
      })
      .from(pollOptions)
      .leftJoin(votes, eq(pollOptions.id, votes.pollOptionId))
      .groupBy(pollOptions.id, pollOptions.optionText);

    const totalVotes = optionsWithVotes.reduce(
      (sum, option) => sum + option.votesCount,
      0
    );

    return {
      success: true,
      data: {
        ...pollData[0],
        options: optionsWithVotes,
        totalVotes,
      },
    };
  }

  async insertVotes(voteInserts: VoteInsert[]): Promise<Result<Vote[]>> {
    const pollWithOptions = await this.selectPoll();

    if (!pollWithOptions.success) {
      return pollWithOptions;
    }

    const { closeAt, allowMultipleOptions, options } = pollWithOptions.data;

    // Check if poll is still open
    if (closeAt && new Date() > closeAt) {
      return {
        success: false,
        message: "Poll is closed",
        tRPCError: "BAD_REQUEST",
      };
    }

    // Check if multiple options are allowed
    if (!allowMultipleOptions && voteInserts.length > 1) {
      return {
        success: false,
        message: "Multiple options are not allowed for this poll",
        tRPCError: "BAD_REQUEST",
      };
    }

    const availableOptionIds = options.map((option) => option.id);

    // Validate that all voteInserts have valid pollOptionIds
    if (
      !voteInserts
        .map((vote) => vote.pollOptionId)
        .every((id) => availableOptionIds.includes(id))
    ) {
      return {
        success: false,
        message: "One or more option IDs are invalid",
        tRPCError: "BAD_REQUEST",
      };
    }

    const insertedVotes = await this.db
      .insert(votes)
      .values(voteInserts)
      .returning();

    const updatedPollWithResults = await this.selectPollWithResults();

    if (!updatedPollWithResults.success) {
      return updatedPollWithResults;
    }

    const resultsBroadcast: WebSocketMessage<PollWithResults> = {
      type: "results",
      data: updatedPollWithResults.data,
    };

    this.#broadcast(resultsBroadcast);

    return {
      success: true,
      data: insertedVotes,
    };
  }

  #broadcast(message: WebSocketMessage<any>) {
    this.ctx.getWebSockets().forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      }
    });
  }

  async fetch(request: Request): Promise<Response> {
    const webSocketPair = new WebSocketPair();
    const [client, server] = Object.values(webSocketPair);

    this.ctx.acceptWebSocket(server);

    server.addEventListener("close", (cls: CloseEvent) => {
      server.close(cls.code, "Durable Object is closing WebSocket");
    });

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }

  async _migrate() {
    migrate(this.db, migrations);
  }
}
