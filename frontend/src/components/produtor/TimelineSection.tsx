import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TimelineSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

      {/* Timeline da safra */}

      <Card className="bg-[#121214] border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">
            Timeline da Safra
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-black text-xs">
                ✓
              </div>

              <div className="w-px h-12 bg-zinc-700 mt-1" />
            </div>

            <div>
              <p className="font-medium">
                Preparo do Solo
              </p>

              <p className="text-sm text-zinc-500">
                Concluído em 12 de outubro de 2023
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-black text-xs">
                ✓
              </div>

              <div className="w-px h-12 bg-zinc-700 mt-1" />
            </div>

            <div>
              <p className="font-medium">
                Plantio
              </p>

              <p className="text-sm text-zinc-500">
                Concluído em 4 de novembro de 2023
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-5 h-5 rounded-full bg-emerald-500" />

            <div>
              <p className="font-medium">
                Crescimento Vegetativo
              </p>

              <p className="text-sm text-emerald-400">
                Etapa atual - Semana 14
              </p>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Condições climáticas */}

      <Card className="bg-[#121214] border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg">
            Condições Climáticas
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-end gap-3 mb-6">
            <p className="text-5xl font-light">
              32°
            </p>

            <p className="text-zinc-400 mb-1">
              Parcialmente nublado
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 uppercase">
                Vento
              </p>

              <p className="mt-1">
                14 km/h NE
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500 uppercase">
                Umidade
              </p>

              <p className="mt-1">
                42%
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500 uppercase">
                Índice UV
              </p>

              <p className="mt-1">
                Alto (8)
              </p>
            </div>

            <div>
              <p className="text-xs text-zinc-500 uppercase">
                Chance de chuva
              </p>

              <p className="mt-1">
                5%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}