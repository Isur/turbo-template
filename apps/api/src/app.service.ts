import { Inject, Injectable } from "@nestjs/common";
import { helloWorld } from "@repo/hello-world-package";
import { sql } from "drizzle-orm";
import { DB } from "./database";

@Injectable()
export class AppService {
  constructor(@Inject("MyDrizzleConnection") private readonly db: DB) {}

  getHello(): string {
    return helloWorld();
  }

  async getSomethingFromDb() {
    const result = await this.db.execute(sql`SELECT now() as "now"`);
    return result.rows[0];
  }
}
