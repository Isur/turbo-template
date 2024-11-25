import { queryOptions } from "@tanstack/react-query";
import { TodoApi } from "@repo/api-client";

export const getTodoListQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: TodoApi.getTodos,
});

export const getTodoQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["todo", id],
    queryFn: () => TodoApi.getTodo(Number(id)),
  });
