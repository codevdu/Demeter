import * as React from "react";

import { Sidebar } from "@/components/produtor/Sidebar";
import { Topbar } from "@/components/produtor/Topbar";
import { StatsGrid, type StatCardProps } from "@/components/produtor/StatCard";
import { ChartSection } from "@/components/produtor/ChartSection";
import { TimelineSection } from "@/components/produtor/TimelineSection";
import { SoilSection } from "@/components/produtor/SoilSection";
import { WeatherSection } from "@/components/produtor/WeatherSection";
import {
  TrendingUp,
  BarChart3,
  Droplets,
  CircleCheck,
  TriangleAlert,
  Plus,
} from "lucide-react";

const stats: StatCardProps[] = [
  {
    label: "Produtividade Média",
    value: "142.4",
    unit: "sc/ha",
    note: "12.4% vs ciclo anterior",
    noteIcon: TrendingUp,
    icon: TrendingUp,
    tone: "positive",
  },
  {
    label: "Variação da Produção",
    value: "+8.2",
    unit: "%",
    note: "Tendência de crescimento ideal",
    noteIcon: CircleCheck,
    icon: BarChart3,
    tone: "info",
  },
  {
    label: "Chuva Acumulada",
    value: "648",
    unit: "mm",
    note: "15% abaixo da média histórica",
    noteIcon: TriangleAlert,
    icon: Droplets,
    tone: "warning",
  },
];

export default function ProdutorDashboard() {
  return (
    <div className="theme-dashboard flex min-h-screen bg-background font-sans text-foreground">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <Topbar title="Quixadá – Safra 2023/24" />

          <StatsGrid stats={stats} />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <ChartSection />

            <SoilSection />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <TimelineSection />

            <WeatherSection />
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

        <button
          type="button"
          aria-label="Novo registro"
          className="fixed bottom-8 right-8 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Plus className="size-5" />
        </button>
      </main>
    </div>
  );
}
