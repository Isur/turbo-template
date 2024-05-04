import { Outlet, Link } from "@tanstack/react-router";
import { useTodoList } from "./useTodoList";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TodoList = () => {
  const { todos } = useTodoList();

  return (
    <div className="flex flex-row">
      <div>
        <h2>Todos</h2>
        <ScrollArea className="h-96 h-max-[300px]">
          <ul>
            {todos.data.map((d) => (
              <li key={d.id}>
                <Link to={`/todos/${d.id}`}>
                  <Button variant="secondary">{d.id}</Button>
                </Link>
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
};
