import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DB, DB_TOKEN } from "../../core/database";
import * as schema from "../../core/database/schema";
import { Todo } from "./entities/todo.entity";
import { CreateTodoDto } from "./dto/createTodo.dto";
import { TodoNotFoundException } from "./todos.errors";

@Injectable()
export class TodosService {
  constructor(@Inject(DB_TOKEN) private readonly db: DB) {}

  async findAll(): Promise<Array<Todo>> {
    const todos = await this.db.select().from(schema.todos);
    return todos;
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.db
      .select()
      .from(schema.todos)
      .where(eq(schema.todos.id, id))
      .limit(1);

    if (!todo[0]) {
      throw new TodoNotFoundException();
    }

    return todo[0];
  }

  async createTodo(createTodo: CreateTodoDto): Promise<Todo> {
    const newTodo = await this.db
      .insert(schema.todos)
      .values({ title: createTodo.title, completed: false })
      .returning();

    if (newTodo[0]) return newTodo[0];

    throw new Error("Failed creating todo");
  }
}
