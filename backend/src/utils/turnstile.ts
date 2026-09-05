import { TRPCError } from "@trpc/server";
import type { TRPCContext } from "./types";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type SiteverifyResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
};

export async function validateTurnstileToken(
  token: string,
  ctx: TRPCContext,
): Promise<SiteverifyResponse> {
  const remoteIp = ctx.request.headers.get("CF-Connecting-IP");

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: ctx.env.TURNSTILE_SECRET_KEY,
        response: token,
        ...(remoteIp && { remoteip: remoteIp }),
      }),
    });

    if (!response.ok) {
      throw new Error(`Turnstile siteverify responded with ${response.status}`);
    }

    return (await response.json()) as SiteverifyResponse;
  } catch (error) {
    console.error("Error validating Turnstile token:", error);
    return { success: false, "error-codes": ["internal-error"] };
  }
}

/** Throws a `BAD_REQUEST` tRPC error when the Turnstile token is not valid. */
export async function assertTurnstileToken(
  token: string,
  ctx: TRPCContext,
): Promise<void> {
  const result = await validateTurnstileToken(token, ctx);

  if (!result.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid Turnstile token. Please try again.",
    });
  }
}
