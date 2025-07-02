import { poll, pollOptions, votes } from "./schema";

export type Poll = typeof poll.$inferSelect;
export type PollInsert = typeof poll.$inferInsert;
export type PollOptions = typeof pollOptions.$inferSelect;
export type PollOptionsInsert = typeof pollOptions.$inferInsert;
export type Votes = typeof votes.$inferSelect;
export type VotesInsert = typeof votes.$inferInsert;

export type PollWithOptions = Poll & {
  options: PollOptions[];
};

export type PollWithResults = Poll & {
  options: (PollOptions & {
    votesCount: number;
  })[];
  totalVotes: number;
};
