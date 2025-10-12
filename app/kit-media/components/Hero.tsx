import Section from "@/components/Section";
import { Download, Mail } from "lucide-react";
import Link from "next/link";
import GradientTitle from "./GradientTitle";

const KIT_PDF = "/Sans%20Transition%20%E2%80%93%20Kit%20M%C3%A9dia%20Septembre%202025.pdf";

export default function Hero() {
  return (
    <section className="relative border-b border-white/10 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full blur-3xl opacity-20"
        style={{ background: "var(--grad-1)" }}
      />
      <Section className="py-16 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-white/60">Kit média officiel</p>
        <GradientTitle level={1}>Sans Transition</GradientTitle>
        <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">
          Logos, éléments de marque, photos presse et dossier complet — prêts à l’emploi, sans friction.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href={KIT_PDF}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-white text-neutral-900 px-5 h-11 inline-flex items-center gap-2 font-semibold shadow hover:bg-neutral-100"
          >
            <Download className="size-4" /> Télécharger le kit (PDF)
          </Link>
          <a
            href="mailto:contact@sanstransition.fr"
            className="rounded-2xl border border-white/15 bg-white/5 text-white px-5 h-11 inline-flex items-center gap-2 font-medium hover:bg-white/10"
          >
            <Mail className="size-4" /> Contacter l’équipe
          </a>
        </div>
      </Section>
    </section>
  );
}
