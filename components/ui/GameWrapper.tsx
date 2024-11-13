"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import GuessBox from "./GuessBox";
import Hints from "./Hints";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface GameDisplayProps {
  chosen: string[];
  possible_words: string[];
  guesses: string[];
}

export default function GameDisplay({
  chosen,
  possible_words,
  guesses,
}: GameDisplayProps) {
  const [toDisplay, setToDisplay] = useState("");
  const [toStore, setToStore] = useState("");
  const [localWords, setLocalWords] = useState(guesses);
  const honey_char = chosen[3];
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const add_score = (word: string) => 1 + (word.length - 1) * 3;
  const totalScore = possible_words.reduce((sum, word) => {
    const score = add_score(word); // Calculate score for each word
    return sum + score; // Add score to the running total
  }, 0);
  const checkpoints = [0, 1, 2, 3, 4].map((i) => (totalScore / 4) * i);
  const handleSymbolClick = (value: string, isHoneyChar = false) => {
    const updatedStore = toStore.concat(value);
    setToStore(updatedStore);
    if (isHoneyChar) {
      const updatedDisplay = updatedStore.replace(
        new RegExp(value, "g"),
        `<span style="color: #fbbf24;">${value}</span>`,
      );
      setToDisplay(updatedDisplay);
    } else {
      const updatedDisplay = toDisplay.concat(value);
      setToDisplay(updatedDisplay);
    }
  };

  const handleBackspace = () => {
    const updatedStore = toStore.slice(0, -1);
    setToStore(updatedStore);
    setToDisplay(
      updatedStore.replace(
        new RegExp(honey_char, "g"),
        `<span style="color: #fbbf24;">${honey_char}</span>`,
      ),
    );
  };

  async function isValidWord(word: string) {
    // Make sure the URL is correctly formatted
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );

    // Check if the response is successful
    if (!response.ok) {
      return false; // If the word is not found, return false
    }

    // Parse the response JSON
    const data = await response.json();
    console.log(data);

    // If the API returns valid data, it's a real word
    return true;
  }

  const handleSubmit = () => {
    console.log("handle submit");
    console.log(toStore);
    isValidWord(toStore).then((isValid) => {
      if (
        isValid &&
        toStore.includes(honey_char) &&
        !localWords.includes(toStore) &&
        toStore.length > 3
      ) {
        const add_score = 1 + (toStore.length - 1) * 3;
        toast({
          title: "You got " + add_score + " points!",
        });
        setScore(add_score + score);
        setLocalWords([...localWords, toStore]);
        setToStore("");
        setToDisplay("");
      } else if (toStore.length <= 3) {
        toast({
          variant: "destructive",
          title: "Word too short!",
          description: "The word is too short, try a new word!",
        });
      } else if (localWords.includes(toStore)) {
        toast({
          variant: "destructive",
          title: "Already Guessed!",
          description: "You've already guessed this word, try a new word!",
        });
        setToStore("");
        setToDisplay("");
      } else if (!toStore.includes(honey_char)) {
        toast({
          variant: "destructive",
          title: "You didn't use the Honey Character!",
          description: "Make sure to use the center vowel in all words!",
        });
        setToStore("");
        setToDisplay("");
      } else {
        toast({
          variant: "destructive",
          title: "Not a valid word!",
          description:
            "We can't find this in our dictionary... are you sure that's correct?",
        });
        setToStore("");
        setToDisplay("");
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 justify-center">
        <div className="flex flex-col gap-5">
          <div className="relative mb-2 flex">
            {checkpoints.map((checkpoint, index) => {
              // Check if the user has passed this checkpoint
              const isPassed = score >= checkpoint;
              return (
                <div
                  key={index}
                  className={`text-xs ${isPassed ? "font-bold text-amber-400" : ""}`} // Apply bold and color change if passed
                  style={{
                    left: `${(checkpoint / totalScore) * 100}%`,
                    position: "absolute", // Ensure the text is positioned correctly above the progress bar
                  }}
                >
                  {Math.round(checkpoint)}
                </div>
              );
            })}
          </div>

          <Progress value={(score / totalScore) * 100} />
          <GuessBox guesses={localWords}></GuessBox>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center gap-5">
            <div className="items-center justify-center gap-10">
              <h1
                dangerouslySetInnerHTML={{
                  __html: toDisplay === "" ? "_" : toDisplay,
                }}
                className="text-center text-7xl font-extrabold"
              ></h1>
            </div>
            <Button className="w-min self-center" onClick={handleBackspace}>
              <Delete />
            </Button>
          </div>
          <div className="grid grid-rows-3 gap-4 p-40">
            <div className="flex justify-center gap-4">
              <Button onClick={() => handleSymbolClick(chosen[0])}>
                {chosen[0]}
              </Button>
              <Button onClick={() => handleSymbolClick(chosen[1])}>
                {chosen[1]}
              </Button>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => handleSymbolClick(chosen[2])}>
                {chosen[2]}
              </Button>
              <Button
                className="bg-amber-400"
                onClick={() => handleSymbolClick(chosen[3], true)}
              >
                {chosen[3]}
              </Button>
              <Button onClick={() => handleSymbolClick(chosen[4])}>
                {chosen[4]}
              </Button>
            </div>
            <div className="flex justify-center gap-4">
              <Button onClick={() => handleSymbolClick(chosen[5])}>
                {chosen[5]}
              </Button>
              <Button onClick={() => handleSymbolClick(chosen[6])}>
                {chosen[6]}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              className="bg-amber-400 font-extrabold"
              type="submit"
              onClick={() => handleSubmit()}
            >
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
