import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import Productivity from "../productivity-rain";

const series = [
  // Dados anteriores
  { date: "2023-11-01", productividade: 125, chuva: 98 },
  { date: "2023-11-10", productividade: 200, chuva: 120 },
  { date: "2023-11-20", productividade: 126, chuva: 130 },
  { date: "2023-11-30", productividade: 190, chuva: 130 },
  { date: "2023-12-01", productividade: 135, chuva: 112 },
  { date: "2024-01-01", productividade: 155, chuva: 140 },
  { date: "2024-02-01", productividade: 118, chuva: 85 },
  { date: "2024-03-01", productividade: 162, chuva: 168 },
  { date: "2024-04-01", productividade: 134, chuva: 120 },
  { date: "2024-06-01", productividade: 160, chuva: 87 },
  { date: "2024-07-01", productividade: 189, chuva: 55 },
  { date: "2024-08-01", productividade: 140, chuva: 85 },
  { date: "2024-09-01", productividade: 170, chuva: 155 },
  { date: "2024-10-01", productividade: 120, chuva: 95 },
  { date: "2024-11-01", productividade: 110, chuva: 125 },
  { date: "2024-12-01", productividade: 260, chuva: 155 },

  { date: "2025-01-15", productividade: 142, chuva: 135 },
  { date: "2025-01-28", productividade: 180, chuva: 150 },
  { date: "2025-02-10", productividade: 128, chuva: 90 },
  { date: "2025-02-22", productividade: 165, chuva: 110 },
  { date: "2025-03-05", productividade: 175, chuva: 172 },
  { date: "2025-03-18", productividade: 210, chuva: 160 },
  { date: "2025-04-12", productividade: 130, chuva: 115 },
  { date: "2025-05-01", productividade: 148, chuva: 80 },
  { date: "2025-05-20", productividade: 195, chuva: 65 },
  { date: "2025-06-14", productividade: 152, chuva: 45 },
  { date: "2025-07-08", productividade: 178, chuva: 30 },
  { date: "2025-07-25", productividade: 160, chuva: 50 },
  { date: "2025-08-11", productividade: 135, chuva: 70 },
  { date: "2025-09-03", productividade: 182, chuva: 140 },
  { date: "2025-09-21", productividade: 205, chuva: 160 },
  { date: "2025-10-10", productividade: 115, chuva: 105 },
  { date: "2025-11-05", productividade: 150, chuva: 130 },
  { date: "2025-11-25", productividade: 220, chuva: 145 },
  { date: "2025-12-12", productividade: 245, chuva: 165 }
];

type Range = "30D" | "6M" | "1A";

const ranges: Range[] = ["30D", "6M", "1A"];

const RANGE_TO_DAYS: Record<Range, number> = {
  "30D": 30,
  "6M": 182,
  "1A": 365,
};

function filterByRange(data: typeof series, range: Range) {
  const referenceDate = data.reduce((latest, item) => {
    const current = new Date(item.date);
    return current > latest ? current : latest;
  }, new Date(0));

  const days = RANGE_TO_DAYS[range];
  const cutoff = new Date(referenceDate);
  cutoff.setDate(cutoff.getDate() - days);

  return data.filter((item) => new Date(item.date) >= cutoff);
}

export function ChartSection() {
  const [isLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Range>("1A");

  const filteredData = useMemo(
    () => filterByRange(series, selectedRange),
    [selectedRange]
  );

  return (
    <Card data-slot="chart-section" className="xl:col-span-2">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>Produtividade x Chuva</CardTitle>
          <CardDescription>
            Indicadores de performance ao longo da safra
          </CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-foreground-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option>Milho</option>
          </select>

          <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-raised p-1">
            {ranges.map((range) => (
              <button
                key={range}
                type="button"
                data-active={range === selectedRange ? "" : undefined}
                onClick={() => setSelectedRange(range)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium text-foreground-subtle transition-colors",
                  "hover:text-foreground",
                  "data-active:bg-primary data-active:text-primary-foreground",
                )}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Productivity data={filteredData} isLoading={isLoading} />

        <dl className="mt-4 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-primary" />
            <dt className="text-foreground-subtle">Produtividade (sc/ha)</dt>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-status-blue" />
            <dt className="text-foreground-subtle">Chuva (mm)</dt>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}