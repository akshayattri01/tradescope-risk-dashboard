import { AlertTriangle, Gauge, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { AccountRules, RiskMetrics } from "@/types/trading";

interface RiskCardProps {
  metrics: RiskMetrics;
  rules: AccountRules;
}

export function RiskCard({ metrics, rules }: RiskCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Risk Dashboard</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Account protection rules calculated from closed trades.
          </p>
        </div>
        <StatusBadge status={metrics.riskStatus} />
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <Gauge className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="text-xs text-muted-foreground">Current Drawdown</p>
            <p className="mt-1 text-lg font-bold">{formatCurrency(metrics.currentDrawdown)}</p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <Shield className="mb-3 h-5 w-5 text-emerald-300" aria-hidden="true" />
            <p className="text-xs text-muted-foreground">Remaining Drawdown</p>
            <p className="mt-1 text-lg font-bold">{formatCurrency(metrics.remainingDrawdown)}</p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <AlertTriangle className="mb-3 h-5 w-5 text-amber-300" aria-hidden="true" />
            <p className="text-xs text-muted-foreground">Current Day Loss</p>
            <p className="mt-1 text-lg font-bold">{formatCurrency(metrics.currentDayLoss)}</p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <Shield className="mb-3 h-5 w-5 text-violet-300" aria-hidden="true" />
            <p className="text-xs text-muted-foreground">Remaining Daily Loss</p>
            <p className="mt-1 text-lg font-bold">
              {formatCurrency(metrics.remainingDailyLossLimit)}
            </p>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-border bg-secondary/25 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Risk Meter</p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(metrics.currentDrawdown)} used from a{" "}
                {formatCurrency(rules.maximumDrawdown)} max drawdown rule.
              </p>
            </div>
            <span className="text-lg font-bold">{formatPercent(metrics.riskPercentage)}</span>
          </div>
          <Progress
            value={metrics.riskPercentage}
            ariaLabel="Maximum drawdown usage"
            indicatorClassName="bg-gradient-to-r from-emerald-400 via-amber-300 to-red-400"
          />
        </div>
      </CardContent>
    </Card>
  );
}
