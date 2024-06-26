import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DB, DB_TOKEN } from "../database";
import { todos } from "../database/schema";
import { Todo } from "./entities/todo.entity";
import { CreateTodoDto } from "./dto/createTodo.dto";
import { TodoNotFoundException } from "./todos.errors";

@Injectable()
export class TodosService {
  constructor(@Inject(DB_TOKEN) private readonly db: DB) {}

  async findAll(): Promise<unknown> {
    const todos = await this.db.query.todos.findMany();
    return todos;
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .limit(1);

    if (todo.length === 0) {
      throw new TodoNotFoundException();
    }

    return todo[0];
  }

  async createTodo(createTodo: CreateTodoDto): Promise<Todo> {
    const newTodo = await this.db
      .insert(todos)
      .values({ title: createTodo.title, completed: false })
      .returning();

    return newTodo[0];
  }
}
