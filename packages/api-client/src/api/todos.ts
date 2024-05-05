import { apiClient } from "../client";

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

type GetTodosResponse = Array<Todo>;

export async function getTodos(): Promise<GetTodosResponse> {
  const response = await apiClient<GetTodosResponse>({
    url: "/todos",
  });

  return response;
}

type GetTodoResponse = Todo;

export async function getTodo(id: number): Promise<GetTodoResponse> {
  const response = await apiClient<GetTodoResponse>({
    url: "/todos/" + id,
  });

  return response;
}
