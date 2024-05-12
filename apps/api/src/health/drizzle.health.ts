import { Inject, Injectable } from "@nestjs/common";
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from "@nestjs/terminus";
import { sql } from "drizzle-orm";
import { DB, DB_TOKEN } from "src/database";

@Injectable()
export class DrizzleHealthIndicator extends HealthIndicator {
  constructor(@Inject(DB_TOKEN) private readonly db: DB) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const dbResult = await this.db.execute(sql`SELECT 1 as test`);
      if (dbResult.rows[0].test != 1) {
        throw new HealthCheckError("Drizzle failed", {
          select: "select 1 not returned 1",
        });
      }
      return this.getStatus(key, true);
    } catch (error) {
      throw new HealthCheckError("Drizzle failed", error);
    }
  }
}
