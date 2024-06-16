import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { todoApi } from "@repo/api-client";
import { useNavigate } from "@tanstack/react-router";
import { getTodoListQueryOptions } from "../todoQueryOptions";

export const useTodoList = () => {
  const nav = useNavigate();
  const todos = useSuspenseQuery(getTodoListQueryOptions);

  const createTodo = useMutation({
    mutationFn: (title: string) => todoApi.createTodo({ title }),
    onSuccess: (todo) => {
      nav({
        to: `/todos/${todo.id}`,
      });
    },
  });

  return { todos, createTodo };
};
