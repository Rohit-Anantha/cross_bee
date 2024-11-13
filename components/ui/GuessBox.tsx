// Guesses.tsx

"use client";

import { inspect } from "util";

interface GuessBoxProps {
  guesses: string[];
}

export default function GuessBox({ guesses }: GuessBoxProps) {
  const filteredGuesses = guesses.filter((guess) => guess.trim() !== "");

  return (
    <div className="items-center space-y-4">
      <h2 className="items-center text-xl font-semibold text-gray-800">
        Your Guesses
      </h2>
      <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-300 bg-gray-100 bg-opacity-60 p-3 shadow-sm">
        {filteredGuesses.map((guess, index) => (
          <div
            key={index}
            className="mb-2 flex items-center justify-center rounded border bg-white bg-opacity-80 p-4 shadow-md"
          >
            {guess}
          </div>
        ))}
      </div>
    </div>
  );
}
