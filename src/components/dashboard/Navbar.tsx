import { CalendarDays, Menu, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const currentDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/78 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-glow">
            <TrendingUp className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold leading-4">ApexRisk</p>
            <h1 className="text-lg font-bold tracking-normal sm:text-xl">
              Trader Risk Dashboard
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm text-muted-foreground sm:flex">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {currentDate}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
