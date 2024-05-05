import { createFileRoute, ErrorComponentProps } from "@tanstack/react-router";
import { ApiError } from "@repo/api-client";
import {
  TodoItem,
  getTodoQueryOptions,
  TodoLoading,
  TodoError,
} from "@/features/todos";

export const Route = createFileRoute("/_protected/todos/$id")({
  loader: ({ context, params }) => {
    return context.queryClient.fetchQuery(getTodoQueryOptions(params.id));
  },
  component: Component,
  pendingComponent: Pending,
  errorComponent: Error,
});

function Error({ error }: ErrorComponentProps) {
  const { id } = Route.useParams();
  if (error instanceof ApiError) return <TodoError id={id} error={error} />;
}

function Component() {
  const { id } = Route.useParams();
  return <TodoItem id={id} />;
}

function Pending() {
  return <TodoLoading />;
}
