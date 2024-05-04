import { useSuspenseQuery } from "@tanstack/react-query";
import { getTodoQueryOptions } from "../todoQueryOptions";

export const useTodoItem = (id: string) => {
  const todo = useSuspenseQuery(getTodoQueryOptions(id));

  return { todo };
};
