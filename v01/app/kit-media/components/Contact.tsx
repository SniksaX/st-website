import Link from "next/link";
import Section from "@/components/Section";
import SectionHeader from "./SectionHeader";
import { KIT_PDF, SOCIALS } from "../constants";
import { FileText, ExternalLink, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <Section>
        <SectionHeader title="Contacts presse" subtitle="Mail & réseaux" />
        <div className="flex flex-wrap gap-3">
          {/* bouton mailto ajouté */}
          <a
            href="mailto:contact@sanstransition.fr?subject=Demande%20presse%20Sans%20Transition"
            className="inline-flex items-center gap-2 rounded-xl bg-white text-neutral-900 px-4 h-10 font-semibold hover:bg-neutral-100 shadow"
          >
            <Mail className="size-4" /> Écrire à l’équipe
          </a>

          <Link
            href={KIT_PDF}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 h-10 font-medium hover:bg-white/10"
          >
            <FileText className="size-4" /> Ouvrir le kit (PDF)
          </Link>

          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 h-10 font-medium hover:bg-white/10"
            >
              <ExternalLink className="size-4" /> {s.label}
            </a>
          ))}
        </div>
      </Section>
    </section>
  );
}
