import { FC } from "react";
import { useTodoItem } from "./useTodoItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TodoProps = {
  id: string;
};

export const TodoItem: FC<TodoProps> = ({ id }) => {
  const { todo } = useTodoItem(id);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Todo: {todo.data.id}</CardTitle>
          <CardDescription>
            Completed: {todo.data.completed ? "yes" : "no"}
          </CardDescription>
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
};
