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

const MOCK_DASHBOARD_DATA: DashboardResponse = {
  kpis: {
    produtividade_media: 189,
    variacao_producao: 29.3,
    chuva_acumulada: 120,
  },
};

export async function getDashboardData(
  params?: DashboardParams
): Promise<DashboardResponse> {
  try {
    const { data } = await api.get<DashboardResponse>(
      "/api/dashboard/dados", 
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.warn(
      "Falha ao buscar no serviço de dados, usando dados mockados:",
      error
    );

    return MOCK_DASHBOARD_DATA;
  }
}