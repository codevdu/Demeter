import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ChartSection() {
  return (
    <Card className="xl:col-span-2 bg-[#121214] border-zinc-800">
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          <div>
            <CardTitle className="text-xl">
              Produtividade x Chuva
            </CardTitle>

            <p className="mt-1 text-sm text-zinc-400">
              Performance durante a safra 2023/24
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            <select className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm">
              <option>Milho</option>
            </select>

            <button className="rounded-md bg-emerald-500 px-3 py-2 text-sm text-black">
              30D
            </button>

            <button className="rounded-md bg-zinc-900 px-3 py-2 text-sm">
              6M
            </button>

            <button className="rounded-md bg-zinc-900 px-3 py-2 text-sm">
              1Y
            </button>

          </div>

        </div>
      </CardHeader>

      <CardContent>
        <div className="relative h-[350px] rounded-lg bg-[#0f0f10] overflow-hidden pt-4">

            {/* Linhas horizontais + valores do eixo Y */}

            <div className="absolute left-0 right-6 top-6 bottom-10 flex flex-col justify-between">

              <div className="flex items-center gap-2">
                <span className="w-8 text-xs text-zinc-500">
                  200
                </span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 text-xs text-zinc-500">
                  150
                </span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 text-xs text-zinc-500">
                  100
                </span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 text-xs text-zinc-500">
                  50
                </span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 text-xs text-zinc-500">
                  0
                </span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

            </div>

            {/* eixo Y */}

            <div className="absolute left-10 top-6 bottom-10 w-px bg-zinc-700"></div>

            {/* eixo X */}

            <div className="absolute left-10 right-6 bottom-10 h-px bg-zinc-700"></div>

            {/* Meses do eixo X */}

            <div className="absolute left-12 right-6 bottom-4 flex justify-between text-xs text-zinc-500">
              <span>Jan</span>
              <span>Fev</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>Mai</span>
              <span>Jun</span>
            </div>

            {/* Linha do gráfico */}

            <svg
              className="absolute left-4 right-0 top-4 bottom-10 w-full"
              viewBox="0 0 800 350"
              preserveAspectRatio="none"
            >

              {/* Barras de produtividade */}

              <rect x="80"  y="190" width="35" height="120" rx="3" fill="#1f4d3b" />
              <rect x="180" y="150" width="35" height="160" rx="3" fill="#1f4d3b" />
              <rect x="290" y="125" width="35" height="185" rx="3" fill="#1f4d3b" />
              <rect x="400" y="205" width="35" height="105" rx="3" fill="#1f4d3b" />
              <rect x="510" y="105" width="35" height="205" rx="3" fill="#1f4d3b" />
              <rect x="620" y="170" width="35" height="140" rx="3" fill="#1f4d3b" />
              <rect x="730" y="120" width="35" height="190" rx="3" fill="#1f4d3b" />

              <polyline
                fill="none"
                stroke="#8da9e8"
                strokeWidth="3"
                points="
                  100,270
                  200,230
                  310,245
                  420,170
                  530,190
                  640,120
                  750,90
                "
              />

              <circle cx="100" cy="270" r="4" fill="#8da9e8" />
              <circle cx="200" cy="230" r="4" fill="#8da9e8" />
              <circle cx="310" cy="245" r="4" fill="#8da9e8" />
              <circle cx="420" cy="170" r="4" fill="#8da9e8" />
              <circle cx="530" cy="190" r="4" fill="#8da9e8" />
              <circle cx="640" cy="120" r="4" fill="#8da9e8" />
              <circle cx="750" cy="90" r="4" fill="#8da9e8" />
            </svg>

            {/* Legenda */}

            <div className="absolute left-8 bottom-12 flex gap-6 text-xs">

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />

                <span className="text-zinc-400">
                  Produtividade (sc/ha)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8da9e8]" />

                <span className="text-zinc-400">
                  Chuva (mm)
                </span>
              </div>

            </div>
        </div>
      </CardContent>
    </Card>
  );
}