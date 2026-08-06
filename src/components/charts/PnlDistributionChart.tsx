import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatSignedCurrency } from "@/lib/utils";
import type { Trade } from "@/types/trading";

interface PnlDistributionChartProps {
  trades: Trade[];
}

export function PnlDistributionChart({ trades }: PnlDistributionChartProps) {
  const data = trades.map((trade) => ({
    name: `${trade.asset} ${trade.direction}`,
    pnl: trade.pnl,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(148,163,184,0.14)" vertical={false} />
        <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
        <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value) => [formatSignedCurrency(Number(value ?? 0)), "P&L"]}
          contentStyle={{
            background: "rgba(15, 23, 42, 0.94)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            borderRadius: "8px",
            color: "#f8fafc",
          }}
        />
        <Bar dataKey="pnl" radius={[6, 6, 0, 0]} animationDuration={900}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.pnl >= 0 ? "#34d399" : "#f87171"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
