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
        <div className="relative h-[350px] rounded-lg bg-[#0f0f10] overflow-hidden">

            {/* linhas horizontais */}

            <div className="absolute inset-0 flex flex-col justify-between p-6">

                <div className="border-b border-zinc-800"></div>
                <div className="border-b border-zinc-800"></div>
                <div className="border-b border-zinc-800"></div>
                <div className="border-b border-zinc-800"></div>
                <div className="border-b border-zinc-800"></div>

            </div>

            {/* eixo Y */}

            <div className="absolute left-10 top-6 bottom-10 w-px bg-zinc-700"></div>

            {/* eixo X */}

            <div className="absolute left-10 right-6 bottom-10 h-px bg-zinc-700"></div>

        </div>
      </CardContent>
    </Card>
  );
}