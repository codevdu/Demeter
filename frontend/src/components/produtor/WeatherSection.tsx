import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CloudSun,
  Wind,
  Droplets,
  Sun,
  CloudRain,
} from "lucide-react";

export function WeatherSection() {
  return (
    <Card className="bg-[#121214] border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg">
          Condições Climáticas
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between mb-8">

          <div>
            <p className="text-5xl font-light">
              32°
            </p>

            <p className="text-zinc-400 mt-2">
              Parcialmente nublado
            </p>
          </div>

          <CloudSun
            className="text-yellow-400"
            size={56}
          />

        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Wind className="mt-1 text-cyan-400" size={18} />

            <div>
              <p className="text-xs text-zinc-500 uppercase">
                Vento
              </p>

              <p className="mt-1">
                14 km/h NE
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Droplets className="mt-1 text-blue-400" size={18} />

            <div>
              <p className="text-xs text-zinc-500 uppercase">
                Umidade
              </p>

              <p className="mt-1">
                42%
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sun className="mt-1 text-yellow-400" size={18} />

            <div>
              <p className="text-xs text-zinc-500 uppercase">
                Índice UV
              </p>

              <p className="mt-1">
                Alto (8)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CloudRain className="mt-1 text-blue-400" size={18} />

            <div>
              <p className="text-xs text-zinc-500 uppercase">
                Chance de chuva
              </p>

              <p className="mt-1">
                5%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}