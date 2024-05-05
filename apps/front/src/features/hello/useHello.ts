import { useSuspenseQuery } from "@tanstack/react-query";
import { getHelloOptions } from "./helloQueryOptions";

export function useHello() {
  const hello = useSuspenseQuery(getHelloOptions);

  return { hello };
}
