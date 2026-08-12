'use client'

import { twMerge } from 'tailwind-merge'
import { LayoutGrid, Mountain, CloudSun, Sprout, Settings, HelpCircle, Radio } from 'lucide-react'
import { useState } from 'react'

const navItems = [
	{ label: 'Overview', icon: LayoutGrid },
	{ label: 'Soils', icon: Mountain },
	{ label: 'Forecast', icon: CloudSun },
	{ label: 'Crop Management', icon: Sprout },
	{ label: 'Settings', icon: Settings },
] as const

const municipalities = [
	{ label: 'Mato Grosso', color: 'bg-primary' },
	{ label: 'Rio Verde', color: 'bg-status-blue' },
	{ label: 'Sorriso', color: 'bg-status-orange' },
	{ label: 'Querência', color: 'bg-status-purple' },
] as const

export function Sidebar() {
	const [active, setActive] = useState<string>('Overview')

	return (
		<aside
			data-slot="sidebar"
			className="flex h-screen w-56 shrink-0 flex-col justify-between border-r border-border bg-sidebar px-3 py-4"
		>
			<div className="flex flex-col gap-6">
				<div className="px-2">
					<p className="text-base font-semibold text-primary">Chuva e Safra</p>
					<p className="text-xs text-muted-foreground">Precision Intelligence</p>
				</div>

				<nav aria-label="Main navigation" className="flex flex-col gap-0.5">
					{navItems.map(({ label, icon: Icon }) => {
						const isActive = active === label
						return (
							<button
								key={label}
								type="button"
								onClick={() => setActive(label)}
								data-active={isActive ? '' : undefined}
								className={twMerge(
									'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-foreground-subtle transition-colors',
									'hover:bg-muted hover:text-foreground',
									'data-active:bg-primary data-active:text-primary-foreground data-active:hover:bg-primary',
								)}
							>
								<Icon className="size-4 shrink-0" />
								{label}
							</button>
						)
					})}
				</nav>

				<div className="flex flex-col gap-0.5">
					<p className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
						Municipalities
					</p>
					{municipalities.map(({ label, color }) => (
						<div
							key={label}
							className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm text-foreground-subtle"
						>
							<span className={twMerge('size-1.5 shrink-0 rounded-full', color)} aria-hidden />
							{label}
						</div>
					))}
				</div>
			</div>

			<div className="flex flex-col gap-0.5 border-t border-border pt-3">
				<button
					type="button"
					className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-foreground-subtle transition-colors hover:bg-muted hover:text-foreground"
				>
					<HelpCircle className="size-4 shrink-0" />
					Help Center
				</button>
				<button
					type="button"
					className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-foreground-subtle transition-colors hover:bg-muted hover:text-foreground"
				>
					<Radio className="size-4 shrink-0" />
					System Status
				</button>
			</div>
		</aside>
	)
}
