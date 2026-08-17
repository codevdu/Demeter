import {
  TrendingDown,
  Cloud,
  Wind,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { GestorRestriction } from "@/components/auth/role.guard";
import { mockGestorData } from "../../lib/gestor-mock";
import { Sidebar } from "@/components/gestor/Sidebar";
import { GeoJsonMapTest } from "@/components/gestor/Map";
import { Topbar } from "@/components/gestor/Topbar";
import { KPIsGestor } from "@/components/gestor/KPIs";
import { RankingMunicipios } from "@/components/gestor/produtivity-ranking";

export default function GestorDashboard() {
  return (
    <GestorRestriction>
      <div className="theme-dashboard flex min-h-screen bg-background font-sans text-foreground">

        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
          <div>
            <Topbar
              title="Visão Geral"
            />
          </div>

          <KPIsGestor data={mockGestorData.kpis}/>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            <div className="lg:col-span-2">
              <GeoJsonMapTest />
            </div>

            <div className="flex flex-col gap-6">
              <RankingMunicipios limit={6} className="flex-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
            <Card className="border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground text-sm font-semibold flex justify-between items-center w-full">
                  Padrões Climáticos
                  <span className="text-[10px] px-2 py-1 bg-muted/30 border border-border rounded text-muted-foreground font-medium">Últimos 7 Dias</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Cloud className="size-4 text-emerald-500" /> Equilíbrio de Umidade
                    </span>
                    <span className="text-sm text-emerald-500 font-medium">{mockGestorData.weather.humidity}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden border border-border">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: mockGestorData.weather.humidity }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Wind className="size-4 text-blue-500" /> Velocidade do Vento (Média)
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">{mockGestorData.weather.wind}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden border border-border">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground text-sm font-semibold">Análise de Solo via Satélite</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border flex flex-col gap-1">
                  <p className="text-xs text-muted-foreground">Nitrogênio (N)</p>
                  <p className="text-base font-medium text-foreground">Ideal</p>
                  <span className="mt-1 w-fit px-2 py-0.5 rounded text-[10px] font-bold tracking-wide bg-emerald-500/10 text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> ESTÁVEL
                  </span>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border flex flex-col gap-1">
                  <p className="text-xs text-muted-foreground">Fósforo (P)</p>
                  <p className="text-base font-medium text-amber-500">Esgotando</p>
                  <span className="mt-1 w-fit px-2 py-0.5 rounded text-[10px] font-bold tracking-wide bg-amber-500/10 text-amber-500 flex items-center gap-1">
                    <TrendingDown className="size-3" /> REPOSIÇÃO REQ.
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <footer className="border-t border-border pt-4 pb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground">
            <p>© 2024 Chuva e Safra. Inteligência para o campo.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Termos de Serviço</a>
              <a href="#" className="hover:text-foreground transition-colors">Fontes de Dados</a>
            </div>
          </footer>
        </main>
      </div>
    </GestorRestriction>
  )
}