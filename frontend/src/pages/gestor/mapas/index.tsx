import { GestorRestriction } from "@/components/auth/role.guard";
import { GeoJsonMapTest } from "@/components/gestor/Map";
import { Sidebar } from "@/components/produtor/Sidebar";

export default function GestorMaps() {
  return (
    <GestorRestriction>
      <div className="theme-dashboard flex min-h-screen bg-background font-sans text-foreground">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto flex w-full max-w-none flex-col gap-6 2xl:max-w-[1600px]">
            <GeoJsonMapTest />
          </div>
        </main>
      </div>
    </GestorRestriction>
  );
}