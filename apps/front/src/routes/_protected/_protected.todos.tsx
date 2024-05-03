import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const qOpts = queryOptions({
  queryKey: ["todos"],
  queryFn: async () => {
    const todos = await fetch("https://jsonplaceholder.typicode.com/todos");
    const res = await todos.json();
    return res;
  },
});

export const Route = createFileRoute("/_protected/_protected/todos")({
  loader: async ({ context }) => {
    context.queryClient.fetchQuery(qOpts);
  },
  component: Todos,
});

function Todos() {
  const todos = useSuspenseQuery(qOpts);
  const router = useRouter();

  const goTo = (id: string) => {
    router.navigate({
      to: `/todos/${id}`,
    });
  };

  return (
    <div className="flex flex-row">
      <div>
        <h2>Todos</h2>
        <ScrollArea className="h-96 h-max-[300px]">
          <ul>
            {todos.data.map((d) => (
              <li onClick={() => goTo(d.id)} key={d.id}>
                <Button variant="secondary">{d.id}</Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
