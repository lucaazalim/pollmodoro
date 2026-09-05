import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { PollDurableObject } from "./poll-durable-object";
import { appRouter } from "./router";

export { PollDurableObject };

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/websocket") {
      return handleWebSocket(request, url, env);
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": env.FRONTEND_URL,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: { ...corsHeaders, "Access-Control-Max-Age": "86400" },
      });
    }

    const response = await fetchRequestHandler({
      endpoint: "/trpc",
      req: request,
      router: appRouter,
      createContext: () => ({ env, request }),
      onError({ error, path }) {
        console.error(`tRPC failed on ${path ?? "<no-path>"}:`, error);
      },
    });

    const responseWithCors = new Response(response.body, response);

    for (const [name, value] of Object.entries(corsHeaders)) {
      responseWithCors.headers.set(name, value);
    }

    return responseWithCors;
  },
} satisfies ExportedHandler<Env>;

/** Forwards a WebSocket upgrade to the Durable Object that owns the poll. */
function handleWebSocket(
  request: Request,
  url: URL,
  env: Env,
): Promise<Response> | Response {
  if (request.headers.get("Upgrade") !== "websocket") {
    return new Response("Expected Upgrade: websocket", { status: 426 });
  }

  const pollId = url.searchParams.get("pollId");

  if (!pollId) {
    return new Response("Missing pollId query parameter", { status: 400 });
  }

  return env.POLL_DURABLE_OBJECT.getByName(pollId).fetch(request);
}
