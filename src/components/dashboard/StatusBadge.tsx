import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RiskStatus } from "@/types/trading";

interface StatusBadgeProps {
  status: RiskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    SAFE: {
      icon: ShieldCheck,
      variant: "safe" as const,
      label: "SAFE",
    },
    "APPROACHING LIMIT": {
      icon: ShieldQuestion,
      variant: "warning" as const,
      label: "APPROACHING LIMIT",
    },
    "AT RISK": {
      icon: ShieldAlert,
      variant: "danger" as const,
      label: "AT RISK",
    },
  }[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="gap-1.5">
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {config.label}
    </Badge>
  );
}
