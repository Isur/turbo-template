export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};
export type GetTodosResponse = Array<Todo>;
export type GetTodoResponse = Todo;
export type CreateTodoResponse = Todo;
export type CreateTodoRequest = {
  title: string;
};
