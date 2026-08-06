import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { RiskMetrics } from "@/types/trading";

interface WinLossPieChartProps {
  metrics: RiskMetrics;
}

export function WinLossPieChart({ metrics }: WinLossPieChartProps) {
  const data = [
    { name: "Wins", value: metrics.winningTrades, color: "#34d399" },
    { name: "Losses", value: metrics.losingTrades, color: "#f87171" },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={58}
          outerRadius={96}
          paddingAngle={4}
          animationDuration={900}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "rgba(15, 23, 42, 0.94)",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            borderRadius: "8px",
            color: "#f8fafc",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
