import "dotenv/config";
import * as schema from "./db/schema";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const dbUrl = process.env.DATABASE_URL;
const sqlite = new Database(dbUrl);
const db = drizzle(sqlite);

const results = await db.select().from(schema.nowTable);
console.log(results);
