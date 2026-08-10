import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sun,
  CloudRain,
  Cloud,
  CloudSun,
} from "lucide-react";

const metrics = [
  { label: "Vento", value: "14 km/h NE" },
  { label: "Umidade", value: "42%" },
  { label: "Índice UV", value: "Alto (8)" },
  { label: "Chance de chuva", value: "5%" },
];

const forecast = [
  { day: "SEG", Icon: Sun, color: "text-yellow-400", temp: "34°" },
  { day: "TER", Icon: Sun, color: "text-yellow-400", temp: "35°" },
  { day: "QUA", Icon: Cloud, color: "text-zinc-400", temp: "31°" },
  { day: "QUI", Icon: CloudSun, color: "text-amber-400", temp: "28°" },
  { day: "SEX", Icon: CloudRain, color: "text-blue-400", temp: "27°" },
];

export function WeatherSection() {
  return (
    <Card className="bg-[#121214] border-zinc-800 h-full">

      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg font-normal text-zinc-200">
            Pulso Meteorológico
          </CardTitle>

          <span className="rounded-md bg-amber-500/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
            Alerta: umidade baixa
          </span>
        </div>
      </CardHeader>

      <CardContent>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">

          {/* Temperatura atual */}

          <div className="shrink-0">
            <p className="text-6xl font-light leading-none text-zinc-100">
              32°
            </p>

            <p className="mt-3 text-sm text-zinc-400">
              Parcialmente nublado
            </p>
          </div>

          {/* Indicadores */}

          <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-6">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                  {metric.label}
                </p>

                <p className="mt-1.5 text-sm text-zinc-200">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Previsão da semana */}

        <div className="mt-8 grid grid-cols-5 border-t border-zinc-800 pt-5 text-center">
          {forecast.map(({ day, Icon, color, temp }) => (
            <div key={day}>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                {day}
              </p>

              <Icon className={`mx-auto mt-2 ${color}`} size={18} />

              <p className="mt-2 text-xs text-zinc-300">
                {temp}
              </p>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
