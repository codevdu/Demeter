import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { ExternalLink } from "lucide-react";

export function TimelineSection() {
  return (
    <Card className="bg-[#121214] border-zinc-800 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Timeline da Safra
          </CardTitle>

          <button className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300">
            Detalhes
            <ExternalLink size={14} />
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-black text-xs">
              <Check size={12} />
            </div>

            <div className="w-px h-12 bg-zinc-700 mt-1" />
          </div>

          <div>
            <p className="font-medium">
              Preparo do Solo
            </p>

            <p className="text-sm text-zinc-500">
              Concluído em 12 de outubro de 2023
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-black text-xs">
             <Check size={12} />
            </div>

            <div className="w-px h-12 bg-zinc-700 mt-1" />
          </div>

          <div>
            <p className="font-medium">
              Plantio
            </p>

            <p className="text-sm text-zinc-500">
              Concluído em 4 de novembro de 2023
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex flex-col items-center">
          <div className="w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          </div>

          <div>
            <p className="font-medium">
              Crescimento Vegetativo
            </p>

            <p className="text-sm text-emerald-400">
              Etapa atual - Semana 14
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}