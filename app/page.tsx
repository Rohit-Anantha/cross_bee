"use client";

import Image from "next/image";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  return (
    <div className="grid h-screen items-center gap-8 overflow-hidden p-8 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-7xl font-extrabold tracking-tight text-amber-400">
          <Typewriter
            words={["Crossword + Spelling Bee", "Meet CrossBee"]}
            loop={5}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>

        <Image
          src="/bee.png"
          width={300}
          height={300}
          alt="Cute Cartoon Bee Icon"
        />
        <div className="flex flex-col items-center p-10 sm:inline-flex">
          <SignedOut>
            <SignInButton>
              <Button size="lg">Get started</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/bee" passHref>
              <Button className="bg-amber-400" size="lg">
                Play CrossBee
              </Button>
            </Link>
          </SignedIn>
        </div>
      </main>
      <footer className="text-center text-sm">
        <div>
          <code>Made with NextJS, ShadCN, Firebase, Clerk, and Llama</code>
        </div>
      </footer>
    </div>
  );
}
