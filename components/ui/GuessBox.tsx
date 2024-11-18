// Guesses.tsx

"use client";

interface GuessBoxProps {
  guesses: string[];
}

export default function GuessBox({ guesses }: GuessBoxProps) {
  const filteredGuesses = guesses.filter((guess) => guess.trim() !== "");

  return (
    <div className="items-center space-y-4">
      <h2 className="justify-center text-xl font-semibold text-gray-800">
        Your Guesses
      </h2>
      <div className="grid max-h-80 grid-cols-3 gap-3 overflow-y-auto rounded-lg border p-1">
        {filteredGuesses.map((guess, index) => (
          <div
            key={index}
            className="flex items-center justify-center rounded-md border bg-white bg-opacity-80 p-4 "
          >
            <span className="text-s">{guess}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
