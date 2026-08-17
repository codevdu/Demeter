// components/produtor/sidebar.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  LayoutDashboard,
  CircleHelp,
  Radio,
  Menu,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { IcarResponse } from "@/services/auth-service";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { href: "/produtor", label: "Visão Geral", icon: LayoutDashboard }
];

const MUNICIPIO_COLORS = [
  "bg-primary",
  "bg-status-blue",
  "bg-status-orange",
  "bg-status-purple",
];

const supportItems = [
  { label: "Central de Ajuda", icon: CircleHelp },
  { label: "Status do Sistema", icon: Radio },
] as const;

function MunicipioSkeleton() {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Municípios
      </p>

      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5"
        >
          <div className="size-3.5 shrink-0 animate-pulse rounded-full bg-muted" />
          <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function Sidebar() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = React.useState(true);

  // Municípios únicos a partir das propriedades (CAR) do usuário
  const municipios = React.useMemo(() => {
    if (!user?.carProperties) return [];

    const nomes = new Set<string>(
      user.carProperties.map((cp: IcarResponse) => cp.municipality as string)
    );

    return Array.from(nomes).map((nome: string, index) => ({
      label: nome,
      color: MUNICIPIO_COLORS[index % MUNICIPIO_COLORS.length],
    }));
  }, [user]);

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
            <p></p>
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
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                data-active={isActive ? "" : undefined}
                title={!isOpen ? item.label : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-foreground-subtle transition-colors",
                  !isOpen && "justify-center px-0",
                  "hover:bg-muted hover:text-foreground",
                  "data-active:bg-[#22c55e]/30 data-active:text-white data-active:hover:bg-[#22c55e]/20",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {isOpen && item.label}
              </Link>
            );
          })}
        </nav>

        {isOpen && loading && <MunicipioSkeleton />}

        {isOpen && !loading && municipios.length > 1 && (
          <div className="flex flex-col gap-0.5">
            <p className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Municípios
            </p>

            {municipios.map(({ label, color }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-foreground-subtle"
              >
                <span className="flex items-center gap-2 truncate">
                  <MapPin className="size-3.5 shrink-0" />
                  {label}
                </span>
                <span className={cn("size-1.5 shrink-0 rounded-full", color)} aria-hidden />
              </div>
            ))}
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