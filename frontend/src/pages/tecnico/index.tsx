import { Topbar } from '@/components/tecnico/topbar'
import { StatsGrid } from '@/components/tecnico/stat-card'
import { RainfallProductivityChart } from '@/components/tecnico/rainfall-productivity-chart'
import { TrafficByRegion } from '@/components/tecnico/traffic-by-region'
import { MunicipalityTable } from '@/components/tecnico/municipality-table'
import { Footer } from '@/components/tecnico/footer'
import { TecnicoRestriction } from '@/components/auth/role.guard'
import { Sidebar } from '@/components/tecnico/Sidebar'

const stats = [
	{ label: 'Avg Rain (mm)', value: '124.5', change: 12 },
	{ label: 'Productivity Index', value: '92.1%', change: 4.5 },
	{ label: 'Active Sensors', value: '1,024', change: -0.2 },
	{ label: 'Yield Est. (ton/ha)', value: '8.4', change: 2.1 },
]

export default function DashboardOverview() {
	return (
		<TecnicoRestriction>
			<div className="theme-dashboard flex min-h-screen bg-background font-sans text-foreground">
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
		</TecnicoRestriction>
	)
}
