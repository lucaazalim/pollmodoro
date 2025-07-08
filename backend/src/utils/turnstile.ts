import { TRPCContext } from "./types";

interface TurnstileValidationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
  action?: string;
  cdata?: string;
}

export async function validateTurnstileToken(
  token: string,
  ctx: TRPCContext
): Promise<TurnstileValidationResponse> {
  const remoteIp = ctx.request.headers.get("CF-Connecting-IP");

  const requestBody = {
    secret: ctx.env.TURNSTILE_SECRET_KEY,
    response: token,
    ...(remoteIp && { remoteip: remoteIp }),
  };

  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(
        `Turnstile validation request failed: ${response.status}`
      );
    }

    const result = (await response.json()) as TurnstileValidationResponse;
    return result;
  } catch (error) {
    console.error("Error validating Turnstile token:", error);
    return {
      success: false,
      "error-codes": ["internal-error"],
    };
  }
}
