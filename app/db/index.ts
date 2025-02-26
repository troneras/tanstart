import { env } from "@/utils/env";
import * as schema from "drizzle/schema";
import { drizzle } from "drizzle-orm/bun-sql";

import { SQL } from "bun";


const sql = new SQL(env.DATABASE_URL!);

const database = drizzle(sql, { schema });




export { database };


