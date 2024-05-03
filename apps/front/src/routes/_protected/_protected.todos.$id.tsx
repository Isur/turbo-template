import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const qOpts = (id: string) =>
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

export const Route = createFileRoute("/_protected/_protected/todos/$id")({
  loader: async ({ context, params }) => {
    return context.queryClient.fetchQuery(qOpts(params.id));
  },
  component: Todo,
});

function Todo() {
  const id = Route.useParams().id;
  const todo = useSuspenseQuery(qOpts(id));

  console.log(todo.data);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Todo: {todo.data.id}</CardTitle>
          <CardDescription>Completed: {todo.data.completed}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{todo.data.title}</p>
        </CardContent>
        <CardFooter>
          <p>User: {todo.data.userId}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
