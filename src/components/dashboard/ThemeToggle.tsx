import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
  }, [isLight]);

  return (
    <Tooltip label={isLight ? "Use dark theme" : "Use light theme"}>
      <Button
        variant="outline"
        size="icon"
        aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
        onClick={() => setIsLight((value) => !value)}
      >
        {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>
    </Tooltip>
  );
}
