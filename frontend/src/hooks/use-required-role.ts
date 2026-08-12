"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Profile } from "@/services/auth-service";
import { useAuth } from "@/hooks/use-auth";

export function useRequireRole(perfisPermitidos: Profile[]) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!perfisPermitidos.includes(user!.profile)) {
      router.push("/not-permission");
    }
  }, [loading, isAuthenticated, user, perfisPermitidos, router]);

  return { user, loading };
}