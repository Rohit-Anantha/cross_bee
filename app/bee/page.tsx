// Home.tsx
import { Button } from "@/components/ui/button";
import GameWrapper from "@/components/ui/GameWrapper";
import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";

export default async function Home() {
  // async call to api directly
  const data = await getData();
  if (!data) {
    // Handle the case where data is undefined
    return [[""], [""]];
  }
  const [chosen, possible_words] = data;

  async function getData() {
    try {
      const response = await fetch("https://crossbeeflask.vercel.app/");
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const jsonData = await response.json();
      return [jsonData.chosen as string[], jsonData.possible_words as string[]];
    } catch (error) {
      console.error("Fetch error:", error);
      return [[""], [""]];
    }
  }
  // async function getGuessesData() {
  //   const data = await getGuesses();
  //   console.log("get Guesses {data}");
  //   console.log(data);
  //   if (data === null) {
  //     return [{ content: "No Guesses Yet" }];
  //   }
  //   return data;
  // }
  // const guesses_data = await getGuessesData();
  const guesses_data = [{ content: "" }];
  return (
    <>
      <div className="p-5">
        <SignedOut>
          <SignInButton>
            <Button>Sign In:</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton></UserButton>
        </SignedIn>
      </div>
      <div className="font-[family-name:var(--font-geist-sans)] sm:p-20">
        <GameWrapper
          chosen={chosen}
          possible_words={possible_words}
          guesses={guesses_data.map((guess) => guess.content)}
        ></GameWrapper>
      </div>
    </>
  );
}
