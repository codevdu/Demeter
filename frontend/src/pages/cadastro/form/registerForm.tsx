"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  EyeOff,
  User,
  Mail,
  Lock,
  Eye,
  ArrowRight,
  Building2,
  Tractor,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toglle";
import Link from "next/link";
import { registerUser } from "@/services/auth-service";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
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

  const handleNomeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = e.target.value;

    // Permite somente letras, acentos e espaços
    const somenteLetras = valor.replace(
      /[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g,
      ""
    );

    setNome(somenteLetras);
  };

  const handleSobrenomeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = e.target.value;

    // Permite somente letras, acentos e espaços
    const somenteLetras = valor.replace(
      /[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g,
      ""
    );

    setSobrenome(somenteLetras);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = e.target.value;

    setEmail(valor);

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

    if (!emailValido && valor.length > 0) {
      setEmailError(
        "Digite um e-mail válido. Ex: email@empresa.com"
      );
    } else {
      setEmailError("");
    }
  };

  const handleDocumentoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = e.target.value;

    const somenteNumeros = valor.replace(/\D/g, "");
    setDocumento(somenteNumeros.slice(0, 14));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitError("");

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      setEmailError(
        "Digite um e-mail válido. Ex: email@empresa.com"
      );

      return;
    }

    if (documento.length !== 11 && documento.length !== 14) {
      setSubmitError("Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.");
      return;
    }

    // concatena nome + sobrenome, removendo espaços duplicados nas bordas/meio
    const nomeCompleto = `${nome} ${sobrenome}`
      .trim()
      .replace(/\s+/g, " ");

    setLoading(true);

    try {
      await registerUser({
        name: nomeCompleto,
        email,
        cpfCnpj: documento,
        password,
      });

      router.push("/produtor");
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
      <div className="absolute left-5 top-5 z-50 flex h-7 w-7 items-center justify-center rounded-md p-1 md:h-8 md:w-8 md:bg-[#10B981] lg:left-10 lg:top-8 lg:h-10 lg:w-10">
        <Tractor className="text-black dark:text-white lg:text-white" />
      </div>

      <div className="relative hidden w-1/2 overflow-hidden md:block">
        <Image
          width={1080}
          height={1080}
          loading="eager"
          src="https://images.pexels.com/photos/13860040/pexels-photo-13860040.jpeg"
          alt="Deméter"
          className="h-screen w-full object-cover"
        />

        <div className="absolute inset-0 dark:bg-black/25" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.45),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.75),transparent_45%)]" />

        <div className="absolute inset-0 flex flex-col justify-center px-10 xl:px-16">
          <span className="w-fit rounded-full border border-emerald-400/30 bg-emerald-500/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
            Plataforma Inteligente
          </span>

          <h2 className="mt-8 text-4xl font-bold leading-tight text-white xl:text-6xl">
            Deméter
            <br />
            <span className="text-emerald-400">
              Chuva & Safra
            </span>
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

      <div className="relative flex w-full items-center justify-center overflow-y-auto bg-white px-10 transition-colors duration-300 lg:w-1/2 lg:px-10 lg:py-16 dark:bg-[#0B120F]">
        {/* Tema */}
        <div className="absolute right-5 top-5 lg:right-8 lg:top-8">
          <ThemeToggle />
        </div>

        <div className="mt-12 flex w-full max-w-md flex-col lg:mt-0 lg:max-w-137.5">
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
            Seja bem-vindo
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Registre seus dados para ter o acesso liberado
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4 sm:space-y-5"
          >
            <div className="flex gap-4">
              {/* Nome */}
              <div className="w-full space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                  Nome
                </label>

                <div className="group relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-emerald-500" />

                  <Input
                    type="text"
                    value={nome}
                    onChange={handleNomeChange}
                    placeholder="Seu nome"
                    autoComplete="given-name"
                    className="mt-1 h-10 border-zinc-300 bg-white pl-10 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500 dark:border-zinc-700 dark:bg-[#161D19] dark:text-white"
                  />
                </div>
              </div>

              {/* Sobrenome */}
              <div className="w-full space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                  Sobrenome
                </label>

                <div className="group relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-emerald-500" />

                  <Input
                    type="text"
                    value={sobrenome}
                    onChange={handleSobrenomeChange}
                    placeholder="Seu sobrenome"
                    autoComplete="family-name"
                    className="mt-1 h-10 border-zinc-300 bg-white pl-10 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500 dark:border-zinc-700 dark:bg-[#161D19] dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                Email
              </label>
              <div className="group relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-emerald-500" />
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="email@empresa.com"
                  autoComplete="email"
                  className={`mt-1 h-10 border bg-white pl-10 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:ring-2 dark:bg-[#161D19] dark:text-white ${
                    emailError
                      ? "border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/20 dark:border-red-500/70"
                      : "border-zinc-300/80 focus-visible:border-emerald-500/70 focus-visible:ring-emerald-500/20 dark:border-zinc-700/60"
                  }`}
                />
              </div>

              {emailError && (
                <p className="text-xs text-red-500">
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                CPF ou CNPJ
              </label>

              <div className="group relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-emerald-500" />

                <Input
                  type="text"
                  inputMode="numeric"
                  value={documento}
                  onChange={handleDocumentoChange}
                  placeholder="Digite CPF ou CNPJ"
                  maxLength={14}
                  className="mt-1 h-10 border border-zinc-300/80 bg-white pl-10 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:border-emerald-500/70 focus-visible:ring-2 focus-visible:ring-emerald-500/20 dark:border-zinc-700/60 dark:bg-[#161D19] dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                Senha
              </label>

              <div className="group relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-emerald-500" />

                <Input
                  type={
                    showPassword ? "text" : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="mt-1 h-10 border-zinc-300 bg-white pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500 dark:border-zinc-700 dark:bg-[#161D19] dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
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

            <Button
              type="submit"
              disabled={loading}
              className="mt-5 h-11 w-full bg-emerald-700 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Criando conta..." : "Criar conta"}

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="cursor-pointer font-medium text-emerald-500 hover:text-emerald-400"
              >
                Entrar
              </Link>
            </p>
          </form>

          {/* <div className="mt-1 flex justify-center text-center text-[11px] text-zinc-500 lg:mt-14 lg:justify-start">
            <span>
              © 2026 Deméter Chuva & Safra
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}