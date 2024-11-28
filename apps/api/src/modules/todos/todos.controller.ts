import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TodoApiType } from "@repo/api-client";
import { ApiTags } from "@nestjs/swagger";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/createTodo.dto";

@ApiTags("todos")
@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(): Promise<TodoApiType.GetTodosResponse> {
    return await this.todosService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<TodoApiType.GetTodoResponse> {
    const todo = await this.todosService.findOne(+id);
    return todo;
  }

  @Post()
  async createTodo(
    @Body() newTodo: CreateTodoDto
  ): Promise<TodoApiType.CreateTodoResponse> {
    return await this.todosService.createTodo(newTodo);
  }
}
