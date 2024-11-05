"use client";

import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

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
        console.log(jsonData.chosen);
        console.log(jsonData.possible_words);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    getData();
  }, []);

  const [toDisplay, setToDisplay] = useState("");
  const [toStore, setToStore] = useState("");

  const honey_char = chosen[3];

  const handleSymbolClick = (value: string, honey_char: boolean = false) => {
    if (!honey_char) {
      // Update toDisplay and toStore based on the concatenated value
      const updatedDisplay = toDisplay.concat(value);
      setToDisplay(updatedDisplay);
      setToStore(updatedDisplay);
    } else {
      // Update toStore and replace occurrences of value
      const updatedStore = toStore.concat(value);
      setToStore(updatedStore);

      // Replace all occurrences of value in updatedStore and set it to display
      const temp = updatedStore.replace(
        new RegExp(value, "g"),
        `<span style="color: #fbbf24;">${value}</span>`,
      );
      setToDisplay(temp);
    }
  };

  const handleBackspace = () => {
    const updatedStore = toStore.substring(0, toStore.length - 1);
    // dont' delete
    console.log(updatedStore);
    setToStore(updatedStore);

    // Replace all occurrences of the honey char in updatedStore and set it to display
    const temp = updatedStore.replace(
      new RegExp(honey_char, "g"),
      `<span style="color: #fbbf24;">${honey_char}</span>`,
    );
    setToDisplay(temp);
  };

  // const chosen = ["1", "2", "3", "4", "5", "6", "7"];
  return (
    <div className="grid grid-cols-3 items-center">
      <div className="flex items-center">Guesses Here</div>
      <div className="min-h-screen items-center justify-items-center gap-16 p-10 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <span className="flex items-center justify-center gap-10 self-center">
          <h1
            dangerouslySetInnerHTML={{
              __html: toDisplay === "" ? "_" : toDisplay,
            }}
            className="text-center text-7xl font-extrabold"
          ></h1>
          <Button className="w-min" onClick={handleBackspace}>
            <Delete />
          </Button>
        </span>
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
      </div>
      <div className="flex items-center">
        <p>Hints Go Here</p>
      </div>
    </div>
  );
}
