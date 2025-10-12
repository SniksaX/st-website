import Image from "next/image";
import Link from "next/link";
import Section from "@/components/Section";
import SectionHeader from "./SectionHeader";
import { TEAM } from "../constants";
import { Download, ExternalLink } from "lucide-react";

export default function PressPhotos() {
  return (
    <section id="presse" className="scroll-mt-24">
      <Section>
        <SectionHeader title="Photos presse" subtitle="Utilisables avec crédit « Sans Transition »" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((p) => (
            <article key={p.src} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <div className="relative w-full aspect-square bg-black/40">
                <Image src={p.src} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 360px" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{p.name}</p>
                  <p className="text-xs text-white/70">{p.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={p.file}
                    download
                    className="inline-flex items-center gap-1 text-sm rounded-lg border border-white/15 bg-white/5 px-3 h-9 hover:bg-white/10"
                  >
                    <Download className="size-4" /> Télécharger
                  </a>
                  <Link
                    href={p.file}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-sm rounded-lg border border-white/15 bg-white/5 px-3 h-9 hover:bg-white/10"
                  >
                    <ExternalLink className="size-4" /> Voir
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </section>
  );
}
