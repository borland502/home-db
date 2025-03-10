import "dotenv/config";
import * as schema from "./db/schema";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { $ } from "bun";
import { parseArgs } from "util";

$.nothrow();

const { values, positionals } = parseArgs({
	args: Bun.argv,
	options: {
		url: {
			type: "string",
		},
	},
	strict: true,
	allowPositionals: true,
});

// Read the URL from the command-line arguments
if (values && values.url) {
	const dbUrl: string | undefined = values.url;
	const sqlite = new Database(dbUrl);
	const db = drizzle(sqlite);

	const results = await db.select().from(schema.nowTable);
	console.log(results);
} else {
	console.error("Usage: bun main.ts <DATABASE_URL>");
	process.exit(1);
}
