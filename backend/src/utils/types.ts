export type WebSocketMessage<T> = {
  type: "results";
  data: T;
};

export type TRPCContext = {
  env: Env;
  request: Request;
};
