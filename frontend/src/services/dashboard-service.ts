import { api } from "@/lib/api";

export interface KpisProdutor {
  produtividade_media: number;
  variacao_producao: number;
  chuva_acumulada: number;
}

export interface DashboardResponse {
  kpis: KpisProdutor;
}

export interface DashboardParams {
  cultura?: string;
  de?: string;
  ate?: string;
}

export async function getDashboardData(
  params?: DashboardParams
): Promise<DashboardResponse> {
  const { data } = await api.get<DashboardResponse>(
    "/dashboard",
    {
      params,
    }
  );

  return data;
}