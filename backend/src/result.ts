import { TRPC_ERROR_CODE_KEY, TRPCError } from "@trpc/server";

export type Success<T> = {
  success: true;
  data: T;
};

export type Error = {
  success: false;
  message: string;
  tRPCError: TRPC_ERROR_CODE_KEY;
};

export type Result<T> = Success<T> | Error;

export function unwrapResult<T>(result: Result<T>): T {
  if (result.success) {
    return result.data;
  } else {
    throw new TRPCError({
      code: result.tRPCError,
      message: result.message,
    });
  }
}
