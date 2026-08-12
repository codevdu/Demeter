"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOff } from "lucide-react";
import {
  Mail,
  Lock,
  Eye,
  ArrowRight,
  Globe,
  Building2,
  Tractor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toglle";
import Link from "next/link";
import { getMe, isValidProfile, loginUser, ROLE_REDIRECT } from "@/services/auth-service";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const messages = [
    "Monitore dados climáticos em tempo real",
    "Acompanhe indicadores agrícolas da sua região",
    "Visualize mapas, gráficos e estatísticas",
    "Transforme dados em decisões inteligentes",
    "Bem-vindo a Deméter",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [messages.length]);

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  setSubmitError("");

  if (!email || !password) {
    setSubmitError("Preencha e-mail e senha.");
    return;
  }

  setLoading(true);

  try {
    // login só autentica e seta o cookie httpOnly — não usamos o retorno dele
    await loginUser({ email, password });

    // busca o perfil real direto da fonte da verdade
    const me = await getMe();

    if (!me || !isValidProfile(me.profile)) {
      setSubmitError(
        "Não foi possível validar seu perfil de acesso. Contate o suporte."
      );
      return;
    }

    router.push(ROLE_REDIRECT[me.profile]);
  } catch (err) {
    setSubmitError(
      err instanceof Error
        ? err.message
        : "Erro inesperado. Tente novamente."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex h-screen">
      {/* Ícone */}
      <div className="absolute left-5 top-5 z-50 flex md:h-8 md:w-8 lg:h-10 lg:w-10 h-7 w-7 p-1 items-center justify-center rounded-md md:bg-[#10B981] lg:left-10 lg:top-8">
        <Tractor className="text-black lg:text-white dark:text-white" />
      </div>

      {/* Imagem */}
      <div className="relative hidden w-1/2 overflow-hidden md:block">
        <Image
          width={1080}
          height={1080}
          loading="eager"
          src="https://images.pexels.com/photos/13860040/pexels-photo-13860040.jpeg"
          alt="Login"
          className="h-screen w-full object-cover"
        />

        <div className="absolute inset-0 dark:bg-black/25" />
        <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.75),transparent_45%)] bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.45),transparent_45%)]" />

        <div className="absolute inset-0 flex flex-col justify-center px-10 xl:px-16">
          <span className="w-fit rounded-full border border-emerald-400/30 bg-emerald-500/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
            Plataforma Inteligente
          </span>

          <h2 className="mt-8 text-4xl font-bold leading-tight text-white xl:text-6xl">
            Deméter
            <br />
            <span className="text-emerald-400">Chuva & Safra</span>
          </h2>
        </div>

        <div className="absolute bottom-16 left-10 right-10 xl:bottom-20 xl:left-16 xl:right-16">
          <div className="border-l-2 border-emerald-400 pl-4">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              Descubra
            </span>

            <div className="relative mt-3 h-8 overflow-hidden">
              <p
                key={currentMessage}
                className="absolute w-full animate-slide-message text-lg font-medium text-emerald-300"
              >
                {messages[currentMessage]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="relative flex w-full items-center justify-center overflow-y-auto bg-white px-10 lg:py-16 transition-colors duration-300 lg:w-1/2 lg:px-10 dark:bg-[#0B120F]">
        <div className="absolute right-5 top-5 lg:right-8 lg:top-8">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-md lg:max-w-137.5 mt-12 lg:mt-0">
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
            Seja bem-vindo
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Entre com seus dados para acessar a plataforma.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 sm:space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                Email
              </label>

              <div className="group relative">
                <Mail className="absolute left-3 top-6 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-emerald-500" />

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@empresa.com"
                  autoComplete="email"
                  className="mt-1 h-10 border-zinc-300 bg-white pl-10 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500 dark:border-zinc-700 dark:bg-[#161D19] dark:text-white"
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                Senha
              </label>

              <div className="group relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-emerald-500" />

                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="mt-1 h-10 border-zinc-300 bg-white pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500 dark:border-zinc-700 dark:bg-[#161D19] dark:text-white"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-emerald-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {submitError && (
              <p className="text-center text-xs text-red-500">
                {submitError}
              </p>
            )}

            {/* Botão */}
            <Button
              type="submit"
              disabled={loading}
              className="mt-5 h-11 w-full bg-emerald-700 text-sm font-semibold text-white hover:bg-emerald-600 transition duration-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Divisor */}
            <div className="flex items-center gap-3 pt-1">
              <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />

              <span className="text-[11px] uppercase tracking-widest text-zinc-500">
                Ou continue com
              </span>

              <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
            </div>

            {/* Login Social */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                className="h-10 border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                <Globe className="mr-2 h-4 w-4" />
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-10 border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                <Building2 className="mr-2 h-4 w-4" />
                SSO
              </Button>
            </div>

            <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
              Não possui uma conta?{" "}
              <Link href="/register">
                <button
                  type="button"
                  className="font-medium text-emerald-500 hover:text-emerald-400 cursor-pointer"
                >
                  Criar uma
                </button>
              </Link>
            </p>
          </form>

          <div className="mt-1 flex justify-center text-center text-[11px] text-zinc-500 lg:mt-14 lg:justify-start">
            <span>© 2026 Deméter Chuva & Safra</span>
          </div>
        </div>
      </div>
    </div>
  );
}