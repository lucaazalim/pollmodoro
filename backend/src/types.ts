import { poll, pollOptions, votes } from "./schema";

export type Poll = typeof poll.$inferSelect;
export type PollInsert = typeof poll.$inferInsert;
export type PollOption = typeof pollOptions.$inferSelect;
export type PollOptionInsert = typeof pollOptions.$inferInsert;
export type Vote = typeof votes.$inferSelect;
export type VoteInsert = typeof votes.$inferInsert;

export type PollWithOptions = Poll & {
  options: PollOption[];
};

export type PollWithResults = Poll & {
  options: (PollOption & {
    votesCount: number;
  })[];
  totalVotes: number;
};

export type WebSocketMessage<T> = {
  type: "results";
  data: T;
};

export type TRPCContext = {
  env: Env;
  request: Request;
};
