"use client";

import * as React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import type { GeoJsonObject, Feature, Geometry } from "geojson";
import type { Layer, PathOptions, Map as LeafletMap } from "leaflet";

import { getColorByValue } from "@/types/choropleth";
import { TODOS_ESTADOS } from "./Map";

const DEFAULT_CENTER: [number, number] = [-14.235, -51.9253];
const DEFAULT_ZOOM = 4;

interface MapInnerProps {
  uf: string;
  geoData: GeoJsonObject | null;
  dataByMunicipio: Record<string, number>;
  breaks: number[];
}

function getFeatureName(feature: Feature<Geometry>): string {
  return (
    feature.properties?.name ??
    feature.properties?.NOME ??
    feature.properties?.NM_MUNICIP ??
    "Município"
  );
}

function getFeatureKey(feature: Feature<Geometry>): string {
  const uf = feature.properties?.uf ?? "";
  return `${uf}-${getFeatureName(feature)}`;
}

export default function MapInner({
  uf,
  geoData,
  dataByMunicipio,
  breaks,
}: MapInnerProps) {
  const mapRef = React.useRef<LeafletMap | null>(null);
  const geoJsonRef = React.useRef<L.GeoJSON | null>(null);
  const [municipioSelecionado, setMunicipioSelecionado] = React.useState<string | null>(null);

  const fitToBounds = React.useCallback((data: GeoJsonObject) => {
    if (!mapRef.current) return;

    const bounds = L.geoJSON(data).getBounds();
    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds, { padding: [16, 16] });
    } else {
      mapRef.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    }
  }, []);

  // Sempre que o GeoJSON terminar de carregar (troca de UF ou
  // seleção de "Todos os estados"), dá zoom automático nos limites
  React.useEffect(() => {
    if (!geoData) return;

    fitToBounds(geoData);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMunicipioSelecionado(null);
  }, [geoData, fitToBounds]);

  const styleFeature = React.useCallback(
    (feature?: Feature<Geometry>): PathOptions => {
      const key = feature ? getFeatureKey(feature) : "";
      const valor = dataByMunicipio[key];
      const selecionado = key === municipioSelecionado;

      return {
        color: "#166534",
        weight: selecionado ? 3 : 1,
        fillColor: getColorByValue(valor, breaks),
        fillOpacity: selecionado ? 0.9 : 0.75,
      };
    },
    [dataByMunicipio, breaks, municipioSelecionado]
  );

  const handleEachFeature = React.useCallback(
    (feature: Feature<Geometry>, layer: Layer) => {
      const key = getFeatureKey(feature);
      const nome = getFeatureName(feature);
      const valor = dataByMunicipio[key];

      const conteudo =
        valor !== undefined
          ? `<strong>${nome}</strong><br/>Produtividade: ${valor.toFixed(1)} sc/ha`
          : `<strong>${nome}</strong><br/>Sem dado disponível`;

      layer.bindTooltip(conteudo, { sticky: true });

      layer.on({
        mouseover: (e) => {
          const target = e.target;
          if (key !== municipioSelecionado) {
            target.setStyle({ weight: 2.5, fillOpacity: 0.9 });
            target.bringToFront();
          }
        },
        mouseout: (e) => {
          const target = e.target;
          target.setStyle(styleFeature(feature));
        },
        click: (e) => {
          const target = e.target as L.Layer & { getBounds: () => L.LatLngBounds };
          setMunicipioSelecionado(key);

          mapRef.current?.fitBounds(target.getBounds(), {
            padding: [24, 24],
            maxZoom: 12,
            animate: true,
          });
        },
      });
    },
    [dataByMunicipio, styleFeature, municipioSelecionado]
  );

  // Reaplica o estilo em todas as features quando a seleção muda,
  // pra desfazer o destaque do município anterior
  React.useEffect(() => {
    geoJsonRef.current?.setStyle(styleFeature);
  }, [municipioSelecionado, styleFeature]);

  function handleVoltar() {
    if (!geoData) return;
    setMunicipioSelecionado(null);
    fitToBounds(geoData);
  }

  const rotuloVoltar =
    uf === TODOS_ESTADOS ? "← Ver todos os estados" : "← Ver estado inteiro";

  return (
    <div className="relative h-full w-full">
      {municipioSelecionado && (
        <button
          type="button"
          onClick={handleVoltar}
          className="absolute top-3 left-3 z-40 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          {rotuloVoltar}
        </button>
      )}

      <MapContainer
        key={uf}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="z-10 h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoData && (
          <GeoJSON
            key={`${uf}-${breaks.join(",")}`}
            ref={geoJsonRef}
            data={geoData}
            style={styleFeature}
            onEachFeature={handleEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}