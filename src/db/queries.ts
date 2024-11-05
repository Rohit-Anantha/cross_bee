"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "@/src/db";
import { guessTable } from "@/src/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function getGuesses(
  user_id: string,
): Promise<{ content: string }[]> {
  return await db
    .select({
      content: guessTable.content,
    })
    .from(guessTable)
    .where(eq(guessTable.user_id, user_id));
}

export async function addGuess(guess: string, user_id: string) {
  const userId = (await auth()).userId!;
  return await db.insert(guessTable).values({
    user_id: user_id,
    content: guess,
  });
}
