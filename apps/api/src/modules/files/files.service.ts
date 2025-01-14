import fs from "fs";
import { join } from "path";
import { statfs } from "fs/promises";
import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DB, DB_TOKEN, schema } from "src/core/database";
import { FileNotFoundException, FileRemoveException } from "./files.errors";

@Injectable()
export class FilesService {
  constructor(@Inject(DB_TOKEN) private readonly db: DB) {}

  async getDiskStats() {
    const stats = await statfs("/");
    return {
      available: stats.bsize * stats.bavail,
    };
  }

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

  async getFileList() {
    const dbFiles = await this.db.select().from(schema.files);
    return dbFiles;
  }

  async getFile(id: string) {
    const dbFile = await this.db
      .select()
      .from(schema.files)
      .where(eq(schema.files.id, id))
      .limit(1);

    return dbFile[0];
  }

  async updateFile(id: string, name: string) {
    const updatedFile = await this.db
      .update(schema.files)
      .set({
        originalName: name,
      })
      .where(eq(schema.files.id, id))
      .returning();

    return updatedFile[0];
  }

  async deleteFile(id: string) {
    const file = await this.getFile(id);
    if (!file) throw new FileNotFoundException();

    await this.db.transaction(async (tx) => {
      try {
        await tx.delete(schema.files).where(eq(schema.files.id, id));

        const filePath = join(process.cwd(), "/", file?.path);
        fs.rmSync(filePath);
      } catch {
        tx.rollback();
        throw new FileRemoveException();
      }
    });
  }
}
