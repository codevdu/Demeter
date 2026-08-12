import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* Produtividade mensal em sc/ha, plotada num viewBox de 800x320 */

const series = [
  { month: "Nov", productivity: 125 },
  { month: "Dez", productivity: 135 },
  { month: "Jan", productivity: 155 },
  { month: "Fev", productivity: 118 },
  { month: "Mar", productivity: 162 },
  { month: "Abr", productivity: 134 },
  { month: "Mai", productivity: 160 },
];

const ranges = ["30D", "6M", "1A"];

const VIEW_HEIGHT = 320;
const BASELINE = 290;
const PLOT_HEIGHT = 260;
const MAX_VALUE = 200;
const BAR_WIDTH = 26;
const COLUMN_WIDTH = 800 / series.length;

const yTicks = [0, 50, 100, 150, 200];

/* Converte um valor do eixo Y em coordenada do viewBox */
function toY(value: number) {
  return BASELINE - (value / MAX_VALUE) * PLOT_HEIGHT;
}

/* Centro horizontal da coluna de cada mês */
function toX(index: number) {
  return COLUMN_WIDTH * (index + 0.5);
}

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
        <div className="flex gap-2">
          {/* Rótulo do eixo Y */}

          <span className="rotate-180 self-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground [writing-mode:vertical-rl]">
            Produtividade (sc/ha)
          </span>

          {/* Marcações do eixo Y */}

          <div className="relative h-64 w-7">
            {yTicks.map((tick) => (
              <span
                key={tick}
                className="absolute right-0 -translate-y-1/2 text-[10px] text-muted-foreground"
                style={{ top: `${(toY(tick) / VIEW_HEIGHT) * 100}%` }}
              >
                {tick}
              </span>
            ))}
          </div>

          {/* Área de plotagem */}

          <div className="relative h-64 flex-1 overflow-hidden rounded-lg border border-border bg-background">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 800 ${VIEW_HEIGHT}`}
              preserveAspectRatio="none"
            >
              {/* Grade */}

              <g
                className="stroke-border"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              >
                {yTicks.map((tick) => (
                  <line
                    key={tick}
                    x1={0}
                    x2={800}
                    y1={toY(tick)}
                    y2={toY(tick)}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {series.map((item, index) => (
                  <line
                    key={item.month}
                    x1={toX(index)}
                    x2={toX(index)}
                    y1={toY(MAX_VALUE)}
                    y2={BASELINE}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>

              {/* Barras de produtividade */}

              {series.map((item, index) => {
                const y = toY(item.productivity);

                return (
                  <g key={item.month}>
                    <rect
                      x={toX(index) - BAR_WIDTH / 2}
                      y={y}
                      width={BAR_WIDTH}
                      height={BASELINE - y}
                      className="fill-primary"
                      fillOpacity={0.25}
                    />

                    <rect
                      x={toX(index) - BAR_WIDTH / 2}
                      y={y}
                      width={BAR_WIDTH}
                      height={5}
                      className="fill-primary"
                    />
                  </g>
                );
              })}

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

            <div className="absolute inset-x-0 bottom-1 flex text-[10px] text-muted-foreground">
              {series.map((item) => (
                <span key={item.month} className="flex-1 text-center">
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Rótulo do eixo X */}

        <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          Safra 2023/24
        </p>

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
