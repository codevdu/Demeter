import { ProdutorRestriction } from "@/components/auth/role.guard";
import WorldMap from "@/components/produtor/Map";
import { Sidebar } from "@/components/produtor/Sidebar";
import { Topbar } from "@/components/produtor/Topbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProdutorMaps() {
  return (
    <ProdutorRestriction>
      <div className="theme-dashboard flex min-h-screen bg-background font-sans text-foreground">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
          <Topbar title="Mapas" />

          <div className="mx-auto pt-8 flex w-full max-w-none flex-col gap-6 2xl:max-w-[1600px]">
            <Card>
              <CardHeader>Visualização Cloroplética</CardHeader>
              <CardContent>
                <WorldMap />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProdutorRestriction>
  );
}