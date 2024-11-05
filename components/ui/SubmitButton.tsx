// SubmitButton.tsx

import { Button } from "@/components/ui/button";

export default function SubmitButton() {
  return (
    <div className="flex items-center">
      <Button className="bg-amber-400 font-extrabold" type="submit">
        SUBMIT
      </Button>
    </div>
  );
}
