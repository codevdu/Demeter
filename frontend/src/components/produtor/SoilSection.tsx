import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SoilSection() {
  return (
    <Card className="bg-[#121214] border-zinc-800">

      <CardHeader>
        <CardTitle className="text-lg">
          Composição do Solo
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="flex flex-col items-center">

          {/* Donut */}

          <div className="relative w-44 h-44 rounded-full bg-zinc-800 flex items-center justify-center">

            <div className="absolute w-28 h-28 rounded-full bg-[#121214]" />

            <span className="relative text-2xl font-bold">
              82%
            </span>

          </div>

          {/* Legenda */}

          <div className="w-full mt-8 space-y-3">

            <div className="flex justify-between">
              <span className="text-zinc-400">
                Nitrogênio
              </span>

              <span className="text-emerald-400">
                Ideal
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">
                Fósforo
              </span>

              <span className="text-amber-400">
                Médio
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">
                Potássio
              </span>

              <span className="text-red-400">
                Baixo
              </span>
            </div>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}