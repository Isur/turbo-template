import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodosService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Array<Todo>> {
    const res = await firstValueFrom(
      this.httpService.get("https://jsonplaceholder.typicode.com/todos")
    );

    return res.data;
  }

  async findOne(id: number): Promise<Todo> {
    const res = await firstValueFrom(
      this.httpService.get("https://jsonplaceholder.typicode.com/todos/" + id)
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res.data;
  }
}
