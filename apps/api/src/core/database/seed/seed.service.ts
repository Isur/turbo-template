import { Inject, Injectable, Logger } from "@nestjs/common";
import { DB, DB_TOKEN, schema } from "..";

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(@Inject(DB_TOKEN) private readonly db: DB) {}

  async seed() {
    const init = await this.db.select().from(schema.init).limit(1);

    const seedDone = init.length > 0 && init[0].seed;

    if (seedDone) {
      this.logger.log("Seeding database not necessary...");
      return;
    }

    this.logger.log("Seeding database...");

    await this.db.insert(schema.todos).values([
      { title: "Create NestJS App", completed: true },
      { title: "Create Seed Service", completed: false },
      { title: "Create Todos Module", completed: false },
    ]);

    await this.db.insert(schema.init).values([{ seed: true }]);

    this.logger.log("Database seeded!");
  }
}
