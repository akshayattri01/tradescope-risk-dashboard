import {
  Activity,
  BarChart3,
  History,
  LayoutDashboard,
  LineChart,
  Shield,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Risk", icon: Shield },
  { label: "Charts", icon: LineChart },
  { label: "Trades", icon: History },
  { label: "Insights", icon: Activity },
  { label: "Reports", icon: BarChart3 },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-dvh w-72 flex-col border-r border-border bg-background/95 p-4 backdrop-blur-xl transition-transform lg:sticky lg:top-16 lg:z-30 lg:h-[calc(100dvh-4rem)] lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Primary navigation"
      >
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="font-bold">Navigation</p>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close navigation">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href="#dashboard"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  index === 0 && "bg-secondary text-foreground",
                )}
                onClick={onClose}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="mt-auto rounded-lg border border-border bg-secondary/35 p-4">
          <p className="text-sm font-semibold">Daily Rule Engine</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            All limits are recalculated from trade data, keeping the dashboard audit-ready.
          </p>
        </div>
      </aside>
    </>
  );
}
