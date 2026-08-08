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

export default function ProdutorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-[#09090b] text-zinc-200 font-sans overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex flex-1 flex-col h-screen overflow-y-auto">
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 max-w-7xl mx-auto w-full p-8">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                Visão do Produtor Rural
                </h1>

                <p className="text-zinc-400 mt-2">
                Acompanhe os principais indicadores da propriedade.
                </p>
            </div>


            {/* Cards */}

            <div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card className="bg-[#121214] border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-sm text-zinc-400">
                        Produtividade Média
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                        142.4
                        </p>

                        <p className="text-emerald-400 text-sm mt-2">
                        +12,4% em relação ao ciclo anterior
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#121214] border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-sm text-zinc-400">
                        Variação da Produção
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                        +8,2%
                        </p>

                        <p className="text-blue-400 text-sm mt-2">
                        Tendência positiva
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-[#121214] border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-sm text-zinc-400">
                        Chuva Acumulada
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-3xl font-bold">
                        648 mm
                        </p>

                        <p className="text-amber-400 text-sm mt-2">
                        15% abaixo da média histórica
                        </p>
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

        </main>
      </div>
    </div>
  );
}