import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

export const progressVariants = tv({
	slots: {
		track: 'h-1.5 w-full overflow-hidden rounded-full bg-muted',
		bar: 'h-full rounded-full transition-[width]',
	},
	variants: {
		tone: {
			optimal: { bar: 'bg-primary' },
			saturated: { bar: 'bg-status-blue' },
			critical: { bar: 'bg-status-orange' },
		},
	},
	defaultVariants: { tone: 'optimal' },
})

export interface ProgressProps
	extends ComponentProps<'div'>,
		VariantProps<typeof progressVariants> {
	value: number
}

export function Progress({ className, tone, value, ...props }: ProgressProps) {
	const { track, bar } = progressVariants({ tone })
	const clamped = Math.min(100, Math.max(0, value))

	return (
		<div
			data-slot="progress"
			role="progressbar"
			aria-valuenow={clamped}
			aria-valuemin={0}
			aria-valuemax={100}
			className={twMerge(track(), className)}
			{...props}
		>
			<div className={bar()} style={{ width: `${clamped}%` }} />
		</div>
	)
}
