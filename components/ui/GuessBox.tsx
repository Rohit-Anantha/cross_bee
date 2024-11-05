// Guesses.tsx

"use client";

import { inspect } from "util";

interface GuessBoxProps {
  guesses: string[];
}

export default function GuessBox({ guesses }: GuessBoxProps) {
  return <div className="flex items-center">Guesses: {guesses}</div>;
}
