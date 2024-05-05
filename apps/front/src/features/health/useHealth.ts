import { useSuspenseQuery } from "@tanstack/react-query";
import { getHealthQueryOptions } from "./healthQueryOptions";

export const useHealth = () => {
  const health = useSuspenseQuery(getHealthQueryOptions);

  const details = Object.keys(health.data.details).map((key) => {
    const detail = health.data.details[key];
    return { key, detail };
  });

  return { health, details };
};
