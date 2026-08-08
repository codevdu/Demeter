import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ChartSection() {
  return (
    <Card className="xl:col-span-2 bg-[#121214] border-zinc-800">
      <CardHeader>
        <CardTitle>Produtividade x Chuva</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative h-[350px] rounded-lg bg-[#0f0f10] overflow-hidden">

            {/* linhas horizontais */}

            <div className="absolute inset-0 flex flex-col justify-between p-6">

                <div className="border-b border-zinc-800"></div>
                <div className="border-b border-zinc-800"></div>
                <div className="border-b border-zinc-800"></div>
                <div className="border-b border-zinc-800"></div>
                <div className="border-b border-zinc-800"></div>

            </div>

            {/* eixo Y */}

            <div className="absolute left-10 top-6 bottom-10 w-px bg-zinc-700"></div>

            {/* eixo X */}

            <div className="absolute left-10 right-6 bottom-10 h-px bg-zinc-700"></div>

        </div>
      </CardContent>
    </Card>
  );
}