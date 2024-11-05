// SymbolGrid.tsx

import { Button } from "@/components/ui/button";

interface SymbolGridProps {
  chosen: string[];
  onClick: (symbol: string, isHoneyChar?: boolean) => void;
  honeyChar?: string;
}

export default function SymbolGrid({
  chosen,
  onClick,
  honeyChar,
}: SymbolGridProps) {
  return (
    <div className="grid grid-rows-3 gap-4 p-40">
      <div className="flex justify-center gap-4">
        <Button onClick={() => onClick(chosen[0])}>{chosen[0]}</Button>
        <Button onClick={() => onClick(chosen[1])}>{chosen[1]}</Button>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => onClick(chosen[2])}>{chosen[2]}</Button>
        <Button
          className="bg-amber-400"
          onClick={() => onClick(chosen[3], true)}
        >
          {chosen[3]}
        </Button>
        <Button onClick={() => onClick(chosen[4])}>{chosen[4]}</Button>
      </div>
      <div className="flex justify-center gap-4">
        <Button onClick={() => onClick(chosen[5])}>{chosen[5]}</Button>
        <Button onClick={() => onClick(chosen[6])}>{chosen[6]}</Button>
      </div>
    </div>
  );
}
