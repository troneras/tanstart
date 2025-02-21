import { migrate } from "drizzle-orm/bun-sql/migrator";

import { database } from "./index";


async function main() {
    await migrate(database, { migrationsFolder: "drizzle" });
}

main();