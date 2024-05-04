import { createFileRoute } from "@tanstack/react-router";
import { TodoList, getTodoListQueryOptions } from "@/features/todos";
import { Spinner } from "@/components/spinner";

export const Route = createFileRoute("/_protected/todos")({
  loader: async ({ context }) => {
    context.queryClient.fetchQuery(getTodoListQueryOptions);
  },
  component: TodoList,
  pendingComponent: Spinner,
});
