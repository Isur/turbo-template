import { join } from "path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./health/health.module";
import { TodosModule } from "./todos/todos.module";
import appConfig from "./config/app.config";
import dbConfig from "./config/db.config";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "front", "dist"),
      exclude: ["/api/(.*)"],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
      cache: true,
      expandVariables: true,
    }),
    HealthModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
