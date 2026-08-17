import Link from "next/link";

export function Footer() {
	return (
		<footer
			data-slot="footer"
			className="flex flex-col items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row"
		>
			<p>© 2026 Deméter, chuva e safra. Todos os direitos reservados</p>
			<nav className="flex items-center gap-4">
				<Link href="#" className="transition-colors hover:text-foreground">
					Data Sources
				</Link>
			</nav>
		</footer>
	)
}
