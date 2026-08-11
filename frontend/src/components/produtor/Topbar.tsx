import * as React from "react";
import { Search, Bell, Sprout } from "lucide-react";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header
      data-slot="topbar"
      className="flex items-center justify-between gap-4"
    >
      <h1 className="text-lg font-semibold text-primary">{title}</h1>

      <div className="flex items-center gap-3">
        <label className="relative hidden md:block">
          <span className="sr-only">Buscar dados</span>

          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Buscar dados..."
            className="h-9 w-64 rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>

        <button
          type="button"
          aria-label="Notificações"
          className="relative flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Bell className="size-4" />

          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-status-orange" />
        </button>

        <div
          className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
          aria-hidden
        >
          <Sprout className="size-4" />
        </div>
      </div>
    </header>
  );
}
