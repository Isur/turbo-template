import { Module } from "@nestjs/common";
import { TodosModule } from "./todos/todos.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { FilesModule } from "./files/files.module";

@Module({
  imports: [TodosModule, UsersModule, AuthModule, FilesModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
