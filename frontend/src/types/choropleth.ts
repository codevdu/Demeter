// src/lib/choropleth.ts

/**
 * Paleta sequencial (claro → escuro) usada no coroplético.
 * 5 faixas, do menor para o maior valor.
 */
export const CHOROPLETH_COLORS = [
  "#edf8e9",
  "#bae4b3",
  "#74c476",
  "#31a354",
  "#006d2c",
];

export const CHOROPLETH_NO_DATA_COLOR = "#e5e7eb"; // cinza (sem dado)

/**
 * Calcula os pontos de corte (quantis) para dividir os valores em N faixas.
 * Retorna N-1 valores de corte para N faixas.
 */
export function getQuantileBreaks(values: number[], bucketCount: number): number[] {
  if (values.length === 0) return [];

  const sorted = [...values].sort((a, b) => a - b);
  const breaks: number[] = [];

  for (let i = 1; i < bucketCount; i++) {
    const index = Math.floor((sorted.length * i) / bucketCount);
    breaks.push(sorted[Math.min(index, sorted.length - 1)]);
  }

  return breaks;
}

/**
 * Retorna a cor correspondente a um valor, dado um conjunto de breaks.
 * `undefined`/`null` (sem dado) retorna cinza.
 */
export function getColorByValue(
  value: number | undefined | null,
  breaks: number[]
): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return CHOROPLETH_NO_DATA_COLOR;
  }

  for (let i = 0; i < breaks.length; i++) {
    if (value <= breaks[i]) {
      return CHOROPLETH_COLORS[i];
    }
  }

  return CHOROPLETH_COLORS[CHOROPLETH_COLORS.length - 1];
}

/**
 * Gera rótulos legíveis para a legenda a partir dos breaks.
 * Ex: ["< 45", "45 – 60", "60 – 75", "75 – 90", "> 90"]
 */
export function getLegendLabels(
  breaks: number[],
  unit: string = ""
): string[] {
  if (breaks.length === 0) return [];

  const format = (n: number) => `${Math.round(n)}${unit}`;
  const labels: string[] = [`< ${format(breaks[0])}`];

  for (let i = 0; i < breaks.length - 1; i++) {
    labels.push(`${format(breaks[i])} – ${format(breaks[i + 1])}`);
  }

  labels.push(`> ${format(breaks[breaks.length - 1])}`);

  return labels;
}

/**
 * Gera um valor pseudo-aleatório determinístico a partir de uma string
 * (nome do município), útil para mockar dados de forma consistente
 * entre re-renders/reloads, sem precisar de backend real ainda.
 */
export function mockValueFromLabel(
  label: string,
  min: number,
  max: number
): number {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = (hash << 5) - hash + label.charCodeAt(i);
    hash |= 0;
  }
  const normalized = Math.abs(hash % 1000) / 1000; // 0..1
  return min + normalized * (max - min);
}