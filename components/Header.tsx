"use client";

import Section from "./Section";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { HeartHandshake } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <Section className="flex flex-col gap-2 py-3 md:grid md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="hidden text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:block">
          media militant . pedagogique . engage
        </div>

        <div className="flex w-full items-center justify-between md:hidden">
          <p
            className="text-xl font-extrabold tracking-[0.05em] text-foreground"
            style={{ fontFamily: "var(--font-barbra)" }}
          >
            SANS TRANSITION
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 p-0 text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
              aria-label="Soutenir Sans Transition"
            >
              <a href="https://www.helloasso.com/associations/sans-transition/formulaires/1" target="_blank" rel="noreferrer">
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="hidden items-center justify-center gap-3 md:flex">
          <p
            className="text-[2rem] font-extrabold tracking-[0.05em] text-foreground"
            style={{ fontFamily: "var(--font-barbra)" }}
          >
            SANS TRANSITION
          </p>
        </div>

        <div className="hidden items-center justify-end gap-2 md:flex">
          <ThemeToggle />
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
          >
            <a href="https://www.helloasso.com/associations/sans-transition/formulaires/1" target="_blank" rel="noreferrer">
              Soutenir
            </a>
          </Button>
        </div>

        <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground text-left md:hidden w-full">
          media militant . pedagogique . engage
        </div>
      </Section>
    </header>
  );
}
