"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

interface GameDisplayProps {
  chosen: string[];
  possible_words: string[];
}

export default function GameDisplay({
  chosen,
  possible_words,
}: GameDisplayProps) {
  const [toDisplay, setToDisplay] = useState("");
  const [toStore, setToStore] = useState("");
  const honey_char = chosen[3];
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

  return (
    <>
      <div className="flex flex-col justify-center gap-10">
        <div className="flex items-center justify-center gap-10">
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
      <div className="flex items-center">
        <Button className="bg-amber-400 font-extrabold" type="submit">
          SUBMIT
        </Button>
      </div>
    </>
  );
}
