"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [toDisplay, setToDisplay] = useState("");
  const handleSymbolClick = (value: string, honey_char: boolean = false) => {
    if (!honey_char) {
      setToDisplay(toDisplay.concat(value));
    } else {
      const temp = `${toDisplay}<span style="color: #fbbf24;">${value}</span>`;
      setToDisplay(temp);
    }
  };

  const buttonVals = ["1", "2", "3", "4", "5", "6", "7"];
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
          <Button onClick={() => handleSymbolClick(buttonVals[0])}>
            {buttonVals[0]}
          </Button>
          <Button onClick={() => handleSymbolClick(buttonVals[1])}>
            {buttonVals[1]}
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button onClick={() => handleSymbolClick(buttonVals[2])}>
            {buttonVals[2]}
          </Button>
          <Button
            className="bg-amber-400"
            onClick={() => handleSymbolClick(buttonVals[3], true)}
          >
            {buttonVals[3]}
          </Button>
          <Button onClick={() => handleSymbolClick(buttonVals[4])}>
            {buttonVals[4]}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => handleSymbolClick(buttonVals[5])}>
            {buttonVals[5]}
          </Button>
          <Button onClick={() => handleSymbolClick(buttonVals[6])}>
            {buttonVals[6]}
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
