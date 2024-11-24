import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dto/createTodo.dto";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const todo = await this.todosService.findOne(+id);
    return todo;
  }

  @Post()
  async createTodo(@Body() newTodo: CreateTodoDto) {
    return await this.todosService.createTodo(newTodo);
  }
}
