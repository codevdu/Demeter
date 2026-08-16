"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { GeoJsonObject, Feature, FeatureCollection, Geometry } from "geojson";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import { getGeoJsonByUf } from "@/services/geojson-service";
import { UF_CODIGO_IBGE } from "@/constants/geojson.urls";
import {
  CHOROPLETH_COLORS,
  getQuantileBreaks,
  getLegendLabels,
  mockValueFromLabel,
} from "@/types/choropleth";

const MapInner = dynamic(() => import("./Mapinner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  ),
});

const UFS = Object.keys(UF_CODIGO_IBGE);

// Valor sentinela que representa "todos os estados" (opção padrão)
export const TODOS_ESTADOS = "TODOS";

// Faixa de produtividade usada para gerar o mock (sc/ha)
const MOCK_MIN = 35;
const MOCK_MAX = 95;

function getFeatureName(feature: Feature<Geometry>): string {
  return (
    feature.properties?.name ??
    feature.properties?.NOME ??
    feature.properties?.NM_MUNICIP ??
    "Município"
  );
}

// Chave única por município: UF + nome, pra não colidir municípios
// de mesmo nome em estados diferentes quando "Todos" está selecionado
function getFeatureKey(feature: Feature<Geometry>): string {
  const uf = feature.properties?.uf ?? "";
  return `${uf}-${getFeatureName(feature)}`;
}

// Junta várias FeatureCollections (uma por UF) em uma só,
// marcando cada feature com a UF de origem
function mergeGeoJsonByUf(
  collections: Array<{ uf: string; data: GeoJsonObject }>
): FeatureCollection {
  const features = collections.flatMap(({ uf, data }) => {
    if (!data || !("features" in data)) return [];

    const fc = data as FeatureCollection;
    return fc.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        uf,
      },
    }));
  });

  return { type: "FeatureCollection", features };
}

export function GeoJsonMapTest() {
  const [uf, setUf] = React.useState<string>(TODOS_ESTADOS);
  const [geoData, setGeoData] = React.useState<GeoJsonObject | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Cache simples em memória, evita refazer o fetch de todos os
  // estados toda vez que o usuário volta pra opção "Todos"
  const cacheRef = React.useRef<Record<string, GeoJsonObject>>({});

  React.useEffect(() => {
    let cancelado = false;

    async function carregarGeoJson() {
      setLoading(true);
      setError(null);

      try {
        if (uf === TODOS_ESTADOS) {
          const resultados = await Promise.all(
            UFS.map(async (sigla) => {
              if (cacheRef.current[sigla]) {
                return { uf: sigla, data: cacheRef.current[sigla] };
              }
              const data = (await getGeoJsonByUf(
                sigla
              )) as unknown as GeoJsonObject;
              cacheRef.current[sigla] = data;
              return { uf: sigla, data };
            })
          );

          if (!cancelado) {
            setGeoData(mergeGeoJsonByUf(resultados));
          }
        } else {
          const data =
            cacheRef.current[uf] ??
            ((await getGeoJsonByUf(uf)) as unknown as GeoJsonObject);
          cacheRef.current[uf] = data;

          if (!cancelado) {
            // marca a UF também no caso de estado único, pra manter
            // a mesma chave (uf-nome) usada no restante do componente
            setGeoData(mergeGeoJsonByUf([{ uf, data }]));
          }
        }
      } catch (err) {
        console.error("Erro ao carregar GeoJSON:", err);
        if (!cancelado) {
          setError("Não foi possível carregar o mapa.");
          setGeoData(null);
        }
      } finally {
        if (!cancelado) {
          setLoading(false);
        }
      }
    }

    carregarGeoJson();

    return () => {
      cancelado = true;
    };
  }, [uf]);

  const dataByMunicipio = React.useMemo(() => {
    if (!geoData || !("features" in geoData)) return {};

    const result: Record<string, number> = {};
    const featureCollection = geoData as GeoJSON.FeatureCollection;

    for (const feature of featureCollection.features) {
      const key = getFeatureKey(feature as Feature<Geometry>);
      result[key] = mockValueFromLabel(key, MOCK_MIN, MOCK_MAX);
    }

    return result;
  }, [geoData]);

  const breaks = React.useMemo(
    () => getQuantileBreaks(Object.values(dataByMunicipio), 5),
    [dataByMunicipio]
  );

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