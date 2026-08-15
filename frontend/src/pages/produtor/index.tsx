import * as React from "react";

import { getDashboardData } from "@/services/dashboard-service";
import { Sidebar } from "@/components/produtor/Sidebar";
import { StatsGrid, type StatCardProps } from "@/components/produtor/StatCard";
import { ChartSection } from "@/components/produtor/ChartSection";
import { SoilSection } from "@/components/produtor/SoilSection";
import {
  TrendingUp,
  BarChart3,
  Droplets,
  CircleCheck,
  TriangleAlert,
} from "lucide-react";
import { ProdutorRestriction } from "@/components/auth/role.guard";
import { Topbar } from "@/components/produtor/Topbar";
import { useState } from "react";

export default function ProdutorDashboard() {

  const [kpis, setKpis] = React.useState({
  produtividade_media: 0,
  variacao_producao: 0,
  chuva_acumulada: 0,
  });

  const [loading, setLoading] = React.useState(true);

  const [, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
  async function carregarDashboard() {
    try {
      const data = await getDashboardData();

      setKpis(data.kpis);
    } catch (error) {
      console.error("Erro ao carregar KPIs do dashboard:", error);
      setError("Não foi possível carregar os indicadores.");
    } finally {
      setLoading(false);
    }
  }

  carregarDashboard();
}, []);


  const stats: StatCardProps[] = [
  {
    label: "Produtividade Média",
    value: loading ? "..." : kpis.produtividade_media.toFixed(1),
    unit: "sc/ha",
    note: "12.4% vs ciclo anterior",
    noteIcon: TrendingUp,
    icon: TrendingUp,
    tone: "positive",
  },
  {
    label: "Variação da Produção",
    value: loading
    ? "..."
    : `${kpis.variacao_producao > 0 ? "+" : ""}${kpis.variacao_producao.toFixed(1)}`,
    unit: "%",
    note: "Tendência de crescimento ideal",
    noteIcon: CircleCheck,
    icon: BarChart3,
    tone: "info",
  },
  {
    label: "Chuva Acumulada",
    value: loading ? "..." : kpis.chuva_acumulada.toFixed(0),
    unit: "mm",
    note: "15% abaixo da média histórica",
    noteIcon: TriangleAlert,
    icon: Droplets,
    tone: "warning",
  },
  ];

  const [municipality, setMunicipality] = useState<string | null>(null);

  return (
    <ProdutorRestriction>
      <div className="theme-dashboard flex min-h-screen bg-background font-sans text-foreground">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="pb-8">
            <Topbar
              title="Visão Geral"
              onMunicipalityChange={setMunicipality}
              selectedMunicipality={municipality}
            />
          </div>
          <div className="mx-auto flex w-full max-w-none flex-col gap-6 2xl:max-w-[1600px]">
            <StatsGrid stats={stats} />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <ChartSection />

              <SoilSection />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* adicionar componente de mapa */}
            </div>

            <footer className="flex flex-col items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row">
              <p>© 2026 Chuva e Safra. Inteligência para o campo.</p>

              <nav className="flex items-center gap-4">
                <a href="#" className="transition-colors hover:text-foreground">
                  Política de Privacidade
                </a>

                <a href="#" className="transition-colors hover:text-foreground">
                  Termos de Uso
                </a>

                <a href="#" className="transition-colors hover:text-foreground">
                  Fontes dos Dados
                </a>
              </nav>
            </footer>
          </div>
        </main>
      </div>
    </ProdutorRestriction>
  );
}