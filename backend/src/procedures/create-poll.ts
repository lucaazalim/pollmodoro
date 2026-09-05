import { nanoid } from "nanoid";
import { z } from "zod";
import type { PollWithOptions } from "../db/types";
import { procedure } from "../trpc";
import { unwrapResult } from "../utils/result";
import { assertTurnstileToken } from "../utils/turnstile";

const createPollSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title too long"),
  description: z.string().trim().max(500, "Description too long").optional(),
  options: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Option cannot be empty")
        .max(100, "Option too long"),
    )
    .min(2, "At least 2 options are required")
    .max(10, "Maximum 10 options allowed"),
  pollType: z.enum(["multiple_choice"]).default("multiple_choice"),
  allowMultipleOptions: z.boolean().default(false),
  closeAt: z.iso.datetime().optional(),
  turnstileToken: z.string().min(1, "Turnstile token is required"),
});

export const createPoll = procedure
  .input(createPollSchema)
  .mutation(async ({ input, ctx }): Promise<PollWithOptions> => {
    await assertTurnstileToken(input.turnstileToken, ctx);

    const id = nanoid();
    const stub = ctx.env.POLL_DURABLE_OBJECT.getByName(id);

    const createdPoll = await stub.createPoll(
      {
        id,
        title: input.title,
        description: input.description || null,
        pollType: input.pollType,
        allowMultipleOptions: input.allowMultipleOptions,
        closeAt: input.closeAt ? new Date(input.closeAt) : null,
      },
      input.options.map((optionText) => ({ optionText })),
    );

    return unwrapResult(createdPoll);
  });
