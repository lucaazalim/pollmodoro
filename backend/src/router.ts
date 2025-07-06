import { initTRPC } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { unwrapResult } from "./result";
import { TRPCContext } from "./types";

export type AppRouter = typeof appRouter;

// Initialize tRPC context with the environment and request

const { router, procedure } = initTRPC.context<TRPCContext>().create();

// Zod schemas for input validation

const createPollSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(500, "Description too long").optional(),
  options: z
    .array(
      z.string().min(1, "Option cannot be empty").max(100, "Option too long")
    )
    .min(2, "At least 2 options are required")
    .max(10, "Maximum 10 options allowed"),
  pollType: z.enum(["multiple_choice"]).default("multiple_choice"),
  allowMultipleOptions: z.boolean().default(false),
  closeAt: z.string().datetime().optional(),
});

const createVoteSchema = z.object({
  pollId: z.string().min(1, "Poll ID is required"),
  optionIds: z
    .array(z.number().int().positive())
    .min(1, "At least one option must be selected")
    .max(10, "Too many options selected"),
});

const getPollSchema = z.object({
  id: z.string().min(1, "Poll ID is required"),
});

// Define the tRPC router
export const appRouter = router({
  // Create poll procedure
  createPoll: procedure
    .input(createPollSchema)
    .mutation(async ({ input, ctx }) => {
      const id = nanoid();
      const durableObjectId = ctx.env.POLL_DURABLE_OBJECT.idFromName(id);
      const stub = ctx.env.POLL_DURABLE_OBJECT.get(durableObjectId);

      const pollInsertData = {
        id,
        title: input.title,
        description: input.description || null,
        pollType: input.pollType,
        allowMultipleOptions: input.allowMultipleOptions,
        closeAt: input.closeAt ? new Date(input.closeAt) : null,
      };

      const pollOptionsInsertData = input.options.map((optionText) => ({
        optionText: optionText.trim(),
      }));

      const createdPoll = await stub.createPoll(
        pollInsertData,
        pollOptionsInsertData
      );

      return unwrapResult(createdPoll);
    }),

  // Create vote procedure
  createVote: procedure
    .input(createVoteSchema)
    .mutation(async ({ input, ctx }) => {
      const pollId = input.pollId;
      const id = ctx.env.POLL_DURABLE_OBJECT.idFromName(pollId);
      const stub = ctx.env.POLL_DURABLE_OBJECT.get(id);

      // Get voter IP
      const voterIp =
        ctx.request.headers.get("CF-Connecting-IP") ||
        ctx.request.headers.get("X-Forwarded-For") ||
        "unknown";

      // Insert votes
      const voteInserts = input.optionIds.map((optionId) => ({
        pollOptionId: optionId,
        voterIp,
      }));

      const insertedVotes = await stub.insertVotes(voteInserts);
      return unwrapResult(insertedVotes);
    }),

  // Get poll procedure
  getPoll: procedure.input(getPollSchema).query(async ({ input, ctx }) => {
    const pollId = input.id;
    const id = ctx.env.POLL_DURABLE_OBJECT.idFromName(pollId);
    const stub = ctx.env.POLL_DURABLE_OBJECT.get(id);

    const pollWithResults = await stub.selectPollWithResults();
    return unwrapResult(pollWithResults);
  }),
});
