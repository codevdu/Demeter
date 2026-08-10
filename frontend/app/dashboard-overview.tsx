import { Sidebar } from '@/components/dashboard/sidebar'
import { Topbar } from '@/components/dashboard/topbar'
import { StatsGrid } from '@/components/dashboard/stat-card'
import { RainfallProductivityChart } from '@/components/dashboard/rainfall-productivity-chart'
import { TrafficByRegion } from '@/components/dashboard/traffic-by-region'
import { MunicipalityTable } from '@/components/dashboard/municipality-table'
import { Footer } from '@/components/dashboard/footer'

const stats = [
	{ label: 'Avg Rain (mm)', value: '124.5', change: 12 },
	{ label: 'Productivity Index', value: '92.1%', change: 4.5 },
	{ label: 'Active Sensors', value: '1,024', change: -0.2 },
	{ label: 'Yield Est. (ton/ha)', value: '8.4', change: 2.1 },
]

export function DashboardOverview() {
	return (
		<div className="flex min-h-screen bg-background">
			<Sidebar />

			<main className="flex-1 overflow-y-auto p-6">
				<div className="mx-auto flex max-w-6xl flex-col gap-6">
					<Topbar title="Overview" />

					<StatsGrid stats={stats} />

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<RainfallProductivityChart />
						</div>
						<TrafficByRegion />
					</div>

					<MunicipalityTable />

					<Footer />
				</div>
			</main>
		</div>
	)
}
