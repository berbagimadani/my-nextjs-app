import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const filesTable = pgTable("files", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  filename: varchar({ length: 255 }).notNull(), 
  url: text().notNull(),
  fileid: varchar({ length: 255 }).notNull(), 
});
