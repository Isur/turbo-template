import { Inject, Injectable, Logger } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DB, DB_TOKEN, schema } from "..";

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(@Inject(DB_TOKEN) private readonly db: DB) {}

  async seed() {
    await this.db
      .insert(schema.seed)
      .values([
        {
          name: "todo",
          done: false,
        },
      ])
      .onConflictDoNothing();

    const seeds = await this.db.select().from(schema.seed);
    const allDone = seeds.every((seed) => seed.done === true);

    if (allDone) {
      this.logger.log("Seeding database not necessary...");
      return;
    }

    const record: Record<string, boolean> = {};
    seeds.forEach((seed) => {
      record[seed.name] = seed.done;
    });

    this.logger.log("Seeding database...");

    if (!record["todo"]) {
      await this.seedTodos();
    }

    this.logger.log("Database seeded!");
  }

  private async seedTodos() {
    this.logger.log("Seeding Todos...");

    await this.db.insert(schema.todos).values([
      { title: "Create NestJS App", completed: true },
      { title: "Create Seed Service", completed: false },
      { title: "Create Todos Module", completed: false },
    ]);

    await this.db
      .update(schema.seed)
      .set({ done: true })
      .where(eq(schema.seed.name, "todo"));
  }
}
