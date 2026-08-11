import * as React from "react";
import { 
  AlertTriangle, 
  TrendingDown, 
  AlertCircle,
  Cloud,
  Wind,
  CheckCircle2,
  Layers
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { mockGestorData } from "./gestor-mock";

export default function GestorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      setHasError(false);
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const t = setTimeout(() => {
      fetchData();
    }, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <ProtectedRoute>
      {hasError ? (
        <div className="flex h-screen w-full items-center justify-center bg-[#09090b]">
          <ErrorFallback onRetry={fetchData} />
        </div>
      ) : (
        <div className="flex h-screen bg-[#09090b] text-zinc-200 font-sans overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="flex-1 flex flex-col h-screen overflow-y-auto">
            <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="p-8 flex-1 max-w-7xl mx-auto w-full">
              {isLoading && (
                <div className="w-full text-center py-4 text-zinc-500 text-sm animate-pulse">
                  Atualizando dados da safra...
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-[#121214] border-zinc-800 shadow-sm hover:border-zinc-700 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Risco de Safra Estadual</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-end gap-2 pb-4">
                    <span className="text-3xl font-bold text-zinc-100">{mockGestorData.kpis.harvestRisk.current}</span>
                    <span className="text-xs text-emerald-400 flex items-center mb-1 font-medium">
                      <TrendingDown className="size-3 mr-0.5" /> {mockGestorData.kpis.harvestRisk.variation}
                    </span>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-zinc-800 shadow-sm hover:border-zinc-700 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Precipitação Média</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-end gap-2 pb-4">
                    <span className="text-3xl font-bold text-zinc-100">{mockGestorData.kpis.precipitation.current}</span>
                    <span className="text-xs text-amber-400 flex items-center mb-1 font-medium">
                      <AlertTriangle className="size-3 mr-0.5" /> Baixa
                    </span>
                  </CardContent>
                </Card>

                <Card className="border-amber-500/40 bg-[#121214] shadow-[0_0_15px_rgba(245,158,11,0.05)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-amber-500/10 pointer-events-none"></div>
                  <CardHeader className="pb-2 relative">
                    <CardTitle className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Municípios em Alerta</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-end gap-2 pb-4 relative">
                    <span className="text-3xl font-bold text-amber-400">{mockGestorData.kpis.alertMunicipalities.current}</span>
                    <span className="text-xs text-amber-500 mb-1 font-medium">+{mockGestorData.kpis.alertMunicipalities.newToday} hoje</span>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-zinc-800 shadow-sm hover:border-zinc-700 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Sensores Ativos</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-end gap-2 pb-4">
                    <span className="text-3xl font-bold text-zinc-100">{mockGestorData.kpis.activeSensors.current}</span>
                    <span className="text-xs text-emerald-400 mb-1 font-medium">{mockGestorData.kpis.activeSensors.online} Online</span>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                
                <Card className="col-span-1 lg:col-span-2 border-zinc-800 bg-[#121214]">
                  <CardHeader>
                    <CardTitle className="text-lg text-zinc-200 font-semibold">Índice de Produtividade Regional</CardTitle>
                    <CardDescription className="text-zinc-500">Monitoramento coroplético ao vivo para o Estado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-105 w-full rounded-lg border border-zinc-800/80 overflow-hidden bg-[#09090b] flex flex-col items-center justify-center">
                       
                       <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-size-[2rem_2rem] opacity-40"></div>
                       <div className="absolute flex flex-col items-center text-zinc-600 opacity-70">
                          <Layers className="size-10 mb-2" />
                          <p className="text-sm font-medium">Integração Cartográfica Pendente</p>
                       </div>

                       <div className="absolute top-4 left-4 bg-[#121214]/90 border border-zinc-800 p-3 rounded backdrop-blur-md w-52 shadow-lg">
                          <p className="text-[10px] font-bold text-zinc-400 mb-2 tracking-wider">RESUMO ESTADUAL</p>
                          <div className="flex flex-col gap-2">
                            <div className="bg-red-950/20 border border-red-900/30 rounded p-1.5 flex justify-between items-center">
                               <span className="text-[10px] text-zinc-300">Risco Alto</span>
                               <span className="text-[11px] font-bold text-red-500">25%</span>
                            </div>
                            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded p-1.5 flex justify-between items-center">
                               <span className="text-[10px] text-zinc-300">Produtividade Alta</span>
                               <span className="text-[11px] font-bold text-emerald-500">56%</span>
                            </div>
                          </div>
                       </div>
                       
                       <div className="absolute bottom-4 right-4 bg-[#121214]/90 border border-zinc-800 p-4 rounded-lg shadow-xl backdrop-blur-md">
                         <p className="text-xs font-bold text-zinc-300 mb-3">Escala de Risco</p>
                         <div className="flex flex-col gap-2.5 text-[10px] font-bold text-zinc-500 tracking-wider">
                           <span className="flex items-center gap-2">
                             <div className="size-2.5 rounded-full bg-emerald-500"/> IDEAL
                           </span>
                           <span className="flex items-center gap-2">
                             <div className="size-2.5 rounded-full bg-blue-500"/> NEUTRO
                           </span>
                           <span className="flex items-center gap-2">
                             <div className="size-2.5 rounded-full bg-amber-500"/> CRÍTICO
                           </span>
                         </div>
                       </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col gap-6">
                  <Card className="border-amber-500/30 bg-[#121214] flex-1 shadow-[0_0_10px_rgba(245,158,11,0.03)]">
                    <CardHeader className="pb-3 border-b border-zinc-800/80 mb-3">
                      <CardTitle className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex justify-between items-center">
                        Municípios em Risco
                        <AlertTriangle className="size-4" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                      {mockGestorData.municipalitiesAtRisk.map((mun) => (
                        <div key={mun.id} className="flex items-center justify-between p-3 rounded-lg bg-[#09090b] border border-zinc-800/80 hover:border-amber-500/20 transition-colors">
                          <div>
                            <p className="font-medium text-sm text-zinc-200">{mun.name}</p>
                            <p className={`text-[11px] mt-0.5 ${mun.isCritical ? 'text-amber-400/90' : 'text-zinc-500'}`}>{mun.alertReason}</p>
                          </div>
                          <AlertCircle className={`size-4 ${mun.isCritical ? 'text-amber-400' : 'text-zinc-600'}`} />
                        </div>
                      ))}
                      <button className="mt-3 w-full py-2.5 px-4 rounded-lg border border-amber-500/40 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition-colors text-xs font-bold tracking-wide">
                        ACIONAR EQUIPE TÉCNICA
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
                <Card className="bg-[#121214] border-zinc-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-zinc-200 text-sm font-semibold flex justify-between items-center w-full">
                      Padrões Climáticos
                      <span className="text-[10px] px-2 py-1 bg-[#09090b] border border-zinc-800 rounded text-zinc-500 font-medium">Últimos 7 Dias</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center gap-2 text-sm text-zinc-400">
                          <Cloud className="size-4 text-emerald-400" /> Equilíbrio de Umidade
                        </span>
                        <span className="text-sm text-emerald-400 font-medium">{mockGestorData.weather.humidity}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#09090b] rounded-full overflow-hidden border border-zinc-800/50">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: mockGestorData.weather.humidity }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center gap-2 text-sm text-zinc-400">
                          <Wind className="size-4 text-blue-400" /> Velocidade do Vento (Média)
                        </span>
                        <span className="text-sm text-zinc-400 font-medium">{mockGestorData.weather.wind}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#09090b] rounded-full overflow-hidden border border-zinc-800/50">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-zinc-800">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-zinc-200 text-sm font-semibold">Análise de Solo via Satélite</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[#09090b] border border-zinc-800/80 flex flex-col gap-1">
                      <p className="text-xs text-zinc-500">Nitrogênio (N)</p>
                      <p className="text-base font-medium text-zinc-200">Ideal</p>
                      <span className="mt-1 w-fit px-2 py-0.5 rounded text-[10px] font-bold tracking-wide bg-emerald-500/10 text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="size-3"/> ESTÁVEL
                      </span>
                    </div>
                    <div className="p-4 rounded-lg bg-[#09090b] border border-zinc-800/80 flex flex-col gap-1">
                      <p className="text-xs text-zinc-500">Fósforo (P)</p>
                      <p className="text-base font-medium text-amber-400">Esgotando</p>
                      <span className="mt-1 w-fit px-2 py-0.5 rounded text-[10px] font-bold tracking-wide bg-amber-500/10 text-amber-400 flex items-center gap-1">
                        <TrendingDown className="size-3"/> REPOSIÇÃO REQ.
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <footer className="border-t border-zinc-800/80 pt-4 pb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-600">
                <p>© 2024 Chuva e Safra. Inteligência para o campo.</p>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-zinc-400 transition-colors">Política de Privacidade</a>
                  <a href="#" className="hover:text-zinc-400 transition-colors">Termos de Serviço</a>
                  <a href="#" className="hover:text-zinc-400 transition-colors">Fontes de Dados</a>
                </div>
              </footer>
            </main>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}