import { pgTableCreator, text, uuid } from "drizzle-orm/pg-core";

const createTable = pgTableCreator((name) => `cross_bee_${name}`);

export const guessTable = createTable("guesses", {
  id: uuid("guess_id").defaultRandom().primaryKey(),
  user_id: text("user_id").notNull(),
  content: text("content").notNull(),
});
