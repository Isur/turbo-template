import { queryOptions } from "@tanstack/react-query";
import { helloApi } from "@repo/api-client";

export const getHelloOptions = queryOptions({
  queryKey: ["hello"],
  queryFn: helloApi.getHello,
});
