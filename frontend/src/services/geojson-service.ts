import { type IGeoJSON } from "@/types/geojson";
import { getGeoJsonUrlByUf } from "@/constants/geojson.urls";

export async function getGeoJsonByUf(uf: string): Promise<IGeoJSON> {
  const url = getGeoJsonUrlByUf(uf);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Falha ao buscar GeoJSON de ${uf}`);
  }

  return response.json();
}