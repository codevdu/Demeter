import { type IGeoJSON } from "@/types/geojson";
import { getGeoJsonUrlByUf } from "@/constants/geojson.urls";

export async function getGeoJsonByUf(uf: string): Promise<IGeoJSON | null> {
  const url = getGeoJsonUrlByUf(uf);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`Falha ao buscar GeoJSON de ${uf}: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.warn(`Erro ao buscar GeoJSON de ${uf}:`, error);
    return null;
  }
} 