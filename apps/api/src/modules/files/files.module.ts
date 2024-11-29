import { join } from "path";
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd()),
    }),
    MulterModule.register({
      dest: "./bucket",
      preservePath: true,
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
