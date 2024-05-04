import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { getTodoListQueryOptions } from "../todoQueryOptions";

export const useTodoList = () => {
  const todos = useSuspenseQuery(getTodoListQueryOptions);
  const router = useRouter();

  const goTo = (id: string) => {
    router.navigate({
      to: `/todos/${id}`,
    });
  };

  return { todos, goTo };
};
