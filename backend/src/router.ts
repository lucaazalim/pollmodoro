import { createPoll, createVote, getPoll } from "./procedures";
import { router } from "./trpc";

export type AppRouter = typeof appRouter;

// Define the tRPC router
export const appRouter = router({
  createPoll,
  createVote,
  getPoll,
});
