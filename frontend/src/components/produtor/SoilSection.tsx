import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 6;

const composition = [
  { label: "Argila (Argiloso)", value: 45, color: "var(--primary)" },
  { label: "Silte (Siltoso)", value: 35, color: "var(--status-blue)" },
  { label: "Areia (Arenoso)", value: 20, color: "var(--status-orange)" },
];

function sliceLength(value: number) {
  return (value / 100) * CIRCUMFERENCE;
}

export function SoilSection() {
  /* Deslocamento acumulado de cada fatia do anel */

  const slices = composition.map((item, index) => ({
    ...item,
    length: sliceLength(item.value),
    start: composition
      .slice(0, index)
      .reduce((total, previous) => total + sliceLength(previous.value), 0),
  }));

  return (
    <Card data-slot="soil-section">
      <CardHeader>
        <CardTitle>Composição do Solo</CardTitle>

        <CardDescription>Análise do Setor A-24</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {/* Anel */}

        <div className="relative size-40">
          <svg viewBox="0 0 176 176" className="size-full -rotate-90">
            <circle
              cx="88"
              cy="88"
              r={RADIUS}
              fill="none"
              className="stroke-muted"
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

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-primary">88%</span>

            <span className="text-[11px] text-muted-foreground">Saudável</span>
          </div>
        </div>

        {/* Legenda */}

        <dl className="flex w-full flex-col gap-2.5">
          {composition.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-sm"
            >
              <dt className="flex items-center gap-2 text-foreground-subtle">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden
                />
                {item.label}
              </dt>

              <dd className="font-medium text-foreground">{item.value}%</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
