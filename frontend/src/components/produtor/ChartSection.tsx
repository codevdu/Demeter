import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import Productivity from "../productivity-rain";

function gerarSerieDiaria(inicio: string, fim: string) {
  const start = new Date(inicio);
  const end = new Date(fim);
  const dias: { date: string; produtividade: number; chuva: number }[] = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dias.push({
      date: d.toISOString().split("T")[0],
      produtividade: 100 + Math.round(Math.random() * 120),
      chuva: Math.round(Math.random() * 180),
    });
  }

  return dias;
}

const series = gerarSerieDiaria("2022-01-01", "2024-12-31");

type Range = "7D" | "1M" | "3M" | "custom";

const ranges: Exclude<Range, "custom">[] = ["7D", "1M", "3M"];

const RANGE_TO_DAYS: Record<Exclude<Range, "custom">, number> = {
  "7D": 7,
  "1M": 30,
  "3M": 91,
};

const MAX_CUSTOM_MONTHS = 3;

const MONTH_LABELS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

interface CustomRange {
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
}

function filterByFixedRange(data: typeof series, range: Exclude<Range, "custom">) {
  const referenceDate = data.reduce((latest, item) => {
    const current = new Date(item.date);
    return current > latest ? current : latest;
  }, new Date(0));

  const days = RANGE_TO_DAYS[range];
  const cutoff = new Date(referenceDate);
  cutoff.setDate(cutoff.getDate() - days);

  return data.filter((item) => new Date(item.date) >= cutoff);
}

function filterByCustomRange(data: typeof series, custom: CustomRange) {
  const start = new Date(custom.startYear, custom.startMonth, 1);
  const end = new Date(custom.endYear, custom.endMonth + 1, 0, 23, 59, 59);

  return data.filter((item) => {
    const d = new Date(item.date);
    return d >= start && d <= end;
  });
}

function monthsBetween(custom: CustomRange) {
  return (
    (custom.endYear - custom.startYear) * 12 +
    (custom.endMonth - custom.startMonth)
  );
}

function getAvailableYears(data: typeof series) {
  const years = new Set(data.map((item) => new Date(item.date).getFullYear()));
  return Array.from(years).sort((a, b) => a - b);
}

export function ChartSection() {
  const [isLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Range>("1M");
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customError, setCustomError] = useState<string | null>(null);

  const availableYears = useMemo(() => getAvailableYears(series), []);

  const [draft, setDraft] = useState<CustomRange>(() => {
    const lastYear = availableYears[availableYears.length - 1] ?? new Date().getFullYear();
    return { startYear: lastYear, startMonth: 0, endYear: lastYear, endMonth: 2 };
  });

  const [appliedCustom, setAppliedCustom] = useState<CustomRange | null>(null);

  const filteredData = useMemo(() => {
    if (selectedRange === "custom" && appliedCustom) {
      return filterByCustomRange(series, appliedCustom);
    }
    if (selectedRange !== "custom") {
      return filterByFixedRange(series, selectedRange);
    }
    return [];
  }, [selectedRange, appliedCustom]);

  function handleApplyCustom() {
    const diff = monthsBetween(draft);

    if (diff < 0) {
      setCustomError("A data final não pode vir antes da inicial.");
      return;
    }

    if (diff > MAX_CUSTOM_MONTHS - 1) {
      setCustomError(`O intervalo não pode passar de ${MAX_CUSTOM_MONTHS} meses.`);
      return;
    }

    setCustomError(null);
    setAppliedCustom(draft);
    setSelectedRange("custom");
    setShowCustomPicker(false);
  }

  const customLabel = appliedCustom
    ? `${MONTH_LABELS[appliedCustom.startMonth]}/${appliedCustom.startYear} – ${MONTH_LABELS[appliedCustom.endMonth]}/${appliedCustom.endYear}`
    : "Personalizado";

  return (
    <Card data-slot="chart-section" className="xl:col-span-2">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>Produtividade x Chuva</CardTitle>
          <CardDescription>
            Indicadores de performance ao longo da safra
          </CardDescription>
        </div>

        <div className="relative flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-raised p-1">
            {ranges.map((range) => (
              <button
                key={range}
                type="button"
                data-active={selectedRange === range ? "" : undefined}
                onClick={() => {
                  setSelectedRange(range);
                  setShowCustomPicker(false);
                }}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium text-foreground-subtle transition-colors",
                  "hover:text-foreground",
                  "data-active:bg-primary data-active:text-primary-foreground",
                )}
              >
                {range}
              </button>
            ))}

            <button
              type="button"
              data-active={selectedRange === "custom" ? "" : undefined}
              onClick={() => setShowCustomPicker((prev) => !prev)}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium text-foreground-subtle transition-colors",
                "hover:text-foreground",
                "data-active:bg-primary data-active:text-primary-foreground",
              )}
            >
              {customLabel}
            </button>
          </div>

          {showCustomPicker && (
            <div className="absolute right-0 top-full z-10 mt-2 w-72 rounded-lg border border-border bg-surface p-3 shadow-lg">
              <p className="mb-2 text-xs font-semibold text-foreground">
                Escolha um período (máx. {MAX_CUSTOM_MONTHS} meses)
              </p>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-muted-foreground">Mês inicial</label>
                  <select
                    value={draft.startMonth}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, startMonth: Number(e.target.value) }))
                    }
                    className="mt-1 w-full rounded-md border border-border bg-surface-raised px-2 py-1 text-xs"
                  >
                    {MONTH_LABELS.map((label, index) => (
                      <option key={label} value={index}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-muted-foreground">Ano inicial</label>
                  <select
                    value={draft.startYear}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, startYear: Number(e.target.value) }))
                    }
                    className="mt-1 w-full rounded-md border border-border bg-surface-raised px-2 py-1 text-xs"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-muted-foreground">Mês final</label>
                  <select
                    value={draft.endMonth}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, endMonth: Number(e.target.value) }))
                    }
                    className="mt-1 w-full rounded-md border border-border bg-surface-raised px-2 py-1 text-xs"
                  >
                    {MONTH_LABELS.map((label, index) => (
                      <option key={label} value={index}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-muted-foreground">Ano final</label>
                  <select
                    value={draft.endYear}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, endYear: Number(e.target.value) }))
                    }
                    className="mt-1 w-full rounded-md border border-border bg-surface-raised px-2 py-1 text-xs"
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {customError && (
                <p className="mt-2 text-xs text-destructive">{customError}</p>
              )}

              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomPicker(false)}
                  className="rounded-md px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleApplyCustom}
                  className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Aplicar
                </button>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <Productivity data={filteredData} isLoading={isLoading} />

        {selectedRange === "custom" && filteredData.length === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Nenhum dado encontrado no período selecionado.
          </p>
        )}

        <dl className="mt-4 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-primary" />
            <dt className="text-foreground-subtle">Produtividade (sc/ha)</dt>
          </div>

          <div className="flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-status-blue" />
            <dt className="text-foreground-subtle">Chuva (mm)</dt>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}