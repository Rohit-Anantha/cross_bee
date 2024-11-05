// Home.tsx

"use client";
import { useEffect, useState } from "react";
import Display from "../../components/ui/Display";
import SymbolGrid from "../../components/ui/SymbolGrid";
import SubmitButton from "../../components/ui/SubmitButton";
import GuessBox from "../../components/ui/GuessBox";
import Hints from "../../components/ui/Hints";

export default function Home() {
  const [chosen, setChosen] = useState([""]);
  const [possibleWords, setPossibleWords] = useState([]);
  const [toDisplay, setToDisplay] = useState("");
  const [toStore, setToStore] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://crossbeeflask.vercel.app/");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const jsonData = await response.json();
        setChosen(jsonData.chosen);
        setPossibleWords(jsonData.possible_words);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    getData();
  }, []);

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
    <div className="grid grid-cols-3 items-center">
      <GuessBox />
      <div className="min-h-screen items-center justify-items-center gap-16 p-10 pb-20 sm:p-20">
        <Display toDisplay={toDisplay} onBackspace={handleBackspace} />
        <SymbolGrid
          chosen={chosen}
          onClick={handleSymbolClick}
          honeyChar={honey_char}
        />
        <SubmitButton />
      </div>
      <Hints />
    </div>
  );
}
