import { relations } from "drizzle-orm";
import {
    index,
    integer,
    pgTable,
    pgTableCreator,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

const PREFIX = "app";

const tableCreator = pgTableCreator((name) => `${PREFIX}_${name}`);

export const users = tableCreator("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
},
    (table) => ({
        emailIdx: index("email_idx").on(table.email),
    })
);

export const accounts = tableCreator("accounts", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, {
        onDelete: "cascade",
    }),
    type: text("type").notNull(), // "oauth", "credentials"
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
},
    (table) => ({
        accountUserIdIdx: index("user_provider_provider_account_id_idx").on(table.userId, table.provider, table.providerAccountId),
    })
);

export const profiles = tableCreator("profiles", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, {
        onDelete: "cascade",
    }),
    displayName: text("display_name").notNull(),
    imageId: integer("image_id").references(() => files.id),
    image: text("image"),
});

export const sessions = tableCreator("sessions", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, {
        onDelete: "cascade",
    }),
    expiresAt: timestamp("expires_at", { mode: "date", withTimezone: true }).notNull(),
},
    (table) => ({
        sessionUserIdIdx: index("session_user_id_idx").on(table.userId),
    })
);

export const files = tableCreator("files", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    type: text("type").notNull(),
    size: integer("size").notNull(),
    url: text("url").notNull(),
});





