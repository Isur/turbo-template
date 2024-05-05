import { queryOptions } from "@tanstack/react-query";
import { getHello } from "./api";

export const getHelloOptions = queryOptions({
  queryKey: ["hello"],
  queryFn: getHello,
});
