import { Controller, Get, HttpException, Param } from "@nestjs/common";
import { HttpStatusCode } from "axios";
import { TodosService } from "./todos.service";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get("lol")
  async findLol() {
    return await this.todosService.lol();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const todo = await this.todosService.findOne(+id);

    if (!todo) {
      throw new HttpException(
        {
          status: HttpStatusCode.NotFound,
          error: "Not Found",
          code: "not_found",
        },
        HttpStatusCode.NotFound
      );
    }

    return todo;
  }
}
