import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";

@Module({
  imports: [
    MulterModule.register({
      dest: "./bucket",
      preservePath: true,
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
