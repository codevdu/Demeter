import PieCenter from "./charts/pie-center";
import PieChart from "./charts/pie-chart";
import PieSlice from "./charts/pie-slice";

export interface PieDataItem {
  label: string;
  value: number;
  color: string;
}

export const pieData: PieDataItem[] = [
  { label: "Milho", value: 3910, color: "var(--status-yellow)" },
  { label: "Feijão", value: 2901, color: "var(--status-blue)" },
  { label: "Soja", value: 4022, color: "var(--status-orange)" },
  { label: "Algodão", value: 2302, color: "var(--status-purple)" },
];

interface ProductivityPieProps {
  hoveredIndex: number | null;
  onHoverChange: (index: number | null) => void;
}

export default function ProductivityPie({ hoveredIndex, onHoverChange }: ProductivityPieProps) {
  return (
    <div>
      <PieChart
        data={pieData}
        innerRadius={60}
        size={250}
        hoveredIndex={hoveredIndex}
        onHoverChange={onHoverChange}
      >
        {pieData.map((_, i) => (
          <PieSlice index={i} key={i} />
        ))}
        <PieCenter>
          {({ value, label, isHovered, data }) => (
            <div className="text-center">
              <div
                className="font-bold text-xl"
                style={{ color: isHovered ? data.color : undefined }}
              >
                {value.toLocaleString()}
              </div>
              <div className="text-muted-foreground text-xs">{label}</div>
            </div>
          )}
        </PieCenter>
      </PieChart>
    </div>
  );
}