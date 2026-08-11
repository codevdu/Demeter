import { Upload, FileText } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

type Status = 'optimal' | 'saturated' | 'critical'

interface MunicipalityRow {
	municipality: string
	rainfall: number
	temp: number
	productivity: number
	soilMoisture: number
	status: Status
}

const rows: MunicipalityRow[] = [
	{ municipality: 'Mato Grosso', rainfall: 124.5, temp: 28.4, productivity: 0.92, soilMoisture: 78, status: 'optimal' },
	{ municipality: 'Rio Verde', rainfall: 142.2, temp: 26.1, productivity: 0.88, soilMoisture: 74, status: 'optimal' },
	{ municipality: 'Sorriso', rainfall: 190.8, temp: 25.5, productivity: 0.65, soilMoisture: 90, status: 'saturated' },
	{ municipality: 'Querência', rainfall: 82.1, temp: 31.2, productivity: 0.54, soilMoisture: 32, status: 'critical' },
	{ municipality: 'Nova Mutum', rainfall: 115.3, temp: 27.8, productivity: 0.82, soilMoisture: 71, status: 'optimal' },
]

const statusLabel: Record<Status, string> = {
	optimal: 'Optimal',
	saturated: 'Saturated',
	critical: 'Critical',
}

export function MunicipalityTable() {
	return (
		<Card data-slot="municipality-table">
			<CardHeader>
				<CardTitle>Municipality Breakdown</CardTitle>
				<div className="flex items-center gap-2">
					<button
						type="button"
						className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<Upload className="size-3.5" />
						Export CSV
					</button>
					<button
						type="button"
						className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-foreground-subtle transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<FileText className="size-3.5" />
						Export PDF
					</button>
				</div>
			</CardHeader>

			<CardContent className="overflow-x-auto">
				<table className="w-full min-w-160 border-collapse text-sm">
					<thead>
						<tr className="border-b border-border text-left text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
							<th className="py-2 pr-4 font-semibold">Municipality</th>
							<th className="py-2 pr-4 font-semibold">Rainfall (mm)</th>
							<th className="py-2 pr-4 font-semibold">Temp (avg)</th>
							<th className="py-2 pr-4 font-semibold">Productivity Index</th>
							<th className="py-2 pr-4 font-semibold">Soil Moisture</th>
							<th className="py-2 pr-4 font-semibold">Status</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr key={row.municipality} className="border-b border-border last:border-0">
								<td className="py-3 pr-4 font-medium text-foreground">{row.municipality}</td>
								<td className="py-3 pr-4 text-foreground-subtle">{row.rainfall}</td>
								<td className="py-3 pr-4 text-foreground-subtle">{row.temp}°C</td>
								<td className="py-3 pr-4 font-medium text-primary">{row.productivity.toFixed(2)}</td>
								<td className="py-3 pr-4">
									<Progress value={row.soilMoisture} className="max-w-28" />
								</td>
								<td className="py-3 pr-4">
									<Badge
										variant={
											row.status === 'optimal'
												? 'default'
												: row.status === 'saturated'
													? 'secondary'
													: 'destructive'
										}
									>
										{statusLabel[row.status]}
									</Badge>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</CardContent>
		</Card>
	)
}
