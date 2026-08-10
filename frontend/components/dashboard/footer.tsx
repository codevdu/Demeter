export function Footer() {
	return (
		<footer
			data-slot="footer"
			className="flex flex-col items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground sm:flex-row"
		>
			<p>© 2024 Chuva e Safra. Intelligence for the field.</p>
			<nav className="flex items-center gap-4">
				<a href="#" className="transition-colors hover:text-foreground">
					Privacy Policy
				</a>
				<a href="#" className="transition-colors hover:text-foreground">
					Terms of Service
				</a>
				<a href="#" className="transition-colors hover:text-foreground">
					Data Sources
				</a>
			</nav>
		</footer>
	)
}
