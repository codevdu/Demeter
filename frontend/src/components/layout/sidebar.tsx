import * as React from "react";
import { 
  LayoutDashboard, 
  Layers, 
  CloudRain, 
  Tractor, 
  Settings, 
  HelpCircle, 
  Activity, 
  Droplets 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside 
      className={`${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out border-r border-zinc-800 bg-[#121214] flex flex-col justify-between hidden md:flex shrink-0`}
    >
      <div>
        <div className={`p-6 flex items-center ${isOpen ? "justify-start" : "justify-center"} h-20`}>
          {isOpen ? (
            <div>
              <h1 className="text-xl font-bold text-emerald-400 tracking-wide">Chuva e Safra</h1>
              <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-widest">Inteligência de Precisão</p>
            </div>
          ) : (
            <Droplets className="size-8 text-emerald-400" />
          )}
        </div>
        <nav className="mt-2 px-3 flex flex-col gap-2">
          <a href="#" className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} gap-3 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors`}>
            <LayoutDashboard className="size-5 shrink-0" /> 
            {isOpen && <span>Visão Geral</span>}
          </a>
          <a href="#" className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} gap-3 py-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg text-sm font-medium transition-colors`}>
            <Layers className="size-5 shrink-0" /> 
            {isOpen && <span>Solos</span>}
          </a>
          <a href="#" className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} gap-3 py-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg text-sm font-medium transition-colors`}>
            <CloudRain className="size-5 shrink-0" /> 
            {isOpen && <span>Previsão</span>}
          </a>
          <a href="#" className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} gap-3 py-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg text-sm font-medium transition-colors`}>
            <Tractor className="size-5 shrink-0" /> 
            {isOpen && <span>Manejo de Safra</span>}
          </a>
          <a href="#" className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} gap-3 py-2.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg text-sm font-medium transition-colors`}>
            <Settings className="size-5 shrink-0" /> 
            {isOpen && <span>Configurações</span>}
          </a>
        </nav>
      </div>

      <div className="p-4 px-3 flex flex-col gap-4 mb-2">
        <a href="#" className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} gap-3 text-zinc-500 hover:text-zinc-300 text-xs font-medium`}>
          <HelpCircle className="size-5 shrink-0" /> 
          {isOpen && <span>Central de Ajuda</span>}
        </a>
        <a href="#" className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} gap-3 text-zinc-500 hover:text-zinc-300 text-xs font-medium`}>
          <Activity className="size-5 shrink-0" /> 
          {isOpen && <span>Status do Sistema</span>}
        </a>
      </div>
    </aside>
  );
}