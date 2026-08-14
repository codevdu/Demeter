import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ProductivityPie, { pieData } from "../pie-chart";

export function SoilSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card data-slot="soil-section">
      <CardHeader>
        <CardTitle>Distribuição de Cultivo</CardTitle>
        <CardDescription>Setor A-24</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <ProductivityPie hoveredIndex={hoveredIndex} onHoverChange={setHoveredIndex} />

        <dl className="flex w-full flex-col gap-2.5">
          {pieData.map((item, index) => {
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            const isActive = hoveredIndex === index;

            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "flex cursor-default items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors",
                  isActive && "bg-muted"
                )}
              >
                <dt
                  className={cn(
                    "flex items-center gap-2 transition-colors",
                    isActive ? "text-foreground" : "text-foreground-subtle"
                  )}
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden
                  />
                  {item.label}
                </dt>

                <dd
                  className={cn(
                    "font-medium transition-colors",
                    isActive ? "text-foreground" : "text-foreground-subtle"
                  )}
                >
                  {percentage}%
                </dd>
              </div>
            );
          })}
        </dl>
      </CardContent>
    </Card>
  );
}