// components/produtor/topbar.tsx
"use client";

import * as React from "react";
import { ChevronDown, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopbarProps {
  title: string;
  selectedMunicipality?: string | null;
  onMunicipalityChange?: (municipality: string) => void;
}

const MUNICIPIO_COLORS = [
  "bg-primary",
  "bg-status-blue",
  "bg-status-orange",
  "bg-status-purple",
];

export function Topbar({
  title,
  selectedMunicipality,
  onMunicipalityChange,
}: TopbarProps) {
  const { user } = useAuth();
  const [internalSelected, setInternalSelected] = React.useState<string | null>(
    null
  );

  const isControlled = selectedMunicipality !== undefined;
  const municipios = React.useMemo(() => {
    if (!user?.carProperties) return [];

    const nomes = new Set(user.carProperties.map((cp) => cp.municipality));
    return Array.from(nomes).map((nome, index) => ({
      label: nome,
      color: MUNICIPIO_COLORS[index % MUNICIPIO_COLORS.length],
    }));
  }, [user]);

  const selected = isControlled
    ? selectedMunicipality
    : internalSelected ?? municipios[0]?.label ?? null;

  function handleSelect(label: string) {
    if (isControlled) {
      onMunicipalityChange?.(label);
    } else {
      setInternalSelected(label);
    }
  }

  return (
    <header
      data-slot="topbar"
      className="flex items-center justify-between gap-4"
    >
      <h1 className="text-lg font-semibold text-primary">{title}</h1>

      {municipios.length > 0 && (
        <div className="flex items-center gap-3">
          <p className="text-sm text-foreground-subtle">
            Visualizando{" "}
            <span className="font-medium text-foreground">
              {selected ?? "—"}
            </span>
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-border bg-sidebar px-3 py-1.5 text-sm font-medium text-foreground-subtle transition-colors hover:bg-muted hover:text-foreground"
              >
                <MapPin className="size-3.5 shrink-0" />
                {selected ?? "Selecionar município"}
                <ChevronDown className="size-3.5 shrink-0" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              {municipios.map(({ label, color }) => (
                <DropdownMenuItem
                  key={label}
                  onSelect={() => handleSelect(label)}
                  className={cn(
                    "flex items-center justify-between gap-2.5",
                    label === selected && "bg-muted text-foreground"
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <MapPin className="size-3.5 shrink-0" />
                    {label}
                  </span>
                  <span
                    className={cn("size-1.5 shrink-0 rounded-full", color)}
                    aria-hidden
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}