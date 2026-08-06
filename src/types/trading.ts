export type TradeDirection = "Long" | "Short";
export type RiskStatus = "SAFE" | "APPROACHING LIMIT" | "AT RISK";

export interface Trade {
  id: string;
  asset: "BTC" | "ETH" | "SOL";
  direction: TradeDirection;
  pnl: number;
  openedAt: string;
}

export interface AccountRules {
  startingBalance: number;
  maximumDrawdown: number;
  dailyLossLimit: number;
}

export interface RiskMetrics {
  currentBalance: number;
  totalPnl: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  largestWinningTrade: number;
  largestLosingTrade: number;
  averageWinningTrade: number;
  averageLosingTrade: number;
  profitFactor: number;
  currentDrawdown: number;
  remainingDrawdown: number;
  currentDayLoss: number;
  remainingDailyLossLimit: number;
  riskPercentage: number;
  dailyRiskPercentage: number;
  riskStatus: RiskStatus;
}

export interface TimelinePoint {
  trade: string;
  balance: number;
  pnl: number;
}
