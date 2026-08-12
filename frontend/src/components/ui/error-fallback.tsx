import * as React from "react";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export function ErrorFallback({
  title = "Serviço Indisponível",
  message = "Não foi possível carregar os dados no momento. Verifique sua conexão ou tente novamente mais tarde.",
  onRetry,
  onBack,
}: ErrorFallbackProps) {
  return (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center p-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 mb-4 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
        <AlertTriangle className="size-8" />
      </div>

      <h3 className="text-lg font-bold text-zinc-100 tracking-wide mb-1">
        {title}
      </h3>
      <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
        {message}
      </p>

      <div className="flex items-center gap-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors text-sm font-bold tracking-wide"
          >
            <RefreshCw className="size-4" /> Tentar Novamente
          </button>
        )}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="size-4" /> Voltar
          </button>
        )}
      </div>
    </div>
  );
}