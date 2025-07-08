import { initTRPC } from "@trpc/server";
import { TRPCContext } from "./utils/types";

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
export const procedure = t.procedure;
