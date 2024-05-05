import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TodosService } from "./todos.service";
import { TodosController } from "./todos.controller";

@Module({
  imports: [HttpModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
