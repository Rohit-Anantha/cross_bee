"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import GuessBox from "./GuessBox";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { generateText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface GameDisplayProps {
  chosen: string[];
  possible_words: string[];
  guesses: string[];
  honey_char: string;
}

export default function GameDisplay({
  chosen,
  possible_words,
  guesses,
  honey_char,
}: GameDisplayProps) {
  // Dangerous HTML display
  const [toDisplay, setToDisplay] = useState("");
  // actual processing word
  const [toStore, setToStore] = useState("");
  // current user guesses
  const [localWords, setLocalWords] = useState(guesses);
  // center character aka "honey character"
  // user's score that changes when they earn points.
  const [score, setScore] = useState(0);
  // the hint generated by llama
  const [hint, setHint] = useState("");
  // the random word retrieved when the hint
  const [hintWord, setHintWord] = useState("");
  console.log(hintWord);
  // toast const in order to display error message
  const { toast } = useToast();
  // function for making word into points for score
  // const add_score = (word: string) => 1 + (word.length - 1) * 3;
  // total possible score from the list of generated top 10k words
  const totalScore = possible_words.reduce((sum, word) => {
    const score = 1 + (word.length - 1) * 2; // Calculate score for each word
    return sum + score; // Add score to the running total
  }, 0);
  // checkpoints for score based on the total score
  const checkpoints = [0, 1, 2, 3, 4].map((i) => (totalScore / 4) * i);
  // groq agent
  const groq = createGroq({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  });

  // when a button is clicked, update the displays and such
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

  // when the user asks for a hint, get a hint for one of the words they haven't
  // guessed yet
  const handleHint = async () => {
    // if (!localWords.includes(hintWord)) {
    //   // the user hasn't guessed the word from the hint, don't generate a new one
    //   return;
    // }
    const unguessedWords = possible_words.filter(
      (word) => !localWords.includes(word),
    );
    console.log(unguessedWords);
    const temp = Math.floor(Math.random() * unguessedWords.length);
    const tempHintWord = unguessedWords[temp];
    setHintWord(tempHintWord);
    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt:
        "Respond with a cryptic one sentence crossword style clue for the following word. Do not give any other information than the sentence. Here's the word:" +
        tempHintWord,
    });
    setHint(tempHintWord.length + " letters: " + text);
  };

  // when we click backspace, remove one of the letters
  const handleBackspace = () => {
    const updatedStore = toStore.slice(0, -1);
    setToStore(updatedStore);
    const updatedDisplay = updatedStore
      .split("")
      .map((char) => {
        if (chosen.includes(char)) {
          // Highlight honey_char or keep the valid character
          return char === honey_char
            ? `<span style="color: #fbbf24;">${char}</span>`
            : char;
        } else {
          // Grey out characters not in chosenCharacters
          return `<span style="color: #d1d5db;">${char}</span>`;
        }
      })
      .join("");
    setToDisplay(updatedDisplay);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Enter") {
      event.preventDefault();
      handleWordSubmit();
    } else if (event.key === "Backspace") {
      // Handle backspace
      const updatedStore = toStore.slice(0, -1);
      setToStore(updatedStore);
      const updatedDisplay = updatedStore
        .split("")
        .map((char) => {
          if (chosen.includes(char)) {
            // Highlight honey_char or keep the valid character
            return char === honey_char
              ? `<span style="color: #fbbf24;">${char}</span>`
              : char;
          } else {
            // Grey out characters not in chosenCharacters
            return `<span style="color: #d1d5db;">${char}</span>`;
          }
        })
        .join("");
      setToDisplay(updatedDisplay);
    } else if (event.key.length === 1) {
      // Handle character input (ignores special keys like Shift, Ctrl, etc.)
      const updatedStore = toStore + event.key.toUpperCase();
      setToStore(updatedStore);
      const updatedDisplay = updatedStore
        .split("")
        .map((char) => {
          if (chosen.includes(char)) {
            // Highlight honey_char or keep the valid character
            return char === honey_char
              ? `<span style="color: #fbbf24;">${char}</span>`
              : char;
          } else {
            // Grey out characters not in chosenCharacters
            return `<span style="color: #d1d5db;">${char}</span>`;
          }
        })
        .join("");
      setToDisplay(updatedDisplay);
    }
    // You can add more cases here for other keys if needed
  };

  // Attach the event listener when the component mounts
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [toStore, honey_char]);

  // check if a word submitted by the user exists in the dictionary, maybe not in our possible words
  async function isValidWord(word: string) {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    if (!response.ok) {
      return false;
    }
    return true;
  }

  // when a submit is pressed, add it to the list of guesses if it's correct.
  // display info if not.
  const handleWordSubmit = () => {
    isValidWord(toStore).then((isValid) => {
      const allCharactersValid = toStore
        .split("")
        .every((char) => chosen.includes(char));
      if (!allCharactersValid) {
        return false;
      }
      if (
        (isValid || possible_words.includes(toStore)) &&
        allCharactersValid &&
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
      } else if (!allCharactersValid) {
        toast({
          variant: "destructive",
          title: "Make sure to use only the given characters!",
          description: "Did you mispell something?",
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="w-min self-center bg-amber-400"
              onClick={handleHint}
            >
              Get Hint?
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Your Hint is:</AlertDialogTitle>
              <AlertDialogDescription>{hint}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <GuessBox guesses={localWords}></GuessBox>
      </div>
      <div className="col-span-2 flex flex-col items-center">
        <div className="flex flex-col justify-center gap-5">
          <div className="justify-center gap-5">
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
            onClick={() => handleWordSubmit()}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  );
}
