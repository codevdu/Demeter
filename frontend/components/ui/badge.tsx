import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

export const badgeVariants = tv({
	base: 'inline-flex w-fit items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide',
	variants: {
		variant: {
			optimal: 'border-primary/30 bg-primary/15 text-primary',
			saturated: 'border-status-blue/30 bg-status-blue/15 text-status-blue',
			critical: 'border-status-orange/30 bg-status-orange/15 text-status-orange',
			neutral: 'border-border bg-muted text-foreground-subtle',
		},
	},
	defaultVariants: { variant: 'neutral' },
})

export interface BadgeProps extends ComponentProps<'span'>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<span data-slot="badge" className={twMerge(badgeVariants({ variant }), className)} {...props} />
	)
}
