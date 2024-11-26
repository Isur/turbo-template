import { Inject, Injectable } from "@nestjs/common";
import { DB, DB_TOKEN, schema } from "src/core/database";

@Injectable()
export class FilesService {
  constructor(@Inject(DB_TOKEN) private readonly db: DB) {}

  async saveFile(file: typeof schema.files.$inferInsert) {
    const dbFile = await this.db.insert(schema.files).values(file).returning();

    if (!dbFile) throw Error("Something failed while adding file");

    return dbFile[0];
  }

  async saveFiles(files: Array<typeof schema.files.$inferInsert>) {
    const dbFiles = await this.db
      .insert(schema.files)
      .values(files)
      .returning();

    return dbFiles;
  }
}
