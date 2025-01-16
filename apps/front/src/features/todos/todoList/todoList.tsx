import { Outlet, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTodoList } from "./useTodoList";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export const TodoList = () => {
  const [newState, setNewState] = useState("");
  const { todos, createTodo } = useTodoList();

  return (
    <div className="flex flex-row">
      <div>
        <h2>Todos</h2>
        <Input
          onChange={(e) => setNewState(e.target.value)}
          value={newState}
          placeholder="add..."
        />
        <Button variant="default" onClick={() => createTodo.mutate(newState)}>
          Add
        </Button>
        {createTodo.isError && <div>Error: {createTodo.error.message}</div>}
        <ScrollArea className="h-96 h-max-[300px]">
          <ul>
            {todos.data.map((d) => (
              <li key={d.id}>
                <Link to="/todos/$id" params={{ id: d.id.toString() }}>
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
