import { apiClient } from "../../client";
import {
  CreateTodoRequest,
  CreateTodoResponse,
  GetTodoResponse,
  GetTodosResponse,
} from "./types";

export async function getTodos(): Promise<GetTodosResponse> {
  type NewType = GetTodosResponse;

  const response = await apiClient<NewType>({
    url: "/todos",
  });

  return response;
}

export async function getTodo(id: number): Promise<GetTodoResponse> {
  const response = await apiClient<GetTodoResponse>({
    url: "/todos/" + id,
  });

  return response;
}

export async function createTodo(
  body: CreateTodoRequest
): Promise<CreateTodoResponse> {
  const response = await apiClient<CreateTodoResponse>({
    url: "/todos",
    method: "POST",
    data: body,
  });

  return response;
}
