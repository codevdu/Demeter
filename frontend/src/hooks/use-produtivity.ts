// hooks/useMunicipioProdutividade.ts
"use client";

import * as React from "react";
import type { GeoJsonObject, Feature, FeatureCollection, Geometry } from "geojson";

import { getGeoJsonByUf } from "@/services/geojson-service";
import { UF_CODIGO_IBGE } from "@/constants/geojson.urls";
import { getQuantileBreaks, mockValueFromLabel } from "@/types/choropleth";

export const TODOS_ESTADOS = "TODOS";
const UFS = Object.keys(UF_CODIGO_IBGE);

const MOCK_MIN = 35;
const MOCK_MAX = 95;

// Cache em escopo de módulo: compartilhado entre todas as instâncias do
// hook (mapa + ranking, por exemplo), evita refazer fetch do mesmo estado
const geoJsonCache: Record<string, GeoJsonObject> = {};

function getFeatureName(feature: Feature<Geometry>): string {
  return (
    feature.properties?.name ??
    feature.properties?.NOME ??
    feature.properties?.NM_MUNICIP ??
    "Município"
  );
}

export function getFeatureKey(feature: Feature<Geometry>): string {
  const uf = feature.properties?.uf ?? "";
  return `${uf}-${getFeatureName(feature)}`;
}

function mergeGeoJsonByUf(
  collections: Array<{ uf: string; data: GeoJsonObject | null }>
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

interface UseMunicipioProdutividadeResult {
  geoData: GeoJsonObject | null;
  dataByMunicipio: Record<string, number>;
  breaks: number[];
  loading: boolean;
  error: string | null;
}

export function useMunicipioProdutividade(
  uf: string
): UseMunicipioProdutividadeResult {
  const [geoData, setGeoData] = React.useState<GeoJsonObject | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelado = false;

    async function carregarGeoJson() {
      setLoading(true);
      setError(null);

      try {
        if (uf === TODOS_ESTADOS) {
          const resultados = await Promise.all(
            UFS.map(async (sigla) => {
              if (geoJsonCache[sigla]) {
                return { uf: sigla, data: geoJsonCache[sigla] };
              }
              const data = (await getGeoJsonByUf(
                sigla
              )) as unknown as GeoJsonObject | null;
              if (data) geoJsonCache[sigla] = data;
              return { uf: sigla, data };
            })
          );

          if (!cancelado) {
            setGeoData(mergeGeoJsonByUf(resultados));
          }
        } else {
          const data =
            geoJsonCache[uf] ??
            ((await getGeoJsonByUf(uf)) as unknown as GeoJsonObject | null);
          if (data) geoJsonCache[uf] = data;

          if (!cancelado) {
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
    const featureCollection = geoData as FeatureCollection;

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

  return { geoData, dataByMunicipio, breaks, loading, error };
}