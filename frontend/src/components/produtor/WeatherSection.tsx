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
  Cloud,
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

        <div className="grid grid-cols-2 gap-x-8 gap-y-8 mt-8">
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

        <div className="mt-8 border-t border-zinc-800 pt-5">
          <div className="grid grid-cols-5 text-center text-xs text-zinc-400">

            <div>
              <p>SEG</p>
              <Sun className="mx-auto mt-2 text-yellow-400" size={18} />
              <p className="mt-1">34°</p>
            </div>

            <div>
              <p>TER</p>
              <Sun className="mx-auto mt-2 text-yellow-400" size={18} />
              <p className="mt-1">35°</p>
            </div>

            <div>
              <p>QUA</p>
              <Cloud className="mx-auto mt-2 text-blue-400" size={18} />
              <p className="mt-1">31°</p>
            </div>

            <div>
              <p>QUI</p>
              <Sun className="mx-auto mt-2 text-yellow-400" size={18} />
              <p className="mt-1">28°</p>
            </div>

            <div>
              <p>SEX</p>
              <CloudRain className="mx-auto mt-2 text-blue-400" size={18} />
              <p className="mt-1">27°</p>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}