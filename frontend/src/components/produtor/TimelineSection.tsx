import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ExternalLink, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    label: "Preparo do Solo",
    detail: "Concluído em 12 de outubro de 2023",
    current: false,
  },
  {
    label: "Plantio",
    detail: "Concluído em 4 de novembro de 2023",
    current: false,
  },
  {
    label: "Crescimento Vegetativo",
    detail: "Etapa atual — Semana 14",
    current: true,
  },
];

export function TimelineSection() {
  return (
    <Card data-slot="timeline-section">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle>Timeline da Safra</CardTitle>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Detalhes
          <ExternalLink className="size-3.5" />
        </button>
      </CardHeader>

      <CardContent>
        <ol className="flex flex-col">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;

            return (
              <li key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full",
                      step.current
                        ? "bg-status-blue text-white ring-4 ring-status-blue/20"
                        : "bg-primary text-primary-foreground",
                    )}
                  >
                    {step.current ? (
                      <Sprout className="size-3" />
                    ) : (
                      <Check className="size-3" />
                    )}
                  </span>

                  {!isLast && <span className="w-px flex-1 bg-border" />}
                </div>

                <div className={cn(!isLast && "pb-6")}>
                  <p className="text-sm font-medium text-foreground">
                    {step.label}
                  </p>

                  <p className="text-xs text-muted-foreground">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
