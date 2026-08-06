import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  className?: string;
  indicatorClassName?: string;
  ariaLabel: string;
}

export function Progress({
  value,
  className,
  indicatorClassName,
  ariaLabel,
}: ProgressProps) {
  const normalized = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn("h-2.5 overflow-hidden rounded-full bg-secondary", className)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(normalized)}
    >
      <motion.div
        className={cn("h-full rounded-full bg-primary", indicatorClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${normalized}%` }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}
