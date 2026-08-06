import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface InsightCardProps {
  insight: string;
  index: number;
}

export function InsightCard({ insight, index }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <Card className="h-full">
        <CardContent className="flex h-full gap-3 p-4">
          <div className="mt-0.5 h-fit rounded-md bg-primary/12 p-2 text-primary">
            <Lightbulb className="h-4 w-4" aria-hidden="true" />
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{insight}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
