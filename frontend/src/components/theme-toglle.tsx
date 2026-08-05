"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <Toggle
  pressed={isDark}
  onPressedChange={() => setTheme(isDark ? "light" : "dark")}
  aria-label="Alternar tema"
  className="
    bg-background
    hover:bg-transparent
    hover:text-accent-foreground
    transition-colors
  "
>
  {isDark ? (
    <Sun className="h-4 w-4 text-white" />
  ) : (
    <Moon className="h-4 w-4 text-black" />
  )}
</Toggle>
  );
}