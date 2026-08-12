"use client";

import { useEffect, useState } from "react";
import { getMe, MeResponse } from "@/services/auth-service";

export function useAuth() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, isAuthenticated: !!user };
}