'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, MessageSquare, Mic2, Landmark, Venus, Users, type LucideIcon } from 'lucide-react';
import { ShinyCard } from '@/components/ShinyCard';

// Tous les variants mènent au même rendu (transparent + même bordure)
// et les icônes utilisent la couleur "normale" (currentColor), sans gradient.

type Variant = 'featured' | 'default' | 'subtle';

type FormatCardProps = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  className?: string;
  variant?: Variant;
};

function FormatCard({ title, desc, Icon, className = '' }: FormatCardProps) {
  // Couleur unifiée + transparent
  const baseCardClass = 'h-full rounded-3xl bg-transparent border border-border';

  return (
    <ShinyCard className={`${baseCardClass} ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          {/* Icône en couleur normale (currentColor), pas de gradient */}
          <div className="h-9 w-9 rounded-2xl grid place-items-center">
            <Icon className="h-[18px] w-[18px] text-foreground" strokeWidth={1.75} />
          </div>
          <CardTitle className="tracking-tight text-foreground">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
      </CardContent>
    </ShinyCard>
  );
}

type Item = {
  key: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  row: 1 | 2;
  cols: string;
  height?: string;
  variant?: Variant;
};

const ITEMS: Item[] = [
  { key: 'fokus', title: 'Fokus', desc: 'Zoom radical sur une actu ou une figure, avec une structure qui claque, développée sur mesure.', icon: Camera, row: 1, cols: 'col-span-10 md:col-span-6 lg:col-span-5', height: 'lg:h-40', variant: 'featured' },
  { key: 'hedito', title: 'Hédito', desc: 'Le coup de gueule perso, où les émotions sont au rendez-vous.', icon: MessageSquare, row: 1, cols: 'col-span-6 md:col-span-6 lg:col-span-4', height: 'lg:h-40', variant: 'subtle' },
  { key: 'oda', title: "L'Œil d'Amandine", desc: "Lecture féministe de l'actu pointue et intersectionnelle.", icon: Venus, row: 1, cols: 'col-span-6 md:col-span-6 lg:col-span-3', height: 'lg:h-40', variant: 'default' },
  { key: 'odl', title: "L'Œil de Lucho", desc: "Voir l'actu à travers une lecture historique.", icon: Landmark, row: 2, cols: 'col-span-6 md:col-span-4 lg:col-span-3', height: 'lg:h-40', variant: 'default' },
  { key: 'itw', title: 'Interviews', desc: "On se pose et on écoute des personnalités à qui on ne donne pas la parole – pour enfin entendre ce qu'iels ont à dire.", icon: Users, row: 2, cols: 'col-span-12 md:col-span-8 lg:col-span-7', height: 'lg:h-40', variant: 'featured' },
  { key: 'mikro', title: 'Mikro', desc: 'On tend le Mikro.', icon: Mic2, row: 2, cols: 'col-span-6 md:col-span-6 lg:col-span-2', height: 'lg:h-40', variant: 'subtle' },
];

const MOBILE_ORDER: Array<Item['key']> = ['fokus', 'oda', 'odl', 'itw', 'hedito', 'mikro'];

export default function Formats() {
  return (
    <Section id="formats" className="py-14">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Nos formats</h2>
        <span className="text-xs text-muted-foreground">structure claire • formats militants</span>
      </div>

      {/* Mobile: cartes complètes, 1 par ligne, ordre spécifique */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {([...ITEMS]
          .sort((a, b) => MOBILE_ORDER.indexOf(a.key) - MOBILE_ORDER.indexOf(b.key)) as Item[])
          .map(({ key, title, desc, icon, height }) => {
            const card = (
              <FormatCard title={title} desc={desc} Icon={icon} className={height ? height : 'h-auto'} />
            );
            return (
              <div key={key}>{card}</div>
            );
          })}
      </div>

      {/* Tablet / Desktop: layout asymétrique */}
      <div className="hidden md:block">
        {[1, 2].map((row, idx) => (
          <div key={row} className={`grid grid-cols-12 gap-5 ${idx === 0 ? 'mb-5' : ''}`}>
            {ITEMS.filter((it) => it.row === row).map(({ key, title, desc, icon, cols, height }) => {
              const card = <FormatCard title={title} desc={desc} Icon={icon} className={height} />;
              return (
                <motion.div key={key} whileHover={{ y: -2 }} className={cols}>
                  {/* Plus de bordures/gradients spéciaux : toutes les cartes sont identiques */}
                  {card}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </Section>
  );
}
