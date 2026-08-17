// components/gestor/RankingMunicipios.tsx
"use client";

import * as React from "react";
import { Trophy, TrendingDown, Loader2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { useMunicipioProdutividade, TODOS_ESTADOS } from "@/hooks/use-produtivity";
import { CHOROPLETH_COLORS } from "@/types/choropleth";

type Ordenacao = "melhores" | "piores";

interface RankingMunicipiosProps {
  uf?: string;
  limit?: number;
  className?: string;
}

function getColorForValue(value: number, breaks: number[]): string {
  const index = breaks.findIndex((limite) => value <= limite);
  return CHOROPLETH_COLORS[index === -1 ? CHOROPLETH_COLORS.length - 1 : index];
}

// Chave vem no formato "UF-NomeDoMunicipio" (ver getFeatureKey no hook)
function parseKey(key: string): { uf: string; nome: string } {
  const [uf, ...resto] = key.split("-");
  return { uf, nome: resto.join("-") || uf };
}

export function RankingMunicipios({
  uf = TODOS_ESTADOS,
  limit = 8,
  className,
}: RankingMunicipiosProps) {
  const [ordenacao, setOrdenacao] = React.useState<Ordenacao>("melhores");
  const { dataByMunicipio, breaks, loading, error } = useMunicipioProdutividade(uf);

  const ranking = React.useMemo(() => {
    const entradas = Object.entries(dataByMunicipio);
    entradas.sort(([, a], [, b]) => (ordenacao === "melhores" ? b - a : a - b));
    return entradas.slice(0, limit);
  }, [dataByMunicipio, ordenacao, limit]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-base font-semibold">
          Ranking de Municípios
        </CardTitle>

        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-0.5">
          <button
            onClick={() => setOrdenacao("melhores")}
            className={cn(
              "flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              ordenacao === "melhores"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Trophy className="size-3" /> Melhores
          </button>
          <button
            onClick={() => setOrdenacao("piores")}
            className={cn(
              "flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              ordenacao === "piores"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <TrendingDown className="size-3" /> Piores
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-1.5">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {error && (
          <p className="py-8 text-center text-sm text-destructive">{error}</p>
        )}

        {!loading &&
          !error &&
          ranking.map(([key, value], index) => {
            const { uf: municipioUf, nome } = parseKey(key);
            const cor = getColorForValue(value, breaks);

            return (
              <div
                key={key}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11px] font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {nome}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{municipioUf}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {value.toFixed(1)} sc/ha
                  </span>
                  <span
                    className="size-2.5 rounded-sm border border-black/10"
                    style={{ backgroundColor: cor }}
                    aria-hidden
                  />
                </div>
              </div>
            );
          })}

        {!loading && !error && ranking.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum município encontrado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}