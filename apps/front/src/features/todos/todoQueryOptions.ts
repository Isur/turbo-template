import { queryOptions } from "@tanstack/react-query";
import { todoApi } from "@repo/api-client";

export const getTodoListQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: todoApi.getTodos,
});

export const getTodoQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["todo", id],
    queryFn: () => todoApi.getTodo(Number(id)),
  });
