"use client";

import { Sunrise, Sunset } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="hover:cursor-pointer"
    >
      {theme === "light" ? (
        <Sunset className="size-5" />
      ) : (
        <Sunrise className="size-5" />
      )}
    </Button>
  );
}
