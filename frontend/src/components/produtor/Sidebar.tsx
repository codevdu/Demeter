// components/produtor/sidebar.tsx
"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Layers,
  CloudRain,
  Tractor,
  Settings,
  CircleHelp,
  Radio,
  ArrowRight,
  Menu,
  Sprout,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "Visão Geral", icon: LayoutDashboard },
  { label: "Solos", icon: Layers },
  { label: "Previsão", icon: CloudRain },
  { label: "Manejo de Safra", icon: Tractor },
  { label: "Configurações", icon: Settings },
] as const;

const talhoes = [
  { label: "Setor A-24", color: "bg-primary" },
  { label: "Setor B-12", color: "bg-status-blue" },
  { label: "Setor C-07", color: "bg-status-orange" },
  { label: "Setor D-31", color: "bg-status-purple" },
] as const;

const supportItems = [
  { label: "Central de Ajuda", icon: CircleHelp },
  { label: "Status do Sistema", icon: Radio },
] as const;

export function Sidebar() {
  const [active, setActive] = React.useState<string>("Visão Geral");
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <aside
      data-slot="sidebar"
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col justify-between border-r border-border bg-sidebar py-4 transition-all duration-300 ease-in-out md:flex",
        isOpen ? "w-56 px-3" : "w-16 px-2"
      )}
    >
      <div className="flex flex-col gap-6">
        <div
          className={cn(
            "flex items-center gap-2 px-2",
            isOpen ? "justify-between" : "justify-center"
          )}
        >
          {isOpen ? (
            <div>
              <p className="text-base font-semibold text-primary">Deméter</p>
              <p className="text-xs text-muted-foreground">Inteligência de Precisão</p>
            </div>
          ) : (
            <Sprout className="size-6 text-primary" />
          )}

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Recolher menu" : "Expandir menu"}
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-md text-foreground-subtle transition-colors hover:bg-muted hover:text-foreground",
              !isOpen && "mt-2"
            )}
          >
            <Menu className="size-4" />
          </button>
        </div>

        <nav aria-label="Navegação principal" className="flex flex-col gap-0.5">
          {navItems.map(({ label, icon: Icon }) => {
            const isActive = active === label;

            return (
              <button
                key={label}
                type="button"
                onClick={() => setActive(label)}
                data-active={isActive ? "" : undefined}
                title={!isOpen ? label : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-foreground-subtle transition-colors",
                  !isOpen && "justify-center px-0",
                  "hover:bg-muted hover:text-foreground",
                  "data-active:bg-status-blue data-active:text-white data-active:hover:bg-status-blue",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {isOpen && label}
              </button>
            );
          })}
        </nav>

        {isOpen && (
          <div className="flex flex-col gap-0.5">
            <p className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Talhões
            </p>

            {talhoes.map(({ label, color }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-foreground-subtle"
              >
                {label}
                <span className={cn("size-1.5 shrink-0 rounded-full", color)} aria-hidden />
              </div>
            ))}
          </div>
        )}

        {isOpen && (
          <div className="rounded-lg border border-primary/20 bg-primary/6 p-3">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
              Novo
            </span>

            <h3 className="mt-1.5 text-sm font-semibold text-foreground">
              Mapas de Saturação do Solo
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Monitoramento de umidade de alta precisão para o seu setor norte.
            </p>

            <a
              href="#"
              className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-foreground"
            >
              Ver dados
              <ArrowRight className="size-3" />
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 border-t border-border pt-3">
        {supportItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            title={!isOpen ? label : undefined}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-foreground-subtle transition-colors hover:bg-muted hover:text-foreground",
              !isOpen && "justify-center px-0"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {isOpen && label}
          </button>
        ))}
      </div>
    </aside>
  );
}