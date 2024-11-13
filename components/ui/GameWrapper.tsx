"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import GuessBox from "./GuessBox";
import Hints from "./Hints";
import { useToast } from "@/hooks/use-toast";


interface GameDisplayProps {
  chosen: string[];
  guesses: string[];
}

export default function GameDisplay({ chosen, guesses }: GameDisplayProps) {
  const [toDisplay, setToDisplay] = useState("");
  const [toStore, setToStore] = useState("");
  const [localWords, setLocalWords] = useState(guesses);
  const honey_char = chosen[3];
  const { toast } = useToast();

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
        !localWords.includes(toStore)
      ) {
        setLocalWords([...localWords, toStore]);
        setToStore("");
        setToDisplay("");
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
      <div className="grid grid-cols-3 justify-center">
        <GuessBox guesses={localWords}></GuessBox>
        <div className="flex flex-col items-center justify-center">
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

        <Hints />
      </div>
    </>
  );
}
