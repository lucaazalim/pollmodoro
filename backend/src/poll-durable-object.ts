import { DurableObject } from "cloudflare:workers";
import { asc, inArray, sql } from "drizzle-orm";
import {
  drizzle,
  type DrizzleSqliteDODatabase,
} from "drizzle-orm/durable-sqlite";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import migrations from "../drizzle/migrations";
import * as schema from "./db/schema";
import { poll, pollOptions, votes } from "./db/schema";
import type {
  PollInsert,
  PollOptionInsert,
  PollWithOptions,
  PollWithResults,
  Vote,
  VoteInsert,
} from "./db/types";
import { fail, ok, type Result } from "./utils/result";
import type { WebSocketMessage } from "./utils/types";

/**
 * One Durable Object instance per poll. It owns the poll's SQLite database and
 * the WebSocket connections of everyone currently looking at the poll.
 */
export class PollDurableObject extends DurableObject<Env> {
  private readonly db: DrizzleSqliteDODatabase<typeof schema>;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);

    this.db = drizzle(ctx.storage, { schema, logger: false });

    // Make sure all migrations complete before any request touches the database.
    ctx.blockConcurrencyWhile(() => migrate(this.db, migrations));
  }

  async createPoll(
    pollInsert: PollInsert,
    optionInserts: PollOptionInsert[],
  ): Promise<Result<PollWithOptions>> {
    const createdPoll = this.db
      .insert(poll)
      .values(pollInsert)
      .returning()
      .get();
    const createdOptions = this.db
      .insert(pollOptions)
      .values(optionInserts)
      .returning()
      .all();

    return ok({ ...createdPoll, options: createdOptions });
  }

  async selectPoll(): Promise<Result<PollWithOptions>> {
    const pollRow = this.db.select().from(poll).get();

    if (!pollRow) {
      return fail("NOT_FOUND", "Poll not found.");
    }

    const options = this.db
      .select()
      .from(pollOptions)
      .orderBy(asc(pollOptions.id))
      .all();

    return ok({ ...pollRow, options });
  }

  async selectPollWithResults(): Promise<Result<PollWithResults>> {
    const current = await this.selectPoll();

    if (!current.success) {
      return current;
    }

    const totalVotes = current.data.options.reduce(
      (sum, option) => sum + option.votesCount,
      0,
    );

    return ok({ ...current.data, totalVotes });
  }

  async insertVotes(voteInserts: VoteInsert[]): Promise<Result<Vote[]>> {
    const current = await this.selectPoll();

    if (!current.success) {
      return current;
    }

    const { closeAt, allowMultipleOptions, options } = current.data;

    if (closeAt && closeAt.getTime() < Date.now()) {
      return fail("BAD_REQUEST", "This poll is closed.");
    }

    if (!allowMultipleOptions && voteInserts.length > 1) {
      return fail(
        "BAD_REQUEST",
        "This poll only allows a single option per vote.",
      );
    }

    const optionIds = new Set(options.map((option) => option.id));

    if (!voteInserts.every((vote) => optionIds.has(vote.pollOptionId))) {
      return fail("BAD_REQUEST", "One or more option IDs are invalid.");
    }

    const insertedVotes = this.db.transaction((tx) => {
      tx.update(pollOptions)
        .set({ votesCount: sql`${pollOptions.votesCount} + 1` })
        .where(
          inArray(
            pollOptions.id,
            voteInserts.map((vote) => vote.pollOptionId),
          ),
        )
        .run();

      return tx.insert(votes).values(voteInserts).returning().all();
    });

    const updated = await this.selectPollWithResults();

    if (updated.success) {
      this.#broadcast({ type: "results", data: updated.data });
    }

    return ok(insertedVotes);
  }

  /** Accepts a WebSocket that will receive live results for this poll. */
  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected a WebSocket upgrade request.", {
        status: 426,
      });
    }

    const { 0: client, 1: server } = new WebSocketPair();

    // Hibernatable WebSockets: the object can be evicted from memory while
    // connections stay open, and wakes up again to broadcast new results.
    this.ctx.acceptWebSocket(server);

    // Send the current results right away so a reconnecting client catches up.
    const current = await this.selectPollWithResults();

    if (current.success) {
      server.send(
        JSON.stringify({
          type: "results",
          data: current.data,
        } satisfies WebSocketMessage<PollWithResults>),
      );
    }

    return new Response(null, { status: 101, webSocket: client });
  }

  webSocketClose(ws: WebSocket, code: number, reason: string): void {
    ws.close(code, reason);
  }

  webSocketError(ws: WebSocket, error: unknown): void {
    console.error("WebSocket error:", error);
    ws.close(1011, "Unexpected WebSocket error.");
  }

  #broadcast(message: WebSocketMessage<PollWithResults>): void {
    const payload = JSON.stringify(message);

    for (const ws of this.ctx.getWebSockets()) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(payload);
      }
    }
  }
}
