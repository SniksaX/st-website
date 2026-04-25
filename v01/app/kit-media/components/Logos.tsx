import Image from "next/image";
import Section from "@/components/Section";
import SectionHeader from "./SectionHeader";
import { LOGOS } from "../constants";

export default function Logos() {
  return (
    <section id="logos" className="scroll-mt-24">
      <Section>
        <SectionHeader title="Logos" subtitle="PNG optimisés • fond transparent" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LOGOS.map((a) => (
            <div key={a.src} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="relative mx-auto aspect-[3/1] max-w-[420px]">
                <Image
                  src={a.src}
                  alt={a.label}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-white/85">{a.label}</p>
                <a href={a.src} download className="text-sm underline underline-offset-4 hover:text-white">
                  Télécharger
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
