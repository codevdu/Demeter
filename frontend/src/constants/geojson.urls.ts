export const UF_CODIGO_IBGE: Record<string, string> = {
  AL: "27",
  BA: "29",
  CE: "23",
  MA: "21",
  PB: "25",
  PE: "26",
  PI: "22",
  RN: "24",
  SE: "28",
};

const GEOJSON_BASE_URL =
  "https://raw.githubusercontent.com/tbrugz/geodata-br/refs/heads/master/geojson";

export function getGeoJsonUrlByUf(uf: string): string {
  const codigo = UF_CODIGO_IBGE[uf.toUpperCase()];

  if (!codigo) {
    throw new Error(`UF inválida ou não mapeada: ${uf}`);
  }

  return `${GEOJSON_BASE_URL}/geojs-${codigo}-mun.json`;
}

export const GEOJSON_URLS: Record<string, string> = Object.fromEntries(
  Object.entries(UF_CODIGO_IBGE).map(([uf, codigo]) => [
    uf,
    `${GEOJSON_BASE_URL}/geojs-${codigo}-mun.json`,
  ])
);