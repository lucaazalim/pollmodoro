import { z } from "zod";
import type { Vote } from "../db/types";
import { procedure } from "../trpc";
import { unwrapResult } from "../utils/result";
import { assertTurnstileToken } from "../utils/turnstile";

const createVoteSchema = z.object({
  pollId: z.string().min(1, "Poll ID is required"),
  optionIds: z
    .array(z.int().positive())
    .min(1, "At least one option must be selected")
    .max(10, "Too many options selected"),
  turnstileToken: z.string().min(1, "Turnstile token is required"),
});

export const createVote = procedure
  .input(createVoteSchema)
  .mutation(async ({ input, ctx }): Promise<Vote[]> => {
    await assertTurnstileToken(input.turnstileToken, ctx);

    const stub = ctx.env.POLL_DURABLE_OBJECT.getByName(input.pollId);

    const voterIp =
      ctx.request.headers.get("CF-Connecting-IP") ??
      ctx.request.headers.get("X-Forwarded-For") ??
      "unknown";

    const voteInserts = [...new Set(input.optionIds)].map((pollOptionId) => ({
      pollOptionId,
      voterIp,
    }));

    const insertedVotes = await stub.insertVotes(voteInserts);

    return unwrapResult(insertedVotes);
  });
