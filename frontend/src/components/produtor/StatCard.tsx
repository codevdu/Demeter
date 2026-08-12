import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "positive" | "info" | "warning";

const toneClass: Record<Tone, string> = {
  positive: "text-primary",
  info: "text-status-blue",
  warning: "text-status-orange",
};

export interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  note: string;
  noteIcon?: LucideIcon;
  icon: LucideIcon;
  tone?: Tone;
  className?: string;
}

export function StatCard({
  label,
  value,
  unit,
  note,
  noteIcon: NoteIcon,
  icon: Icon,
  tone = "positive",
  className,
}: StatCardProps) {
  return (
    <Card data-slot="stat-card" className={cn("gap-2 p-4", className)}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <Icon className={cn("size-4 shrink-0", toneClass[tone])} />
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold text-foreground">{value}</span>

        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>

      <p
        className={cn(
          "flex items-center gap-1 text-xs font-medium",
          toneClass[tone],
        )}
      >
        {NoteIcon && <NoteIcon className="size-3 shrink-0" />}
        {note}
      </p>
    </Card>
  );
}

export interface StatsGridProps {
  stats: StatCardProps[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div
      data-slot="stats-grid"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
