import { twMerge } from 'tailwind-merge'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { Card } from '@/components/ui/card'

export interface StatCardProps {
	label: string
	value: string
	change: number
	className?: string
}

export function StatCard({ label, value, change, className }: StatCardProps) {
	const isPositive = change >= 0
	const Icon = isPositive ? ArrowUp : ArrowDown

	return (
		<Card data-slot="stat-card" className={twMerge('gap-2 p-4', className)}>
			<p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
				{label}
			</p>
			<div className="flex items-baseline gap-2">
				<span className="text-2xl font-semibold text-foreground">{value}</span>
				<span
					className={twMerge(
						'flex items-center gap-0.5 text-xs font-medium',
						isPositive ? 'text-primary' : 'text-status-orange',
					)}
				>
					<Icon className="size-3" />
					{Math.abs(change)}%
				</span>
			</div>
		</Card>
	)
}

export interface StatsGridProps {
	stats: StatCardProps[]
}

export function StatsGrid({ stats }: StatsGridProps) {
	return (
		<div data-slot="stats-grid" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
			{stats.map((stat) => (
				<StatCard key={stat.label} {...stat} />
			))}
		</div>
	)
}
