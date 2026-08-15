
export interface KpiData {
  current: string | number;
  variation?: string;
  status?: string;
  newToday?: number;
  online?: string;
}

export interface MunicipalityAlert {
  id: string;
  name: string;
  alertReason: string;
  isCritical: boolean;
  metrics?: string;
}

export interface GestorData {
  kpis: {
    harvestRisk: KpiData;
    precipitation: KpiData;
    alertMunicipalities: KpiData;
    activeSensors: KpiData;
  };
  municipalitiesAtRisk: MunicipalityAlert[];
  weather: {
    humidity: string;
    wind: string;
  };
  soil: {
    nitrogen: { status: string; condition: 'STABLE' | 'WARNING' | 'CRITICAL' };
    phosphorus: { status: string; condition: 'STABLE' | 'WARNING' | 'CRITICAL' };
  };
}

export const mockGestorData: GestorData = {
  kpis: {
    harvestRisk: { current: "12.4%", variation: "↓ 2.1%" },
    precipitation: { current: "42mm", status: "Baixa" },
    alertMunicipalities: { current: 14, newToday: 3 },
    activeSensors: { current: "1,204", online: "98%" }
  },
  municipalitiesAtRisk: [
    {
      id: "mun-01",
      name: "Quixadá",
      alertReason: "Umidade do solo em 12%",
      isCritical: true,
      metrics: "Solo Seco"
    },
    {
      id: "mun-02",
      name: "Iguatu",
      alertReason: "Temperatura: 39°C | Seca",
      isCritical: true,
      metrics: "Onda de Calor"
    },
    {
      id: "mun-03",
      name: "Sobral",
      alertReason: "Alerta de Infiltração",
      isCritical: false,
      metrics: "Atenção"
    },
    {
      id: "mun-04",
      name: "Tauá",
      alertReason: "Seca Severa",
      isCritical: true,
      metrics: "Solo Árido"
    },
    {
      id: "mun-05",
      name: "Crateús",
      alertReason: "Queda na Produtividade Estimada",
      isCritical: false,
      metrics: "Revisão Necessária"
    }
  ],
  weather: {
    humidity: "72%",
    wind: "14 km/h"
  },
  soil: {
    nitrogen: { status: "Ideal", condition: "STABLE" },
    phosphorus: { status: "Esgotando", condition: "CRITICAL" }
  }
};