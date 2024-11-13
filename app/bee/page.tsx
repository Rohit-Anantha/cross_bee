// Home.tsx
import { auth } from "@clerk/nextjs/server";
import GuessBox from "../../components/ui/GuessBox";
import Hints from "../../components/ui/Hints";
import GameWrapper from "@/components/ui/GameWrapper";
import { getGuesses } from "@/src/db/queries";

export default async function Home() {
  // async call to api directly
  const data = await getData();
  if (!data) {
    // Handle the case where data is undefined
    return [[""], [""]];
  }
  const [chosen] = data;

  async function getData() {
    try {
      const response = await fetch("https://crossbeeflask.vercel.app/");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const jsonData = await response.json();
      return [jsonData.chosen as string[]];
    } catch (error) {
      console.error("Fetch error:", error);
      return [[""], [""]];
    }
  }
  async function getGuessesData() {
    const data = await getGuesses();
    console.log("get Guesses {data}");
    console.log(data);
    if (data === null) {
      return [{ content: "No Guesses Yet" }];
    }
    return data;
  }
  // const guesses_data = await getGuessesData();
  const guesses_data = [{ content: "" }];
  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-10 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <GameWrapper
        chosen={chosen}
        guesses={guesses_data.map((guess) => guess.content)}
      ></GameWrapper>
    </div>
  );
}
