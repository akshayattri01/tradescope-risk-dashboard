import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatPercent } from "@/lib/utils";

interface ProgressCardProps {
  label: string;
  value: number;
  detail: string;
  tone?: "safe" | "warning" | "danger";
}

export function ProgressCard({
  label,
  value,
  detail,
  tone = "safe",
}: ProgressCardProps) {
  const toneClass = {
    safe: "bg-emerald-400",
    warning: "bg-amber-400",
    danger: "bg-red-400",
  }[tone];

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">{label}</p>
          <span className="text-sm text-muted-foreground">{formatPercent(value)}</span>
        </div>
        <Progress
          value={value}
          ariaLabel={label}
          className="mt-4"
          indicatorClassName={toneClass}
        />
        <p className="mt-3 text-sm text-muted-foreground">{detail}</p>
      </CardContent>
    </Card>
  );
}
