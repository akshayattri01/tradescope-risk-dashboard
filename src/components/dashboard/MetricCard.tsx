import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/dashboard/AnimatedNumber";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  formatter: (value: number) => string;
  icon: LucideIcon;
  trend?: string;
  tone?: "positive" | "negative" | "neutral" | "accent";
  children?: ReactNode;
}

export function MetricCard({
  title,
  value,
  formatter,
  icon: Icon,
  trend,
  tone = "neutral",
  children,
}: MetricCardProps) {
  const toneClass = {
    positive: "text-emerald-300 bg-emerald-400/12",
    negative: "text-red-300 bg-red-400/12",
    neutral: "text-primary bg-primary/12",
    accent: "text-violet-300 bg-violet-400/12",
  }[tone];

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <Card className="h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="mt-3 text-2xl font-bold tracking-normal sm:text-3xl">
                <AnimatedNumber value={value} formatter={formatter} />
              </p>
            </div>
            <div className={cn("rounded-md p-2.5", toneClass)}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          {trend ? (
            <p className="mt-4 text-sm text-muted-foreground">{trend}</p>
          ) : null}
          {children}
        </CardContent>
      </Card>
    </motion.article>
  );
}
