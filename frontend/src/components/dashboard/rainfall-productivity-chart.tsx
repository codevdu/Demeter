'use client'

import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell } from 'recharts'
import { Select } from '@base-ui/react/select'
import { ChevronDown, Check } from 'lucide-react'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

interface DataPoint {
	rainfall: number
	productivity: number
	municipality: string
	color: string
}

const data: DataPoint[] = [
	{ rainfall: 82, productivity: 54, municipality: 'Querência', color: 'var(--color-status-purple)' },
	{ rainfall: 92, productivity: 71, municipality: 'Nova Mutum', color: 'var(--color-primary)' },
	{ rainfall: 105, productivity: 84, municipality: 'Arid Warning', color: 'var(--color-status-orange)' },
	{ rainfall: 115, productivity: 92, municipality: 'Nova Mutum', color: 'var(--color-primary)' },
	{ rainfall: 124, productivity: 88, municipality: 'Mato Grosso', color: 'var(--color-primary)' },
	{ rainfall: 142, productivity: 82, municipality: 'Rio Verde', color: 'var(--color-status-blue)' },
	{ rainfall: 168, productivity: 63, municipality: 'Sorriso', color: 'var(--color-status-blue)' },
	{ rainfall: 191, productivity: 65, municipality: 'Sorriso', color: 'var(--color-status-orange)' },
]

const ranges = ['Last 7 days', 'Last 30 days', 'Last 90 days'] as const

export function RainfallProductivityChart() {
	const [range, setRange] = useState<string>('Last 30 days')

	return (
		<Card data-slot="rainfall-productivity-chart">
			<CardHeader>
				<div>
					<CardTitle>Rainfall vs Productivity Analysis</CardTitle>
					<CardDescription>Cross-municipality performance tracking</CardDescription>
				</div>

				<Select.Root value={range} onValueChange={(value) => setRange(value as string)}>
					<Select.Trigger className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-xs font-medium text-foreground-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
						<Select.Value />
						<ChevronDown className="size-3.5" />
					</Select.Trigger>
					<Select.Portal>
						<Select.Positioner sideOffset={6}>
							<Select.Popup className="min-w-40 rounded-lg border border-border bg-surface-raised p-1 shadow-lg">
								{ranges.map((option) => (
									<Select.Item
										key={option}
										value={option}
										className="flex cursor-pointer items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-xs text-foreground-subtle data-selected:bg-muted data-selected:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground"
									>
										<Select.ItemText>{option}</Select.ItemText>
										<Select.ItemIndicator>
											<Check className="size-3.5 text-primary" />
										</Select.ItemIndicator>
									</Select.Item>
								))}
							</Select.Popup>
						</Select.Positioner>
					</Select.Portal>
				</Select.Root>
			</CardHeader>

			<CardContent className="h-64">
				<ResponsiveContainer width="100%" height="100%">
					<ScatterChart margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
						<CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
						<XAxis
							type="number"
							dataKey="rainfall"
							name="Rainfall"
							unit="mm"
							tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
							axisLine={{ stroke: 'var(--color-border)' }}
							tickLine={false}
							label={{
								value: 'RAINFALL (MM)',
								position: 'insideBottom',
								offset: -4,
								fill: 'var(--color-muted-foreground)',
								fontSize: 10,
							}}
						/>
						<YAxis
							type="number"
							dataKey="productivity"
							name="Productivity Index"
							tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
							axisLine={{ stroke: 'var(--color-border)' }}
							tickLine={false}
							label={{
								value: 'PRODUCTIVITY INDEX',
								angle: -90,
								position: 'insideLeft',
								fill: 'var(--color-muted-foreground)',
								fontSize: 10,
							}}
						/>
						<Scatter data={data} shape="circle">
							{data.map((point, index) => (
								<Cell key={index} fill={point.color} r={6} />
							))}
						</Scatter>
					</ScatterChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
