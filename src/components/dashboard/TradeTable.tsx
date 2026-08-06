import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatSignedCurrency } from "@/lib/utils";
import type { Trade } from "@/types/trading";

interface TradeTableProps {
  trades: Trade[];
}

export function TradeTable({ trades }: TradeTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Asset</th>
              <th className="px-4 py-3 font-semibold">Direction</th>
              <th className="px-4 py-3 font-semibold">P&L</th>
              <th className="px-4 py-3 font-semibold">Trade Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {trades.map((trade) => {
              const profitable = trade.pnl >= 0;
              return (
                <tr key={trade.id} className="transition-colors hover:bg-secondary/35">
                  <td className="px-4 py-4 font-semibold">{trade.asset}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      {trade.direction === "Long" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-amber-300" aria-hidden="true" />
                      )}
                      {trade.direction}
                    </span>
                  </td>
                  <td
                    className={
                      profitable
                        ? "px-4 py-4 font-bold text-emerald-300"
                        : "px-4 py-4 font-bold text-red-300"
                    }
                  >
                    {formatSignedCurrency(trade.pnl)}
                  </td>
                  <td className="px-4 py-4">
                    <Badge variant={profitable ? "safe" : "danger"}>
                      {profitable ? "Profit" : "Loss"}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
