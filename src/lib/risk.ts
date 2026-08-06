import type {
  AccountRules,
  RiskMetrics,
  RiskStatus,
  TimelinePoint,
  Trade,
} from "@/types/trading";

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function average(values: number[]) {
  return values.length === 0 ? 0 : sum(values) / values.length;
}

function getPeakToCurrentDrawdown(startingBalance: number, trades: Trade[]) {
  let balance = startingBalance;
  let peak = startingBalance;

  for (const trade of trades) {
    balance += trade.pnl;
    peak = Math.max(peak, balance);
  }

  return Math.max(0, peak - balance);
}

export function getRiskStatus(
  drawdownUsedPercentage: number,
  dailyLossUsedPercentage: number,
): RiskStatus {
  const riskUsed = Math.max(drawdownUsedPercentage, dailyLossUsedPercentage);

  if (riskUsed >= 85) {
    return "AT RISK";
  }

  if (riskUsed >= 60) {
    return "APPROACHING LIMIT";
  }

  return "SAFE";
}

export function calculateRiskMetrics(
  accountRules: AccountRules,
  trades: Trade[],
): RiskMetrics {
  const pnls = trades.map((trade) => trade.pnl);
  const winners = pnls.filter((pnl) => pnl > 0);
  const losers = pnls.filter((pnl) => pnl < 0);
  const grossProfit = sum(winners);
  const grossLoss = Math.abs(sum(losers));
  const totalPnl = sum(pnls);
  const currentBalance = accountRules.startingBalance + totalPnl;
  const currentDrawdown = getPeakToCurrentDrawdown(
    accountRules.startingBalance,
    trades,
  );
  const remainingDrawdown = Math.max(
    0,
    accountRules.maximumDrawdown - currentDrawdown,
  );
  const currentDayLoss = Math.abs(sum(losers));
  const remainingDailyLossLimit = Math.max(
    0,
    accountRules.dailyLossLimit - currentDayLoss,
  );
  const riskPercentage =
    (currentDrawdown / accountRules.maximumDrawdown) * 100;
  const dailyRiskPercentage =
    (currentDayLoss / accountRules.dailyLossLimit) * 100;

  return {
    currentBalance,
    totalPnl,
    winningTrades: winners.length,
    losingTrades: losers.length,
    winRate: trades.length === 0 ? 0 : (winners.length / trades.length) * 100,
    largestWinningTrade: winners.length === 0 ? 0 : Math.max(...winners),
    largestLosingTrade: losers.length === 0 ? 0 : Math.min(...losers),
    averageWinningTrade: average(winners),
    averageLosingTrade: average(losers),
    profitFactor: grossLoss === 0 ? grossProfit : grossProfit / grossLoss,
    currentDrawdown,
    remainingDrawdown,
    currentDayLoss,
    remainingDailyLossLimit,
    riskPercentage,
    dailyRiskPercentage,
    riskStatus: getRiskStatus(riskPercentage, dailyRiskPercentage),
  };
}

export function buildEquityTimeline(
  startingBalance: number,
  trades: Trade[],
): TimelinePoint[] {
  let balance = startingBalance;

  return [
    { trade: "Start", balance, pnl: 0 },
    ...trades.map((trade) => {
      balance += trade.pnl;
      return {
        trade: `${trade.asset} ${trade.direction}`,
        balance,
        pnl: trade.pnl,
      };
    }),
  ];
}

export function getAssetPerformance(trades: Trade[]) {
  const performance = trades.reduce<Record<string, number>>((acc, trade) => {
    acc[trade.asset] = (acc[trade.asset] ?? 0) + trade.pnl;
    return acc;
  }, {});

  return Object.entries(performance)
    .map(([asset, pnl]) => ({ asset, pnl }))
    .sort((a, b) => b.pnl - a.pnl);
}

export function generateInsights(
  metrics: RiskMetrics,
  accountRules: AccountRules,
  trades: Trade[],
) {
  const assetPerformance = getAssetPerformance(trades);
  const bestAsset = assetPerformance[0];
  const averageWinAbs = Math.abs(metrics.averageWinningTrade);
  const averageLossAbs = Math.abs(metrics.averageLosingTrade);
  const drawdownUsed = Math.round(
    (metrics.currentDrawdown / accountRules.maximumDrawdown) * 100,
  );

  const insights = [
    `You currently have a ${metrics.winRate.toFixed(0)}% win rate across ${trades.length} closed trades.`,
  ];

  if (bestAsset) {
    insights.push(`${bestAsset.asset} is your best performing asset today.`);
  }

  insights.push(
    metrics.riskStatus === "SAFE"
      ? "You are well within your risk limits."
      : "Risk usage is elevated and position sizing should be reviewed.",
  );

  if (averageLossAbs > 0 && averageWinAbs > averageLossAbs * 1.5) {
    insights.push(
      "Average winning trade is significantly larger than average losing trade.",
    );
  }

  insights.push(
    `You have used ${drawdownUsed}% of your maximum drawdown allowance.`,
  );

  return insights;
}
