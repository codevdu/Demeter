// components/produtor/topbar.tsx
"use client";

import * as React from "react";
import { useAuthMe } from "@/hooks/use-auth.me";
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
}: TopbarProps) {
  const { user } = useAuthMe();
  const [internalSelected] = React.useState<string | null>(
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


  return (
    <header
      data-slot="topbar"
      className="flex pb-8 items-center justify-between gap-4"
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
        </div>
      )}
    </header>
  );
}