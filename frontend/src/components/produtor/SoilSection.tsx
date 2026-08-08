import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 6;

const composition = [
  { label: "Argila (Argiloso)", value: 45, color: "#10b981" },
  { label: "Silte (Siltoso)", value: 35, color: "#cbd5e1" },
  { label: "Areia (Arenoso)", value: 20, color: "#f59e0b" },
];

export function SoilSection() {

  /* Deslocamento acumulado de cada fatia do anel */

  let offset = 0;

  const slices = composition.map((item) => {
    const length = (item.value / 100) * CIRCUMFERENCE;
    const slice = { ...item, length, start: offset };

    offset += length;

    return slice;
  });

  return (
    <Card className="bg-[#121214] border-zinc-800 h-full">

      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-widest text-zinc-200">
          Composição do Solo
        </CardTitle>

        <p className="text-xs text-zinc-500">
          Análise do Setor A-24
        </p>
      </CardHeader>

      <CardContent>

        <div className="flex flex-col items-center">

          {/* Anel */}

          <div className="relative mt-4 size-44">

            <svg viewBox="0 0 176 176" className="size-full -rotate-90">

              <circle
                cx="88"
                cy="88"
                r={RADIUS}
                fill="none"
                stroke="#27272a"
                strokeWidth="12"
              />

              {slices.map((slice) => (
                <circle
                  key={slice.label}
                  cx="88"
                  cy="88"
                  r={RADIUS}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth="12"
                  strokeDasharray={`${slice.length - GAP} ${CIRCUMFERENCE - slice.length + GAP}`}
                  strokeDashoffset={-slice.start}
                />
              ))}

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-semibold text-zinc-100">
                88%
              </span>

              <span className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
                Saudável
              </span>
            </div>

          </div>

          {/* Legenda */}

          <div className="mt-10 w-full space-y-4 text-sm">

            {composition.map((item) => (
              <div key={item.label} className="flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="text-zinc-400">
                    {item.label}
                  </span>
                </div>

                <span className="text-zinc-400">
                  {item.value}%
                </span>

              </div>
            ))}

          </div>

        </div>

      </CardContent>

    </Card>
  );
}
