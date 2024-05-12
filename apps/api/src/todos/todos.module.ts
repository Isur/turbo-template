import { Module } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
