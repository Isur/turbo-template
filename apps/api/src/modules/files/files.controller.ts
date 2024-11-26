import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("files")
@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      dest: "./bucket/files",
    })
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) return null;
    const newFile = await this.filesService.saveFile({
      mimetype: file.mimetype,
      originalName: file.originalname,
      size: file.size,
      path: file.path,
    });
    return newFile;
  }

  @Post("upload-multiple")
  @UseInterceptors(
    FilesInterceptor("files", 100, {
      dest: "./bucket/multfiles",
    })
  )
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    if (!files) return [];

    const filesMap = files.map((file) => {
      return {
        mimetype: file.mimetype,
        originalName: file.originalname,
        size: file.size,
        path: file.path,
      };
    });

    const newFiles = await this.filesService.saveFiles(filesMap);
    return newFiles;
  }
}
