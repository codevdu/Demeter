// hooks/use-auth.ts
import axios from "axios";
import { useEffect, useState } from "react";

export interface CarProperty {
  id: string;
  carReceipt: string;
  municipality: string;
  municipalityId: number;
  userId: string;
}

export interface AuthUser {
  id: string;
  profile: "PRODUTOR" | "TECNICO" | "GESTOR";
  state: string;
  coordinates: { lat: number; lng: number } | null;
  carProperties: CarProperty[];
}

export function useAuthMe() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get<{ user: AuthUser }>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          { withCredentials: true }
        );

        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
}