import { Module } from "@nestjs/common";
import { CoreModule } from "./core/core.module";
import { ModulesModule } from "./modules/modules.module";
import { AppInit } from "./app.init";

@Module({
  imports: [CoreModule, ModulesModule],
  controllers: [],
  providers: [AppInit],
})
export class AppModule {}
