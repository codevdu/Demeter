"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Profile } from "@/services/auth-service";
import { NotAllowedPage } from "./not-allowed";

interface RoleGuardProps {
  allowedProfiles: Profile[];
  children: ReactNode;
}

export function RoleGuard({ allowedProfiles, children }: RoleGuardProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!allowedProfiles.includes(user!.profile)) {
    return <NotAllowedPage />;
  }

  return <>{children}</>;
}

export function ProdutorRestriction({ children }: { children: ReactNode }) {
  return <RoleGuard allowedProfiles={["PRODUTOR"]}>{children}</RoleGuard>;
}

export function TecnicoRestriction({ children }: { children: ReactNode }) {
  return <RoleGuard allowedProfiles={["TECNICO"]}>{children}</RoleGuard>;
}

export function GestorRestriction({ children }: { children: ReactNode }) {
  return <RoleGuard allowedProfiles={["GESTOR"]}>{children}</RoleGuard>;
}