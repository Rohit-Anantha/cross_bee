"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [chosen, setChosen] = useState([""]); // Initialize as state
  const [possibleWords, setPossibleWords] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://crossbeeflask.vercel.app/"); // Replace with your endpoint URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json(); // Parse JSON directly
        setChosen(jsonData.chosen);
        setPossibleWords(jsonData.possible_words);
        console.log(jsonData.chosen)
        console.log(possibleWords)
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    getData();
  }, []);

  const [toDisplay, setToDisplay] = useState("");
  const [toStore, setToStore] = useState("");
  const handleSymbolClick = (value: string, honey_char: boolean = false) => {
    if (!honey_char) {
      setToDisplay(toDisplay.concat(value));
      setToStore(toDisplay);
    } else {
      setToStore(toStore.concat(value));
      const temp = `${toDisplay}<span style="color: #fbbf24;">${value}</span>`;
      setToDisplay(temp);
    }
  };

  // const chosen = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-10 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <span>
        <h1
          dangerouslySetInnerHTML={{
            __html: toDisplay.valueOf() === "".valueOf() ? "_" : toDisplay,
          }}
          className="text-center text-7xl font-extrabold"
        ></h1>
      </span>
      <div className="grid grid-rows-3 gap-4 p-40">
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => handleSymbolClick(chosen[0])}>
            {chosen[0]}
          </Button>
          <Button onClick={() => handleSymbolClick(chosen[1])}>
            {chosen[1]}
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
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
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => handleSymbolClick(chosen[5])}>
            {chosen[5]}
          </Button>
          <Button onClick={() => handleSymbolClick(chosen[6])}>
            {chosen[6]}
          </Button>
        </div>
      </div>
      <div className="flex items-center">
        <Button className="bg-amber-400" type="submit">
          Guess!
        </Button>
      </div>
    </div>
  );
}
