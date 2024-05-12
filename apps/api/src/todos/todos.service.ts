import { HttpException, Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DB, DB_TOKEN } from "../database";
import { todos } from "../database/schema";
import { Todo } from "./entities/todo.entity";

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
      throw new HttpException("Todo not found", 404);
    }

    return todo[0];
  }
}
