import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("files", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  filename: varchar({ length: 255 }).notNull(), 
});
