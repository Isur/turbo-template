import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export type DBSchema = typeof schema;
export type DB = NodePgDatabase<DBSchema>;
