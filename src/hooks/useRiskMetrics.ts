import { useMemo } from "react";
import { accountRules, trades } from "@/data/trades";
import {
  buildEquityTimeline,
  calculateRiskMetrics,
  generateInsights,
  getAssetPerformance,
} from "@/lib/risk";

export function useRiskMetrics() {
  return useMemo(() => {
    const metrics = calculateRiskMetrics(accountRules, trades);
    const timeline = buildEquityTimeline(accountRules.startingBalance, trades);
    const insights = generateInsights(metrics, accountRules, trades);
    const assetPerformance = getAssetPerformance(trades);

    return {
      accountRules,
      trades,
      metrics,
      timeline,
      insights,
      assetPerformance,
    };
  }, []);
}
