import * as React from "react";
import { 
  LayoutDashboard, 
  Layers, 
  CloudRain, 
  Tractor, 
  Settings, 
  CircleHelp,
  Radio,
  Droplets,
  ArrowRight
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

      <div className="mt-auto">
        {isOpen && (
          <div className="mx-3 mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
              Novo
            </span>

            <h3 className="mt-2 text-sm font-semibold text-zinc-100">
              Mapas de Saturação do Solo
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
              Monitoramento de umidade de alta precisão para o seu setor norte.
            </p>

            <a
              href="#"
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300"
            >
              Ver dados
              <ArrowRight className="size-3" />
            </a>
          </div>
        )}

        <div className="p-4 px-3 flex flex-col gap-4 mb-2 border-t border-zinc-800">
          <a href="#" className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} gap-3 text-zinc-500 hover:text-zinc-300 text-xs font-medium`}>
            <CircleHelp className="size-4 shrink-0" />
            {isOpen && <span>Central de Ajuda</span>}
          </a>
          <a href="#" className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} gap-3 text-zinc-500 hover:text-zinc-300 text-xs font-medium`}>
            <Radio className="size-4 shrink-0" />
            {isOpen && <span>Status do Sistema</span>}
          </a>
        </div>
      </div>
    </aside>
  );
}