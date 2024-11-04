"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [toDisplay, setToDisplay] = useState("");
  const handleClick = (value: string) => {
    setToDisplay(toDisplay.concat(value));
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDisplay(event.target.value);
  };

  const buttonVals = ['1','2','3','4','5','6','7']
  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="grid grid-rows-3 gap-4 p-40">
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => handleClick(buttonVals[0])}>{buttonVals[0]}</Button>
          <Button onClick={() => handleClick(buttonVals[1])}>{buttonVals[1]}</Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button onClick={() => handleClick(buttonVals[2])}>{buttonVals[2]}</Button>
          <Button className="bg-amber-400" onClick={() => handleClick(buttonVals[3])}>{buttonVals[3]}</Button>
          <Button onClick={() => handleClick(buttonVals[4])}>{buttonVals[4]}</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => handleClick(buttonVals[5])}>{buttonVals[5]}</Button>
          <Button onClick={() => handleClick(buttonVals[6])}>{buttonVals[6]}</Button>
        </div>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="type your guess here..." value={toDisplay} onChange={handleChange}/>
        <Button className="bg-amber-400" type="submit">Guess!</Button>
      </div>
    </div>
  );
}
