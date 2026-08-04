"use client";

import { useEffect, useState } from "react";
import { Mail, Lock, Eye, ArrowRight, Globe, Building2, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toglle";

export default function LoginForm() {
  const messages = [
    "Monitore dados climáticos em tempo real.",
    "Acompanhe indicadores agrícolas de todas as regiões.",
    "Visualize mapas, gráficos e estatísticas.",
    "Transforme dados em decisões inteligentes.",
    "Bem-vindo ao Chuva e Safra.",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex h-screen">
      <div className="dark:text-black absolute flex items-center justify-center w-10 h-10 ml-16 mt-10 rounded-md bg-[#10B981] z-50">
        <Tractor />
      </div>
      {/* Imagem do lado esquerdo da tela */}
      <div className="relative w-1/2 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/13860040/pexels-photo-13860040.jpeg"
          alt="Login"
          className="h-full w-full object-cover"
        />

        {/* Escurece a imagem no canto superior */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.75),transparent_45%)]" />

        {/* Animação com um texto sobre o projeto */}
        <div className="absolute -mt-48 inset-0 flex flex-col justify-center px-16">
          <span className="w-fit rounded-full border border-emerald-400/30 bg-emerald-500/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
            Plataforma Inteligente
          </span>

          <h2 className="mt-8 text-6xl font-bold leading-tight text-white">
            Deméter
            <br />
            <span className="text-emerald-400">Chuva & Safra</span>
          </h2>
        </div>

        {/* Animação da esquerda */}
        <div className="absolute bottom-20 left-16 right-16">
          <div className="border-l-2 border-emerald-400 pl-4">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              Descubra
            </span>

            <div className="relative mt-3 h-8 overflow-hidden">
              <p
                key={currentMessage}
                className="absolute w-full text-lg font-medium text-emerald-300 animate-slide-message"
              >
                {messages[currentMessage]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex w-1/2 items-center justify-center bg-[#0B120F] px-8">
        <div className="w-full max-w-[550px]">
          <h1 className="text-3xl font-bold text-white">Seja bem-vindo</h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Entre com seus dados para acessar a plataforma.
          </p>

          <form className="mt-8 space-y-5">
            {/* Input de Email -> Adicionar validação */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Email
              </label>

              <div className="group relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors duration-200 group-focus-within:text-emerald-500" />

                <Input
                  type="email"
                  placeholder="email@empresa.com"
                  className="mt-1 h-10 border-zinc-700 bg-[#161D19] pl-10 text-sm text-white placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500"
                />
              </div>
            </div>

            {/* Input da senha -> Adicionar validação  */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Senha
                </label>
              </div>

              <div className="group relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors duration-200 group-focus-within:text-emerald-500" />

                <Input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 h-10 border-zinc-700 bg-[#161D19] pl-10 text-sm text-white placeholder:text-zinc-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500"

                />

                <Eye className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-500 transition-colors duration-200 group-focus-within:text-emerald-500" />
              </div>
            </div>

            {/* Região */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Região
              </label>

              {/* Dados mockados mas é pra implementar assim que tiver como */}
              <select className="h-10 w-full rounded-md border border-zinc-700 bg-[#161D19] px-3 text-sm text-white outline-none focus:border-emerald-500">
                <option value="">Selecione uma região</option>
                <option value="norte">Norte</option>
                <option value="nordeste">Nordeste</option>
                <option value="centro-oeste">Centro-Oeste</option>
                <option value="sudeste">Sudeste</option>
                <option value="sul">Sul</option>
              </select>
            </div>

            {/* Botão */}
            <Button className="h-11 w-full mt-5 bg-emerald-500 text-sm font-semibold text-black hover:bg-emerald-400">
              Entrar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Divisor */}
            <div className="flex items-center gap-3 mt-1">
              <div className="h-px flex-1 bg-zinc-700" />

              <span className="text-[11px] uppercase tracking-widest text-zinc-500">
                Ou continue com
              </span>

              <div className="h-px flex-1 bg-zinc-700" />
            </div>

            {/* Login Social */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-10 border-zinc-700 bg-transparent text-sm text-zinc-300 hover:bg-zinc-900"
              >
                <Globe className="mr-2 h-4 w-4" />
                Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-10 border-zinc-700 bg-transparent text-sm text-zinc-300 hover:bg-zinc-900"
              >
                <Building2 className="mr-2 h-4 w-4" />
                SSO
              </Button>
            </div>

            {/* Cadastro */}
            <p className="text-center text-xs text-zinc-400">
              Não possui uma conta?{" "}
              <button
                type="button"
                className="font-medium cursor-pointer text-emerald-400 hover:text-emerald-300"
              >
                Criar uma
              </button>
            </p>
          </form>

          {/* Rodapé */}
          <div className="mt-12 flex items-center justify-between text-[11px] text-zinc-500">
            <span>© 2026 Deméter chuva e Safra</span>

            <div className="flex gap-4">
              <button type="button">Privacidade</button>
              <button type="button">Termos</button>
              <button type="button">Status</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
