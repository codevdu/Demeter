import * as React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

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
          <h1 className="text-3xl font-bold">
            Visão do Produtor Rural
          </h1>
        </main>
      </div>
    </div>
  );
}