import { createReadStream } from "fs";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { FileApiType } from "@repo/api-client";
import { FilesService } from "./files.service";
import { FileUpdateDto } from "./dto/fileUpdate.dto";

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
  async uploadFile(
    @UploadedFile() file: Express.Multer.File
  ): Promise<FileApiType.UploadFileResponse> {
    if (!file) throw new Error();

    const newFile = await this.filesService.saveFile({
      mimetype: file.mimetype,
      originalName: file.originalname,
      size: file.size,
      path: file.path,
    });

    if (!newFile) throw new Error();

    return newFile;
  }

  @Post("upload-multiple")
  @UseInterceptors(
    FilesInterceptor("files", 100, {
      dest: "./bucket/multfiles",
    })
  )
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>
  ): Promise<FileApiType.UploadMultipleFilesResponse> {
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

  @Get()
  async getFileList(): Promise<FileApiType.GetFileListResponse> {
    const files = await this.filesService.getFileList();
    return files;
  }

  @Get(":id")
  async getFile(@Param("id") id: string): Promise<FileApiType.GetFileResponse> {
    const file = await this.filesService.getFile(id);
    if (!file) throw new Error();
    return file;
  }

  @Get(":id/download")
  async downloadFile(@Param("id") id: string): Promise<StreamableFile> {
    const dbFile = await this.filesService.getFile(id);
    if (!dbFile) throw new Error();
    const file = createReadStream(process.cwd() + "/" + dbFile.path);

    return new StreamableFile(file, {
      type: dbFile.mimetype,
      disposition: "attachment; filename=" + dbFile.originalName,
    });
  }

  @Patch(":id")
  async patchFile(
    @Param("id") id: string,
    @Body() body: FileUpdateDto
  ): Promise<FileApiType.PatchFileResponse> {
    const file = await this.filesService.updateFile(id, body.name);
    if (!file) throw new Error("XD");
    return file;
  }

  @Delete(":id")
  async deleteFile(@Param("id") id: string): Promise<void> {
    await this.filesService.deleteFile(id);
  }
}
