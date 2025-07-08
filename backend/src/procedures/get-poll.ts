import { z } from "zod";
import { unwrapResult } from "../utils/result";
import { procedure } from "../trpc";

const getPollSchema = z.object({
  id: z.string().min(1, "Poll ID is required"),
});

export const getPoll = procedure
  .input(getPollSchema)
  .query(async ({ input, ctx }) => {
    const pollId = input.id;
    const id = ctx.env.POLL_DURABLE_OBJECT.idFromName(pollId);
    const stub = ctx.env.POLL_DURABLE_OBJECT.get(id);

    const pollWithResults = await stub.selectPollWithResults();
    return unwrapResult(pollWithResults);
  });
