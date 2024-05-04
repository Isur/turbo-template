import { useSuspenseQuery } from "@tanstack/react-query";
import { getTodoListQueryOptions } from "../todoQueryOptions";

export const useTodoList = () => {
  const todos = useSuspenseQuery(getTodoListQueryOptions);

  return { todos };
};
