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
        <div className="h-[350px] border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-zinc-500">
          Área do gráfico
        </div>
      </CardContent>
    </Card>
  );
}