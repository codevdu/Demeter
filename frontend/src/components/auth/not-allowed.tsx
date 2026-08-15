import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { ShieldAlertIcon } from "lucide-react";
import Link from "next/link";

export function NotAllowedPage() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
			<Empty>
				<EmptyHeader>
					<ShieldAlertIcon className="mx-auto mb-2 size-12 text-destructive" />
					<EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
						403
					</EmptyTitle>
					<EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
						Você não tem permissão para acessar essa página. <br />
						Contate seu superior se achar que isso é um engano.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button className={"just"}>
							<Link href="/">
								{/* <HomeIcon data-icon="inline-start" /> */}
								Voltar para o início
							</Link>
						</Button>
						<Button variant="outline">
							<Link href="/login">
								Entrar com outra conta
							</Link>
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}