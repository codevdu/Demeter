import AreaChart, { Area } from "./charts/area-chart";
import AreaChartLoading from "./charts/area-chart-loading";
import Grid from "./charts/grid";
import { ChartTooltip } from "./charts/tooltip";
import XAxis from "./charts/x-axis";

interface ProductivityProps {
  data: { date: string; productividade: number; chuva: number }[];
  isLoading?: boolean;
}

export default function Productivity({ data, isLoading }: ProductivityProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <AreaChartLoading/>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Sem dados disponíveis para este recorte.
      </div>
    );
  }

  return (
    <AreaChart data={data}>
      <Grid horizontal />
      <Area
        dataKey="productividade"
        fill="#22c55e"
        fillOpacity={0.3}
      />
      <Area
        dataKey="chuva"
        fill="#3b82f6"
        fillOpacity={0.3}
      />
      <XAxis />
      <ChartTooltip />
    </AreaChart>
  );
}