import type { AccountRules, Trade } from "@/types/trading";

export const accountRules: AccountRules = {
  startingBalance: 100_000,
  maximumDrawdown: 10_000,
  dailyLossLimit: 5_000,
};

export const trades: Trade[] = [
  {
    id: "TRD-1001",
    asset: "BTC",
    direction: "Long",
    pnl: 1_200,
    openedAt: "2026-08-04T09:15:00+05:30",
  },
  {
    id: "TRD-1002",
    asset: "ETH",
    direction: "Short",
    pnl: -450,
    openedAt: "2026-08-04T10:05:00+05:30",
  },
  {
    id: "TRD-1003",
    asset: "BTC",
    direction: "Short",
    pnl: 800,
    openedAt: "2026-08-04T11:30:00+05:30",
  },
  {
    id: "TRD-1004",
    asset: "SOL",
    direction: "Long",
    pnl: -300,
    openedAt: "2026-08-04T13:45:00+05:30",
  },
  {
    id: "TRD-1005",
    asset: "ETH",
    direction: "Long",
    pnl: 2_000,
    openedAt: "2026-08-04T15:20:00+05:30",
  },
];
