import * as React from "react";
import { Search, Bell, Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
  title?: string;
}

export function Header({
  toggleSidebar,
  title = "Dashboard do Gestor",
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-zinc-800 bg-[#09090b] sticky top-0 z-10">
      <div className="flex items-center h-full gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <Menu className="size-5" />
        </button>
        <h2 className="text-sm font-semibold text-emerald-400 border-b-2 border-emerald-400 pb-1 mt-1">{title}</h2>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar dados..." 
            className="bg-[#121214] border border-zinc-800 text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:border-emerald-500 text-zinc-200 w-64 placeholder:text-zinc-500 transition-colors"
          />
        </div>
        <button className="text-zinc-400 hover:text-white transition-colors relative">
          <Bell className="size-5" />
          <span className="absolute 0 right-0 size-2 bg-amber-500 rounded-full border border-[#09090b]"></span>
        </button>
        <div className="size-8 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden cursor-pointer hover:ring-2 hover:ring-zinc-600 transition-all">
           <img src="https://github.com/shadcn.png" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}