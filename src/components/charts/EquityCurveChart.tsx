import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { TimelinePoint } from "@/types/trading";

interface EquityCurveChartProps {
  data: TimelinePoint[];
}

export function EquityCurveChart({ data }: EquityCurveChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="equityGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.45} />
            <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.02} />
          </linearGradient>
        </defs>
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
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#2dd4bf"
          strokeWidth={3}
          fill="url(#equityGradient)"
          animationDuration={900}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
