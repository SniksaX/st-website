'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, MessageSquare, Mic2, Landmark, Venus, Users, type LucideIcon } from 'lucide-react';
import { ShinyCard } from '@/components/ShinyCard';
import GLI from '@/components/GradientLinkIcon';

// TWO ROWS (IRREGULAR) WITH CONTROLLED HEIGHTS AT LG+
// Row 1 (lg): Fokus(6) • Hédito(3) • ODA(3@short)
// Row 2 (lg): Interviews(7) • ODL(3) • Mikro(2) — same height; Mikro lifted
// On mobile/tablet heights auto; on lg we force consistent visual rhythm

type FormatCardProps = {
  title: string;
  desc: string;
  Icon: LucideIcon; // precise type = no ts-ignore
  className?: string;
};

function FormatCard({ title, desc, Icon, className = '' }: FormatCardProps) {
  return (
    <ShinyCard className={`h-full rounded-3xl bg-neutral-950/95 border-neutral-800 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-neutral-900 grid place-items-center p-[2px]">
            <GLI
              icon={Icon}
              className="h-[18px] w-[18px]"
              shrink={Icon === Venus || Icon === Landmark ? 0.9 : 1}
              strokeWidth={Icon === Venus || Icon === Landmark ? 1.6 : 1.75}
            />
          </div>
          <CardTitle className="tracking-tight text-white">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-neutral-300 text-sm leading-relaxed line-clamp-3">{desc}</p>
      </CardContent>
    </ShinyCard>
  );
}

export default function Formats() {
  return (
    <Section id="formats" className="py-14">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Nos formats</h2>
        <span className="text-xs text-neutral-300">structure claire • gimmicks assumés</span>
      </div>

      {/* ROW 1 */}
      <div className="grid grid-cols-12 gap-5 mb-5">
        <motion.div whileHover={{ y: -2 }} className="col-span-12 md:col-span-6 lg:col-span-6">
          <FormatCard title="Fokus" desc="Zoom radical sur une actu ou une figure…" Icon={Camera} className="lg:h-40" />
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="col-span-6 md:col-span-6 lg:col-span-3">
          <FormatCard title="Hédito" desc="Le coup de gueule perso…" Icon={MessageSquare} className="lg:h-40" />
        </motion.div>
        {/* ODA shorter height at lg */}
        <motion.div whileHover={{ y: -2 }} className="col-span-6 md:col-span-6 lg:col-span-3">
          <FormatCard title="L'Œil d'Amandine" desc="Lecture féministe de l'actu…" Icon={Venus} className="lg:h-40" />
        </motion.div>
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-12 gap-5">
        {/* Same height for all three at lg */}
        <motion.div whileHover={{ y: -2 }} className="col-span-12 md:col-span-8 lg:col-span-7">
          <FormatCard title="Interviews" desc="On se pose et on écoute" Icon={Users} className="lg:h-40" />
        </motion.div>
        <motion.div whileHover={{ y: -2 }} className="col-span-6 md:col-span-4 lg:col-span-3">
          <FormatCard title="L'Œil de Lucho" desc="Rappels historiques…" Icon={Landmark} className="lg:h-40" />
        </motion.div>
        {/* Mikro lifted further up with valid Tailwind height class */}
        <motion.div whileHover={{ y: -2 }} className="col-span-6 md:col-span-6 lg:col-span-2 relative z-[1]">
          <FormatCard title="Mikro" desc="On tend le Mikro" Icon={Mic2} className="lg:h-40" />
        </motion.div>
      </div>
    </Section>
  );
}
