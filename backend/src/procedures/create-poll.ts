import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { PollWithOptions } from "../db/types";
import { procedure } from "../trpc";
import { unwrapResult } from "../utils/result";
import { validateTurnstileToken } from "../utils/turnstile";

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
  turnstileToken: z.string(),
});

export const createPoll = procedure
  .input(createPollSchema)
  .mutation(async ({ input, ctx }): Promise<PollWithOptions> => {
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
  });
