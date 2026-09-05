import { TRPCError, type TRPC_ERROR_CODE_KEY } from "@trpc/server";

/**
 * Durable Object RPC calls cannot carry a `TRPCError` across the boundary
 * without losing its code, so Durable Object methods return a plain
 * serializable `Result` that the tRPC procedures unwrap.
 */
export type Success<T> = {
  success: true;
  data: T;
};

export type Failure = {
  success: false;
  message: string;
  tRPCError: TRPC_ERROR_CODE_KEY;
};

export type Result<T> = Success<T> | Failure;

export function ok<T>(data: T): Success<T> {
  return { success: true, data };
}

export function fail(tRPCError: TRPC_ERROR_CODE_KEY, message: string): Failure {
  return { success: false, message, tRPCError };
}

export function unwrapResult<T>(result: Result<T>): T {
  if (result.success) {
    return result.data;
  }

  throw new TRPCError({
    code: result.tRPCError,
    message: result.message,
  });
}
