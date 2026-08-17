// components/gestor/Map.tsx
"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import { UF_CODIGO_IBGE } from "@/constants/geojson.urls";
import { CHOROPLETH_COLORS, getLegendLabels } from "@/types/choropleth";
import { useMunicipioProdutividade, TODOS_ESTADOS } from "@/hooks/use-produtivity";

const MapInner = dynamic(() => import("./Mapinner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  ),
});

const UFS = Object.keys(UF_CODIGO_IBGE);

export { TODOS_ESTADOS };

export function GeoJsonMapTest() {
  const [uf, setUf] = React.useState<string>(TODOS_ESTADOS);
  const { geoData, dataByMunicipio, breaks, loading, error } =
    useMunicipioProdutividade(uf);

  const legendLabels = React.useMemo(
    () => getLegendLabels(breaks, " sc/ha"),
    [breaks]
  );

  return (
    <Card>
      <CardHeader className="flex flex-row z-20 items-center justify-between gap-4">
        <CardTitle className="text-base font-semibold">
          Produtividade por estado
        </CardTitle>

        <Select
          value={uf}
          onValueChange={(value) => setUf(value ?? TODOS_ESTADOS)}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Selecione a UF" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TODOS_ESTADOS}>Todos os estados</SelectItem>
            {UFS.map((sigla) => (
              <SelectItem key={sigla} value={sigla}>
                {sigla}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="relative h-125 w-full overflow-hidden rounded-lg border border-border">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/70">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {error && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/90 text-sm text-destructive">
              {error}
            </div>
          )}

          <MapInner
            uf={uf}
            geoData={geoData}
            dataByMunicipio={dataByMunicipio}
            breaks={breaks}
          />
        </div>

        {legendLabels.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Produtividade:</span>
            {legendLabels.map((label, index) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  className="size-3 shrink-0 rounded-sm border border-black/10"
                  style={{ backgroundColor: CHOROPLETH_COLORS[index] }}
                  aria-hidden
                />
                {label}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}