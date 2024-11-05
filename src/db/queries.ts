"use server";

import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { guessTable } from "@/src/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function getGuesses(): Promise<{ content: string }[]> {
  const userId = (await auth()).userId!;
  return await db
    .select({
      content: guessTable.content,
    })
    .from(guessTable)
    .where(eq(guessTable.user_id, userId));
}

export async function addGuess(guess: string) {
  const userId = (await auth()).userId!;
  return await db.insert(guessTable).values({
    user_id: userId,
    content: guess,
  });
}
