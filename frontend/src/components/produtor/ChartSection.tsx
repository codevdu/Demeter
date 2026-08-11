import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* Barras de produtividade: centro (x) e altura no viewBox de 800x320 */

const bars = [
  { x: 70, height: 155 },
  { x: 180, height: 170 },
  { x: 290, height: 192 },
  { x: 400, height: 148 },
  { x: 510, height: 205 },
  { x: 620, height: 168 },
  { x: 730, height: 200 },
];

const months = ["Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai"];

const ranges = ["30D", "6M", "1A"];

const BASELINE = 290;
const BAR_WIDTH = 26;

export function ChartSection() {
  return (
    <Card data-slot="chart-section" className="xl:col-span-2">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>Produtividade x Chuva</CardTitle>

          <CardDescription>
            Indicadores de performance ao longo da safra 2023/24
          </CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-foreground-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option>Milho</option>
          </select>

          <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-raised p-1">
            {ranges.map((range, index) => (
              <button
                key={range}
                type="button"
                data-active={index === 0 ? "" : undefined}
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
        {/* Área de plotagem */}

        <div className="relative h-64 overflow-hidden rounded-lg border border-border bg-background">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 800 320"
            preserveAspectRatio="none"
          >
            {/* Barras de produtividade */}

            {bars.map((bar) => (
              <g key={bar.x}>
                <rect
                  x={bar.x - BAR_WIDTH / 2}
                  y={BASELINE - bar.height}
                  width={BAR_WIDTH}
                  height={bar.height}
                  className="fill-primary"
                  fillOpacity={0.25}
                />

                <rect
                  x={bar.x - BAR_WIDTH / 2}
                  y={BASELINE - bar.height}
                  width={BAR_WIDTH}
                  height={5}
                  className="fill-primary"
                />
              </g>
            ))}

            {/* Curva de chuva */}

            <path
              d="
                M 20 255
                C 90 250, 130 216, 180 212
                C 230 209, 250 222, 290 220
                C 330 218, 360 212, 400 205
                C 450 196, 470 150, 510 140
                C 555 129, 580 85, 620 78
                C 660 71, 690 88, 730 108
                C 755 121, 775 146, 795 170
              "
              fill="none"
              className="stroke-status-blue"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Meses do eixo X */}

          <div className="absolute bottom-2 left-[1.875%] right-[1.875%] flex text-[11px] text-muted-foreground">
            {months.map((month) => (
              <span key={month} className="flex-1 text-center">
                {month}
              </span>
            ))}
          </div>
        </div>

        {/* Legenda */}

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
