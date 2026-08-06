import * as React from "react";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#09090b] text-zinc-400">
        <p className="text-sm animate-pulse">Verificando autenticação...</p>
      </div>
    );
  }

  return <>{children}</>;
}