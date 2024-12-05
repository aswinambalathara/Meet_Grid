import { ChevronRight, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function RightButtonIcon() {
  return (
    <Button variant="ghost" className="bg-slate-700/50" size="icon">
      <ChevronRight />
    </Button>
  );
}

export function LeftButtonIcon() {
  return (
    <Button variant="ghost" className="bg-slate-700/50" size="icon">
      <ChevronLeft />
    </Button>
  );
}
