import { Inject, Injectable } from "@nestjs/common";
import { helloWorld } from "@repo/hello-world-package";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import { DB, DRIZZLE_PROVIDER } from "./drizzle";

@Injectable()
export class AppService {
  constructor(
    @Inject(DRIZZLE_PROVIDER) private readonly db: NodePgDatabase<DB>
  ) {}

  getHello(): string {
    return helloWorld();
  }

  async getSomethingFromDb() {
    const result = await this.db.execute(sql`SELECT now() as "now"`);
    return result.rows[0];
  }
}
