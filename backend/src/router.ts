import { createPoll, createVote, getPoll } from "./procedures";
import { router } from "./trpc";

export type AppRouter = typeof appRouter;

export const appRouter = router({
  createPoll,
  createVote,
  getPoll,
});
