import { queryOptions } from "@tanstack/react-query";

export const getTodoListQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: async () => {
    const todos = await fetch("https://jsonplaceholder.typicode.com/todos");
    const res = await todos.json();
    return res;
  },
});

export const getTodoQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["todo", id],
    queryFn: async () => {
      const todos = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
      );
      const res = await todos.json();
      return res;
    },
  });
