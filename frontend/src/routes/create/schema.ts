import { z } from "zod";

export const createPollSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(500, "Description too long").optional(),
  options: z
    .array(
      z.string().min(1, "Option cannot be empty").max(100, "Option too long"),
    )
    .min(2, "At least 2 options are required")
    .max(10, "Maximum 10 options allowed"),
  pollType: z.enum(["multiple_choice"]).default("multiple_choice"),
  allowMultipleOptions: z.boolean().default(false),
});

export type CreatePollSchema = typeof createPollSchema;
