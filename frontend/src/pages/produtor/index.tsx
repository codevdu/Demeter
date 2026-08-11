import * as React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  CloudRain,
  Plus,
} from "lucide-react";

export default function ProdutorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-200 font-sans overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex flex-1 flex-col h-screen overflow-y-auto">
        <Header
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        title="Quixadá – Safra 2023/24"
        />

        <main className="flex-1 overflow-auto p-8 bg-linear-to-br from-black via-[#090b09] to-[#06110c]">

            {/* Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {/* Produtividade */}

                <Card className="relative overflow-hidden bg-[#151d18] border-[#314238] rounded-xl">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-base font-normal text-zinc-400">
                        Produtividade Média
                    </CardTitle>

                    <TrendingUp
                        className="absolute right-5 top-5 text-emerald-400"
                        size={19}
                    />
                    </CardHeader>

                    <CardContent>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-light text-zinc-200">
                        142.4
                        </span>

                        <span className="mb-1 text-sm text-zinc-400">
                        sc/ha
                        </span>
                    </div>

                    <p className="mt-3 flex items-center gap-1 text-sm text-emerald-400">
                        ↑ 12.4% vs ciclo anterior
                    </p>

                    <TrendingUp
                        size={80}
                        className="absolute -bottom-5 -right-3 text-white/[0.035]"
                    />
                    </CardContent>
                </Card>


                {/* Variação */}

                <Card className="relative overflow-hidden bg-[#151d18] border-[#314238] rounded-xl">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-base font-normal text-zinc-400">
                        Variação da Produção
                    </CardTitle>

                    <BarChart3
                        className="absolute right-5 top-5 text-blue-300"
                        size={19}
                    />
                    </CardHeader>

                    <CardContent>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-light text-zinc-200">
                        +8.2
                        </span>

                        <span className="mb-1 text-sm text-zinc-400">
                        %
                        </span>
                    </div>

                    <p className="mt-3 flex items-center gap-1 text-sm text-blue-300">
                        <CircleCheck size={14} />
                        Tendência de crescimento ideal
                    </p>

                    <BarChart3
                        size={76}
                        className="absolute -bottom-4 -right-2 text-white/[0.035]"
                    />
                    </CardContent>
                </Card>


                {/* Chuva */}

                <Card className="relative overflow-hidden bg-[#151d18] border-[#314238] rounded-xl">
                    <CardHeader className="pb-2">
                    <CardTitle className="text-base font-normal text-zinc-400">
                        Chuva Acumulada
                    </CardTitle>

                    <Droplets
                        className="absolute right-5 top-5 text-amber-300"
                        size={19}
                    />
                    </CardHeader>

                    <CardContent>
                    <div className="flex items-end gap-2">
                        <span className="text-4xl font-light text-zinc-200">
                        648
                        </span>

                        <span className="mb-1 text-sm text-zinc-400">
                        mm
                        </span>
                    </div>

                    <p className="mt-3 flex items-center gap-1 text-sm text-amber-300">
                        <TriangleAlert size={14} />
                        15% abaixo da média histórica
                    </p>

                    <CloudRain
                        size={86}
                        className="absolute -bottom-5 -right-3 text-white/[0.035]"
                    />
                    </CardContent>
                </Card>

            </div>


            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

                {/* Card do gráfico */}

                <ChartSection />


                {/* Card do solo */}

                <SoilSection />
                
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                <TimelineSection />

                <WeatherSection />
            </div>

            <footer className="mt-8 border-t border-zinc-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
                <p>© 2026 Chuva e Safra. Inteligência para o campo.</p>

                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-emerald-400 transition">
                    Política de Privacidade
                    </a>

                    <a href="#" className="hover:text-emerald-400 transition">
                    Termos de Uso
                    </a>

                    <a href="#" className="hover:text-emerald-400 transition">
                    Fontes dos Dados
                    </a>
                </div>
            </footer>

            <button
                className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-emerald-500 text-black shadow-lg hover:scale-110 hover:bg-emerald-400 transition-all duration-300 flex items-center justify-center"
                >
                <Plus size={28} />
            </button>

        </main>
      </div>
    </div>
  );
}