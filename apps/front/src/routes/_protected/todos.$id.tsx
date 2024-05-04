import { createFileRoute } from "@tanstack/react-router";
import { TodoItem, getTodoQueryOptions } from "@/features/todos";

export const Route = createFileRoute("/_protected/todos/$id")({
  loader: async ({ context, params }) => {
    return context.queryClient.fetchQuery(getTodoQueryOptions(params.id));
  },
  component: Todo,
});

function Todo() {
  const { id } = Route.useParams();
  return <TodoItem id={id} />;
}
