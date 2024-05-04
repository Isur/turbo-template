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
export const TodoLoading: FC = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
        </CardContent>
      </Card>
    </div>
  );
};
export const TodoError: FC<{ id: string }> = ({ id }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error while loading todo: {id}</p>
        </CardContent>
      </Card>
    </div>
  );
};
