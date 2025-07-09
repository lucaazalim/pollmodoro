import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { OnErrorFunction } from "@trpc/server/http";
import { PollDurableObject } from "./poll-durable-object";
import { AppRouter, appRouter } from "./router";
import { TRPCContext } from "./utils/types";

export { PollDurableObject };

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle WebSocket upgrade requests
    if (request.method === "GET" && url.pathname.endsWith("/websocket")) {
      const upgradeHeader = request.headers.get("Upgrade");

      if (!upgradeHeader || upgradeHeader !== "websocket") {
        return new Response(null, {
          status: 426,
          statusText: "Durable Object expected Upgrade: websocket",
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }

      const pollId = url.searchParams.get("pollId");

      if (!pollId) {
        return new Response("Poll-Id header is required", { status: 400 });
      }

      const durableObjectId = env.POLL_DURABLE_OBJECT.idFromName(pollId);
      const stub = env.POLL_DURABLE_OBJECT.get(durableObjectId);

      return stub.fetch(request);
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": env.FRONTEND_URL,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Handle tRPC requests
    const response = await fetchRequestHandler({
      endpoint: "/trpc",
      req: request,
      router: appRouter,
      createContext: () => ({ env, request }) satisfies TRPCContext,
      onError: ({
        error,
        path,
      }: Parameters<OnErrorFunction<AppRouter, Request>>[0]) => {
        console.error(`❌ tRPC failed on ${path}:`, error);
      },
    });

    // Clone the response to add CORS headers
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers.entries()),
        ...corsHeaders,
      },
    });
  },
};
