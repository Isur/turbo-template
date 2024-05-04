import { queryOptions } from "@tanstack/react-query";
import { Todo } from "./todo";
import { sleep } from "@/lib/sleep";

export const getTodoListQueryOptions = queryOptions({
  queryKey: ["todos"],
  queryFn: async (): Promise<Array<Todo>> => {
    const todos = await fetch("https://jsonplaceholder.typicode.com/todos");
    const res = await todos.json();
    await sleep(3000);
    return res;
  },
});

export const getTodoQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["todo", id],
    queryFn: async (): Promise<Todo> => {
      const todos = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
      );
      const res = await todos.json();
      await sleep(3000);
      if (id === "4") throw new Error("xd");
      return res;
    },
  });
