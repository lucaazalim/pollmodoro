import { z } from "zod";
import { PollWithResults } from "../db/types";
import { procedure } from "../trpc";
import { unwrapResult } from "../utils/result";

const getPollSchema = z.object({
  id: z.string().min(1, "Poll ID is required"),
});

export const getPoll = procedure
  .input(getPollSchema)
  .query(async ({ input, ctx }): Promise<PollWithResults> => {
    const pollId = input.id;
    const id = ctx.env.POLL_DURABLE_OBJECT.idFromName(pollId);
    const stub = ctx.env.POLL_DURABLE_OBJECT.get(id);

    const pollWithResults = await stub.selectPollWithResults();
    return unwrapResult(pollWithResults);
  });
