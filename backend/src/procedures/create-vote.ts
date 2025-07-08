import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Vote } from "../db/types";
import { procedure } from "../trpc";
import { unwrapResult } from "../utils/result";
import { validateTurnstileToken } from "../utils/turnstile";

const createVoteSchema = z.object({
  pollId: z.string().min(1, "Poll ID is required"),
  optionIds: z
    .array(z.number().int().positive())
    .min(1, "At least one option must be selected")
    .max(10, "Too many options selected"),
  turnstileToken: z.string(),
});

export const createVote = procedure
  .input(createVoteSchema)
  .mutation(async ({ input, ctx }): Promise<Vote[]> => {
    const turnstileResult = await validateTurnstileToken(
      input.turnstileToken,
      ctx
    );

    if (!turnstileResult.success) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid Turnstile token. Please try again.",
      });
    }

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
  });
