'use client'

import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Segment {
	label: string
	percent: number
	color: string
}

const segments: Segment[] = [
	{ label: 'High Yield', percent: 42, color: 'var(--color-primary)' },
	{ label: 'Surplus Water', percent: 22, color: 'var(--color-status-blue)' },
	{ label: 'Arid Warning', percent: 36, color: 'var(--color-status-orange)' },
]

const optimalZone = 64

export function TrafficByRegion() {
	return (
		<Card data-slot="traffic-by-region">
			<CardHeader>
				<CardTitle>Traffic by Region</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-col items-center gap-4">
				<div className="relative h-40 w-40">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={segments}
								dataKey="percent"
								nameKey="label"
								innerRadius="72%"
								outerRadius="100%"
								startAngle={90}
								endAngle={-270}
								stroke="var(--color-surface)"
								strokeWidth={2}
							>
								{segments.map((segment) => (
									<Cell key={segment.label} fill={segment.color} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
					<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-2xl font-semibold text-foreground">{optimalZone}%</span>
						<span className="text-[11px] text-muted-foreground">Optimal Zone</span>
					</div>
				</div>

				<dl className="flex w-full flex-col gap-2.5">
					{segments.map((segment) => (
						<div key={segment.label} className="flex items-center justify-between text-sm">
							<dt className="flex items-center gap-2 text-foreground-subtle">
								<span
									className="size-2 shrink-0 rounded-full"
									style={{ backgroundColor: segment.color }}
									aria-hidden
								/>
								{segment.label}
							</dt>
							<dd className="font-medium text-foreground">{segment.percent}%</dd>
						</div>
					))}
				</dl>
			</CardContent>
		</Card>
	)
}
