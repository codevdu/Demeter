// components/gestor/KPIs.tsx
import * as React from "react";
import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Radio,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { StatCard, StatCardProps } from "../produtor/StatCard";

interface KPIsGestorData {
  harvestRisk: { current: string | number; variation?: string };
  precipitation: { current: string | number };
  alertMunicipalities: {
    current: string | number;
    newToday?: string | number;
  };
  activeSensors: { current: string | number; online?: string | number };
}

interface KPIsGestorProps {
  data: KPIsGestorData;
  className?: string;
}

export function KPIsGestor({ data, className }: KPIsGestorProps) {
  const stats: StatCardProps[] = [
    {
      label: "Risco de Safra Estadual",
      value: String(data.harvestRisk.current),
      note: data.harvestRisk.variation ?? "—",
      noteIcon: TrendingDown,
      icon: TrendingDown,
      tone: "positive",
    },
    {
      label: "Precipitação Média",
      value: String(data.precipitation.current),
      note: "Baixa",
      noteIcon: AlertTriangle,
      icon: AlertTriangle,
      tone: "warning",
    },
    {
      label: "Municípios em Alerta",
      value: String(data.alertMunicipalities.current),
      note:
        data.alertMunicipalities.newToday !== undefined
          ? `+${data.alertMunicipalities.newToday} hoje`
          : "Sem novidades",
      noteIcon: TrendingUp,
      icon: AlertTriangle,
      tone: "warning",
      className: "border-status-orange/40 bg-status-orange/5",
    },
    {
      label: "Sensores Ativos",
      value: String(data.activeSensors.current),
      note:
        data.activeSensors.online !== undefined
          ? `${data.activeSensors.online} Online`
          : "—",
      noteIcon: Radio,
      icon: Radio,
      tone: "info",
    },
  ];

  return (
    <div
      data-slot="kpis-gestor"
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6",
        className
      )}
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}