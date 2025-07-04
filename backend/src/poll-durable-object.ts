import { DurableObject } from "cloudflare:workers";
import { count, eq, getTableColumns } from "drizzle-orm";
import { drizzle, DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";
import { migrate } from "drizzle-orm/durable-sqlite/migrator";
import { Env } from ".";
import migrations from "../drizzle/migrations";
import { poll, pollOptions, votes } from "./schema";
import { PollWithOptions, PollWithResults } from "./types";

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
  ): Promise<PollWithOptions> {
    const [createdPoll, createdPollOptions] = await Promise.all([
      this.db.insert(poll).values(pollInsert).returning(),
      this.db.insert(pollOptions).values(pollOptionsInsert).returning(),
    ]);

    return {
      ...createdPoll[0],
      options: createdPollOptions,
    };
  }

  async selectPoll(): Promise<PollWithOptions | null> {
    const [pollData, pollOptionsData] = await Promise.all([
      this.db.select().from(poll),
      this.db.select().from(pollOptions),
    ]);

    if (!pollData || pollData.length === 0) {
      return null;
    }

    return {
      ...pollData[0],
      options: pollOptionsData,
    };
  }

  async selectPollWithResults(): Promise<PollWithResults | null> {
    const pollData = await this.db.select().from(poll);

    if (!pollData || pollData.length === 0) {
      return null;
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
      ...pollData[0],
      options: optionsWithVotes,
      totalVotes,
    };
  }

  async insertVotes(voteInserts: (typeof votes.$inferInsert)[]) {
    await this.db.insert(votes).values(voteInserts).returning();
  }

  async _migrate() {
    migrate(this.db, migrations);
  }
}
