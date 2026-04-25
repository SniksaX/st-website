import Section from "@/components/Section";
import SectionHeader from "./SectionHeader";
import { COLOR_VARS } from "../constants";

export default function Colors() {
  return (
    <section id="couleurs" className="scroll-mt-24">
      <Section>
        <SectionHeader title="Couleurs" subtitle="Aperçu rapide" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLOR_VARS.map((c) => (
            <div key={c.cssVar} className="rounded-2xl border border-white/10 p-4 bg-white/[0.03]">
              <div
                className="h-16 rounded-xl"
                style={{ background: c.isGradient ? "var(--grad-1)" : `var(${c.cssVar})` }}
              />
              <p className="mt-3 text-sm text-white/85">{c.name}</p>
              <p className="text-xs text-white/60">{c.isGradient ? "var(--grad-1)" : c.cssVar}</p>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
