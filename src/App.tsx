import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BadgeDollarSign,
  Bell,
  ChartNoAxesCombined,
  CircleDollarSign,
  Percent,
  ShieldCheck,
  Trophy,
  Wallet,
} from "lucide-react";
import { BalanceTimelineChart } from "@/components/charts/BalanceTimelineChart";
import { EquityCurveChart } from "@/components/charts/EquityCurveChart";
import { PnlDistributionChart } from "@/components/charts/PnlDistributionChart";
import { WinLossPieChart } from "@/components/charts/WinLossPieChart";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { RiskCard } from "@/components/dashboard/RiskCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { TradeTable } from "@/components/dashboard/TradeTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRiskMetrics } from "@/hooks/useRiskMetrics";
import {
  formatCurrency,
  formatPercent,
  formatSignedCurrency,
} from "@/lib/utils";

function App() {
  const { metrics, trades, timeline, insights, accountRules, assetPerformance } =
    useRiskMetrics();
  const stats = [
    {
      label: "Winning Trades",
      value: metrics.winningTrades,
      icon: Trophy,
      formatter: (value: number) => Math.round(value).toString(),
    },
    {
      label: "Losing Trades",
      value: metrics.losingTrades,
      icon: ArrowDownRight,
      formatter: (value: number) => Math.round(value).toString(),
    },
    {
      label: "Largest Winning Trade",
      value: metrics.largestWinningTrade,
      icon: ArrowUpRight,
      formatter: formatSignedCurrency,
    },
    {
      label: "Largest Losing Trade",
      value: metrics.largestLosingTrade,
      icon: ArrowDownRight,
      formatter: formatSignedCurrency,
    },
    {
      label: "Average Winning Trade",
      value: metrics.averageWinningTrade,
      icon: CircleDollarSign,
      formatter: formatSignedCurrency,
    },
    {
      label: "Average Losing Trade",
      value: metrics.averageLosingTrade,
      icon: BadgeDollarSign,
      formatter: formatSignedCurrency,
    },
    {
      label: "Profit Factor",
      value: metrics.profitFactor,
      icon: ChartNoAxesCombined,
      formatter: (value: number) => value.toFixed(2),
    },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <section className="grid gap-4 metric-grid">
          <MetricCard
            title="Current Balance"
            value={metrics.currentBalance}
            formatter={formatCurrency}
            icon={Wallet}
            tone="positive"
            trend={`${formatSignedCurrency(metrics.totalPnl)} net from ${formatCurrency(
              accountRules.startingBalance,
            )} start`}
          />
          <MetricCard
            title="Total P&L"
            value={metrics.totalPnl}
            formatter={formatSignedCurrency}
            icon={Activity}
            tone={metrics.totalPnl >= 0 ? "positive" : "negative"}
            trend="Closed-trade realized performance"
          />
          <MetricCard
            title="Win Rate"
            value={metrics.winRate}
            formatter={formatPercent}
            icon={Percent}
            tone="accent"
            trend={`${metrics.winningTrades} wins from ${trades.length} trades`}
          />
          <MetricCard
            title="Risk Status"
            value={metrics.riskPercentage}
            formatter={formatPercent}
            icon={ShieldCheck}
            tone="neutral"
            trend="Maximum risk utilization"
          >
            <div className="mt-4">
              <StatusBadge status={metrics.riskStatus} />
            </div>
          </MetricCard>
        </section>

        <section>
          <SectionHeader
            eyebrow="Trading Statistics"
            title="Execution quality"
            description="A concise view of win/loss balance, payoff quality, and realized edge."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <MetricCard
                key={stat.label}
                title={stat.label}
                value={stat.value}
                icon={stat.icon}
                formatter={stat.formatter}
                tone={stat.value < 0 ? "negative" : "neutral"}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          <RiskCard metrics={metrics} rules={accountRules} />
          <div className="grid gap-4">
            <ProgressCard
              label="Max Drawdown Used"
              value={metrics.riskPercentage}
              detail={`${formatCurrency(metrics.remainingDrawdown)} remaining before breach.`}
              tone={metrics.riskPercentage > 60 ? "warning" : "safe"}
            />
            <ProgressCard
              label="Daily Loss Used"
              value={metrics.dailyRiskPercentage}
              detail={`${formatCurrency(metrics.remainingDailyLossLimit)} daily loss room remains.`}
              tone={metrics.dailyRiskPercentage > 60 ? "warning" : "safe"}
            />
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Charts"
            title="Performance telemetry"
            description="Interactive visualizations for balance trajectory, trade distribution, and account health."
          />
          <div className="grid gap-4 xl:grid-cols-2">
            <ChartCard title="Equity Curve" subtitle="Balance progression after every trade.">
              <EquityCurveChart data={timeline} />
            </ChartCard>
            <ChartCard title="Win vs Loss" subtitle="Closed trade outcome split.">
              <WinLossPieChart metrics={metrics} />
            </ChartCard>
            <ChartCard title="P&L Distribution" subtitle="Per-trade realized gains and losses.">
              <PnlDistributionChart trades={trades} />
            </ChartCard>
            <ChartCard title="Account Balance Timeline" subtitle="Intraday account balance flow.">
              <BalanceTimelineChart data={timeline} />
            </ChartCard>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <p className="text-sm text-muted-foreground">
                Responsive audit trail of all closed trades.
              </p>
            </CardHeader>
            <CardContent>
              <TradeTable trades={trades} />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assetPerformance.map((asset) => (
                  <div
                    key={asset.asset}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3"
                  >
                    <span className="font-semibold">{asset.asset}</span>
                    <span
                      className={
                        asset.pnl >= 0 ? "font-bold text-emerald-300" : "font-bold text-red-300"
                      }
                    >
                      {formatSignedCurrency(asset.pnl)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>Animated Notifications</CardTitle>
                <Bell className="h-5 w-5 text-primary" aria-hidden="true" />
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <motion.p
                  className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3"
                  animate={{ opacity: [0.72, 1, 0.72] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                >
                  Risk engine confirms account is inside funded-trader rules.
                </motion.p>
                <p className="rounded-lg border border-border bg-secondary/30 p-3">
                  Latest closed trade improved balance by {formatSignedCurrency(trades.at(-1)?.pnl ?? 0)}.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Trade Performance Insights"
            title="Automatic analyst notes"
            description="Data-derived observations generated from the current trade set."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {insights.map((insight, index) => (
              <InsightCard key={insight} insight={insight} index={index} />
            ))}
          </div>
        </section>
      </motion.div>
    </DashboardLayout>
  );
}

export default App;
