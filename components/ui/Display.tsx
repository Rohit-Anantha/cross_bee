// Display.tsx

import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

interface DisplayProps {
  toDisplay: string;
  onBackspace: () => void;
}

export default function Display({ toDisplay, onBackspace }: DisplayProps) {
  return (
    <div className="flex items-center justify-center gap-10">
      <h1
        dangerouslySetInnerHTML={{
          __html: toDisplay === "" ? "_" : toDisplay,
        }}
        className="text-center text-7xl font-extrabold"
      ></h1>
      <Button className="w-min" onClick={onBackspace}>
        <Delete />
      </Button>
    </div>
  );
}
