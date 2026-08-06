import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { TimelinePoint } from "@/types/trading";

interface BalanceTimelineChartProps {
  data: TimelinePoint[];
}

export function BalanceTimelineChart({ data }: BalanceTimelineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(148,163,184,0.14)" vertical={false} />
        <XAxis dataKey="trade" stroke="#94a3b8" tick={{ fontSize: 12 }} />
        <YAxis
          stroke="#94a3b8"
          tick={{ fontSize: 12 }}
          tickFormatter={(value: number) => `$${Math.round(value / 1000)}k`}
          domain={["dataMin - 500", "dataMax + 500"]}
        />
        <Tooltip
          formatter={(value) => [formatCurrency(Number(value ?? 0)), "Balance"]}
          contentStyle={{
            background: "rgba(15, 23, 42, 0.94)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            borderRadius: "8px",
            color: "#f8fafc",
          }}
        />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="#a78bfa"
          strokeWidth={3}
          dot={{ fill: "#a78bfa", r: 4 }}
          activeDot={{ r: 6 }}
          animationDuration={900}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
