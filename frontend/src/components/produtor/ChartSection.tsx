import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const BASELINE = 290;
const BAR_WIDTH = 26;

export function ChartSection() {
  return (
    <Card className="xl:col-span-2 bg-[#121214] border-zinc-800">
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          <div>
            <CardTitle className="text-2xl font-normal">
              Produtividade x Chuva
            </CardTitle>

            <p className="mt-1 max-w-[16rem] text-sm leading-relaxed text-zinc-500">
              Indicadores de performance ao longo da safra 2023/24
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">

            <select className="rounded-md border border-zinc-800 bg-[#18181b] px-3 py-1.5 text-sm text-zinc-300">
              <option>Milho</option>
            </select>

            <div className="flex items-center gap-1 rounded-md border border-zinc-800 bg-[#18181b] p-1">

              <button className="rounded px-2.5 py-1 text-xs font-semibold text-black bg-emerald-400">
                30D
              </button>

              <button className="rounded px-2.5 py-1 text-xs font-semibold text-zinc-400 hover:text-zinc-200">
                6M
              </button>

              <button className="rounded px-2.5 py-1 text-xs font-semibold text-zinc-400 hover:text-zinc-200">
                1Y
              </button>

            </div>

          </div>

        </div>
      </CardHeader>

      <CardContent>

        {/* Área de plotagem */}

        <div className="relative h-[300px] overflow-hidden rounded-lg border border-indigo-400/15 bg-[#0d0d0f]">

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
                  fill="#2f6f56"
                />

                <rect
                  x={bar.x - BAR_WIDTH / 2}
                  y={BASELINE - bar.height}
                  width={BAR_WIDTH}
                  height={5}
                  fill="#34d399"
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
              stroke="#9db1e8"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />

          </svg>

          {/* Meses do eixo X */}

          <div className="absolute bottom-2 left-[1.875%] right-[1.875%] flex text-[11px] text-zinc-500">
            {months.map((month) => (
              <span key={month} className="flex-1 text-center">
                {month}
              </span>
            ))}
          </div>

        </div>

        {/* Legenda */}

        <div className="mt-5 flex gap-6 text-xs">

          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-emerald-400" />

            <span className="text-zinc-400">
              Produtividade (sc/ha)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2.5 rounded-full bg-[#9db1e8]" />

            <span className="text-zinc-400">
              Chuva (mm)
            </span>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}
