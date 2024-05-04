import { createFileRoute } from "@tanstack/react-router";
import {
  TodoItem,
  getTodoQueryOptions,
  TodoLoading,
  TodoError,
} from "@/features/todos";

export const Route = createFileRoute("/_protected/todos/$id")({
  loader: async ({ context, params }) => {
    return context.queryClient.fetchQuery(getTodoQueryOptions(params.id));
  },
  component: Component,
  pendingComponent: Pending,
  errorComponent: Error,
});

function Error() {
  const { id } = Route.useParams();
  return <TodoError id={id} />;
}

function Component() {
  const { id } = Route.useParams();
  return <TodoItem id={id} />;
}

function Pending() {
  return <TodoLoading />;
}
