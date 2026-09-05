import { z } from "zod";
import type { PollWithResults } from "../db/types";
import { procedure } from "../trpc";
import { unwrapResult } from "../utils/result";

const getPollSchema = z.object({
  id: z.string().min(1, "Poll ID is required"),
});

export const getPoll = procedure
  .input(getPollSchema)
  .query(async ({ input, ctx }): Promise<PollWithResults> => {
    const stub = ctx.env.POLL_DURABLE_OBJECT.getByName(input.id);
    const pollWithResults = await stub.selectPollWithResults();

    return unwrapResult(pollWithResults);
  });
