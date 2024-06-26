import { FC } from "react";
import { ApiError } from "@repo/api-client";
import { useTranslation } from "react-i18next";
import { useTodoItem } from "./useTodoItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TodoProps = {
  id: string;
};

export const TodoItem: FC<TodoProps> = ({ id }) => {
  const { t } = useTranslation("todos");
  const { todo } = useTodoItem(id);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            {t("todo")}: {todo.data.id}
          </CardTitle>
          <CardDescription>
            {t("completed")}: {todo.data.completed ? t("yes") : t("no")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{todo.data.title}</p>
        </CardContent>
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
export const TodoError: FC<{ id: string; error: ApiError }> = ({
  id,
  error,
}) => {
  const { t } = useTranslation("errors");
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            {error.status}: {t(`todos.${error.code}`)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">
            {t("todos.error")} {id}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
