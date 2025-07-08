import { initTRPC } from "@trpc/server";
import { TRPCContext } from "./utils/types";

// Initialize tRPC context with the environment and request
export const { router, procedure } = initTRPC.context<TRPCContext>().create();
