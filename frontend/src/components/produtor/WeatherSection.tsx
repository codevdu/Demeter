import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sun, CloudRain, Cloud, CloudSun } from "lucide-react";

const metrics = [
  { label: "Vento", value: "14 km/h NE" },
  { label: "Umidade", value: "42%" },
  { label: "Índice UV", value: "Alto (8)" },
  { label: "Chance de chuva", value: "5%" },
];

const forecast = [
  { day: "SEG", Icon: Sun, color: "text-status-orange", temp: "34°" },
  { day: "TER", Icon: Sun, color: "text-status-orange", temp: "35°" },
  { day: "QUA", Icon: Cloud, color: "text-muted-foreground", temp: "31°" },
  { day: "QUI", Icon: CloudSun, color: "text-status-orange", temp: "28°" },
  { day: "SEX", Icon: CloudRain, color: "text-status-blue", temp: "27°" },
];

export function WeatherSection() {
  return (
    <Card data-slot="weather-section">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <CardTitle>Pulso Meteorológico</CardTitle>

        <span className="rounded-lg border border-status-orange/30 bg-status-orange/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-status-orange">
          Alerta: umidade baixa
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Temperatura atual */}

          <div className="shrink-0">
            <p className="text-4xl font-semibold leading-none text-foreground">
              32°
            </p>

            <p className="mt-2 text-sm text-foreground-subtle">
              Parcialmente nublado
            </p>
          </div>

          {/* Indicadores */}

          <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {metric.label}
                </dt>

                <dd className="mt-1 text-sm font-medium text-foreground">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Previsão da semana */}

        <div className="grid grid-cols-5 border-t border-border pt-4 text-center">
          {forecast.map(({ day, Icon, color, temp }) => (
            <div key={day}>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {day}
              </p>

              <Icon className={`mx-auto mt-2 size-4 ${color}`} />

              <p className="mt-2 text-xs text-foreground-subtle">{temp}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
