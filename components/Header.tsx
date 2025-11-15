"use client";

import React from "react";
import Section from "./Section";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { id: "about", label: "A propos" },
  { id: "liens", label: "Liens" },
  { id: "videos-youtube", label: "YouTube" },
  { id: "formats", label: "Formats" },
  { id: "videos-tiktok", label: "TikTok" },
  { id: "founders", label: "Fondateurs" },
  { id: "stream", label: "Agenda" },
  { id: "campaign", label: "Campaign" },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur supports-[backdrop-filter]:bg-background/70 group">
      <Section className="flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <div className="text-lg font-extrabold text-foreground" style={{ fontFamily: "var(--font-barbra)" }}>
              SANS TRANSITION
            </div>
            <div className="text-xs text-muted-foreground -mt-0.5">media militant . pedagogique . engage</div>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-3 text-sm text-foreground/80">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 shadow-lg backdrop-blur">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="rounded-full px-3 py-1 hover:bg-white/20 focus:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="lg:hidden rounded-full border border-border p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span className="block h-0.5 w-5 bg-foreground mb-1" />
            <span className="block h-0.5 w-5 bg-foreground mb-1" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </button>
          <ThemeToggle />
          <Button
            asChild
            className="rounded-2xl font-bold text-white shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background [background:var(--grad-1)]"
          >
            <a href="https://www.helloasso.com/associations/sans-transition/formulaires/1" target="_blank" rel="noreferrer">
              Soutenir
            </a>
          </Button>
        </div>
      </Section>
      <div className="lg:hidden border-t border-border bg-background/70 backdrop-blur">
        {open && (
          <nav aria-label="Navigation mobile" className="mx-auto max-w-screen-xl px-4 py-4">
            <ul className="flex flex-col gap-2 text-sm text-foreground">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl border border-border bg-muted/60 px-3 py-2"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

