import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <div className="grid grid-rows-3 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Button>1</Button>
          <Button>2</Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button>3</Button>
          <Button className="bg-amber-400">4</Button>
          <Button>5</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button>6</Button>
          <Button>7</Button>
        </div>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Subscribe</Button>
      </div>
    </div>
  );
}
