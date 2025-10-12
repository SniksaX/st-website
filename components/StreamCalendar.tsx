"use client";

import React from "react";
import Section from "./Section";
import { Twitch } from "lucide-react";

type StreamItem = {
  time: string; // 24h, e.g. "08:00"
  title: string;
  desc: string;
  people?: string;
};

// Affichage lundi->dimanche, en mappant sur Date.getDay()
const WEEK = [
  { label: "Lun", day: 1 },
  { label: "Mar", day: 2 },
  { label: "Mer", day: 3 },
  { label: "Jeu", day: 4 },
  { label: "Ven", day: 5 },
  { label: "Sam", day: 6 },
  { label: "Dim", day: 0 },
] as const;

function dayItems(dayIdx: number): StreamItem[] {
  const items: StreamItem[] = [];
  // Matinale solo: Lun -> Ven à 09:00
  if (dayIdx >= 1 && dayIdx <= 5) {
    items.push({
      time: "09:00",
      title: "La TransMatinale",
      desc: "Revue de presse",
      people: "avec Hedji",
    });
  }
  // Mardi 20:00: Aktu avec Amandine & Lucho
  if (dayIdx === 2) {
    items.push({
      time: "20:00",
      title: "Aktu",
      people: "avec Hedji, Amandine & Lucho",
      desc: "Réaction à l'actu",
    });
  }
  // Vendredi 20:00: Ekip
  if (dayIdx === 5) {
    items.push({
      time: "20:00",
      title: "Ekip",
      desc: "Live chill, discussions, échanges avec la commu",
      people: "avec Hedji & l’équipe",
    });
  }
  return items;
}

export default function StreamCalendar() {
  const [today, setToday] = React.useState<number>(() => new Date().getDay());
  React.useEffect(() => {
    // Met à jour le jour courant côté client pour l'accent visuel
    const id = window.setInterval(() => setToday(new Date().getDay()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const minutesUntil = (time: string) => {
    const [h, m] = time.split(":").map((x) => parseInt(x, 10));
    const now = new Date();
    const target = new Date();
    target.setHours(h || 0, m || 0, 0, 0);
    return Math.round((target.getTime() - now.getTime()) / 60000);
  };

  return (
    <Section id="streams" className="py-14">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Calendrier des streams
        </h2>
        <a
          href="https://twitch.tv/sans_transition"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 h-9 text-sm text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <Twitch className="h-4 w-4" />
          <span>Suivre sur Twitch</span>
        </a>
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
        role="grid"
        aria-label="Calendrier hebdomadaire des lives"
      >
        {WEEK.map(({ label, day }) => {
          const items = dayItems(day);
          const isToday = day === today;
          return (
            <div
              key={label}
              role="row"
              className={
                "relative rounded-2xl border bg-white/[0.03] border-white/10 " +
                "shadow-[0_10px_30px_-20px_rgba(0,0,0,.8)] transition-transform duration-200 " +
                (isToday
                  ? "ring-2 ring-white/30 bg-white/[0.06] scale-[1.01]"
                  : "hover:ring-1 hover:ring-white/10")
              }
            >
              {isToday && (
                <div
                  className="absolute left-[6px] right-[6px] -top-[2px] h-[2px] [background:var(--grad-1)] rounded-t-2xl pointer-events-none"
                  aria-hidden
                />
              )}
              <div className="flex items-center justify-between px-4 pt-4">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-5 w-[3px] rounded-full [background:var(--grad-1)]"
                  />
                  <h3 className="text-sm font-semibold tracking-tight text-white">
                    {label}
                  </h3>
                </div>
                {isToday && (
                  <span className="text-[11px] rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-white/90">
                    Aujourd'hui
                  </span>
                )}
              </div>

              <div className="px-4 pb-4 pt-3 space-y-2">
                {items.length === 0 ? (
                  <p className="text-sm text-white/60">— Pas de live prévu</p>
                ) : (
                  items.map((it, i) => {
                    const soon = isToday && minutesUntil(it.time) >= 0 && minutesUntil(it.time) <= 60;
                    return (
                      <div
                        key={`${label}-${i}-${it.time}`}
                        className={
                          "rounded-xl border p-2.5 backdrop-blur " +
                          (soon ? "border-white/20 bg-white/10" : "border-white/10 bg-black/40")
                        }
                      >
                        <div className="flex flex-col gap-1.5">
                          <time
                            dateTime={it.time}
                            className="self-start inline-flex h-7 items-center justify-center whitespace-nowrap rounded-full border border-white/10 bg-white/10 px-2 text-[11px] font-semibold text-white/90"
                            aria-label={`Heure du live ${it.time}`}
                          >
                            {it.time}
                          </time>
                          <div>
                            <p className="text-[12px] font-semibold text-white">
                              {it.title}
                            </p>
                            {soon && (
                              <span className="mt-0.5 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/15 px-2 py-0.5 text-[10px] text-white/90">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
                                En direct bientôt
                              </span>
                            )}
                            {it.people && (
                              <p className="mt-1 text-[10px] text-white/75 italic">{it.people}</p>
                            )}
                            <p className="mt-1 text-[11px] text-white/80">{it.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-white/60">
        • La TransMatinale (lun–ven, 09:00) — revue de presse. • Aktu (mardi, 20:00) — réaction à l'actu avec Amandine & Lucho. • Ekip (vendredi, 20:00) — live chill avec la commu.
      </p>
    </Section>
  );
}
