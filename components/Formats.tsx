'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, MessageSquare, Mic2, Landmark, Venus, Users, type LucideIcon } from 'lucide-react';
import { ShinyCard } from '@/components/ShinyCard';
import GLI from '@/components/GradientLinkIcon';

type Variant = 'featured' | 'default' | 'subtle';

type FormatCardProps = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  className?: string;
  variant?: Variant;
};

function FormatCard({ title, desc, Icon, className = '', variant = 'default' }: FormatCardProps) {
  // styles inspirés de Links
  const variantClass =
    variant === 'subtle'
      ? 'bg-white/5 border-white/10 backdrop-blur-md'
      : variant === 'featured'
      ? 'bg-neutral-950/90 border-neutral-900'
      : 'bg-neutral-950/95 border-neutral-800';

  return (
    <ShinyCard className={`h-full rounded-3xl ${variantClass} ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-2xl grid place-items-center p-[2px] ${variant === 'subtle' ? 'bg-white/10' : 'bg-neutral-900'}`}>
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
        <p className={`text-sm leading-relaxed ${variant === 'subtle' ? 'text-neutral-300/90' : 'text-neutral-300'}`}>{desc}</p>
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
  // Row 1
  {
    key: 'fokus',
    title: 'Fokus',
    desc: 'Zoom radical sur une actu ou une figure, avec une structure qui claque, développée sur mesure.',
    icon: Camera,
    row: 1,
    cols: 'col-span-10 md:col-span-6 lg:col-span-5',
    height: 'lg:h-40',
    variant: 'featured', // ⭐ en avant
  },
  {
    key: 'hedito',
    title: 'Hédito',
    desc: 'Le coup de gueule perso, où les émotions sont au rendez-vous.',
    icon: MessageSquare,
    row: 1,
    cols: 'col-span-6 md:col-span-6 lg:col-span-4',
    height: 'lg:h-40',
    variant: 'subtle', // 🫥 transparence comme Links
  },
  {
    key: 'oda',
    title: "L'Œil d'Amandine",
    desc: "Lecture féministe de l'actu pointue et intersectionnelle.",
    icon: Venus,
    row: 1,
    cols: 'col-span-6 md:col-span-6 lg:col-span-3',
    height: 'lg:h-40', // tu peux mettre lg:h-32 si tu veux plus compact
    variant: 'default',
  },

  // Row 2
  {
    key: 'odl',
    title: "L'Œil de Lucho",
    desc: "Voir l'actu à travers une lecture historique.",
    icon: Landmark,
    row: 2,
    cols: 'col-span-6 md:col-span-4 lg:col-span-3',
    height: 'lg:h-40',
    variant: 'default',
  },
  {
    key: 'itw',
    title: 'Interviews',
    desc: "On se pose et on écoute des personnalités à qui on ne donne pas la parole – pour enfin entendre ce qu'iels ont à dire.",
    icon: Users,
    row: 2,
    cols: 'col-span-12 md:col-span-8 lg:col-span-7',
    height: 'lg:h-40',
    variant: 'featured', // ⭐ en avant
  },
  {
    key: 'mikro',
    title: 'Mikro',
    desc: 'On tend le Mikro.',
    icon: Mic2,
    row: 2,
    cols: 'col-span-6 md:col-span-6 lg:col-span-2',
    height: 'lg:h-40',
    variant: 'subtle', // 🫥 transparence comme Links
  },
];

export default function Formats() {
  return (
    <Section id="formats" className="py-14">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Nos formats</h2>
        <span className="text-xs text-neutral-300">structure claire • formats militants</span>
      </div>

      {[1, 2].map((row, idx) => (
        <div key={row} className={`grid grid-cols-12 gap-5 ${idx === 0 ? 'mb-5' : ''}`}>
          {ITEMS.filter((it) => it.row === row).map(({ key, title, desc, icon, cols, height, variant }) => {
            const card = <FormatCard title={title} desc={desc} Icon={icon} className={height} variant={variant} />;

            // featured → wrapper dégradé (comme Cagnottes de Links)
            return (
              <motion.div key={key} whileHover={{ y: -2 }} className={cols}>
                {variant === 'featured' ? (
                  <div className="h-full rounded-3xl p-[1px] bg-gradient-to-br from-pink-600/60 via-fuchsia-600/40 to-indigo-600/60">
                    {card}
                  </div>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </Section>
  );
}
