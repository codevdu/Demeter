import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WeatherSection() {
  return (
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
  );
}