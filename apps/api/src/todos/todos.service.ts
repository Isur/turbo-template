import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { sql } from "drizzle-orm";
import { DB } from "../database";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodosService {
  constructor(
    private readonly httpService: HttpService,
    @Inject("MyDrizzleConnection") private readonly db: DB
  ) {}

  async findAll(): Promise<Array<Todo>> {
    const res = await firstValueFrom(
      this.httpService.get("https://jsonplaceholder.typicode.com/todos")
    );

    return res.data;
  }

  async findOne(id: number): Promise<Todo> {
    if (id === 4) {
      return null;
    }

    const res = await firstValueFrom(
      this.httpService.get("https://jsonplaceholder.typicode.com/todos/" + id)
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res.data;
  }

  async lol() {
    return (await this.db.execute(sql`SELECT now()`)).rows[0];
  }
}
