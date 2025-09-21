'use client';
import React from 'react';
import Section from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, MessageSquare, BookOpen, Mic2, Newspaper, PersonStanding } from 'lucide-react';
import { Landmark, LibraryBig, Venus, Users } from "lucide-react";
import { ShinyCard } from './ShinyCard';
import GLI from "@/components/GradientLinkIcon";

export default function Formats() {
  const items = [
    { title: 'Fokus', desc: 'Zoom radical sur une actu ou une figure…', icon: Camera },
    { title: 'Hédito', desc: 'Le coup de gueule perso…', icon: MessageSquare },
    { title: "L'Œil d'Amandine", desc: "Lecture féministe de l'actu…", icon: Venus },
    { title: "L'Œil de Lucho", desc: 'Rappels historiques…', icon: Landmark },
    { title: 'Interviews', desc: 'On se pose et on écoute', icon: Users },
    { title: 'Mikro', desc: 'On tend le Mikro', icon: Mic2 },
  ];

  return (
    <Section id="formats" className="py-14">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Nos formats</h2>
        <span className="text-xs text-neutral-300">structure claire • gimmicks assumés</span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(({ title, desc, icon: Icon }) => (
          <ShinyCard key={title} className="bg-neutral-950 border-neutral-800 rounded-3xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                
                <div className="h-9 w-9 rounded-2xl bg-neutral-900 grid place-items-center p-[2px]">
                  <GLI
                    icon={Icon}
                    className="h-[18px] w-[18px]"
                    shrink={Icon === Venus || Icon === Landmark ? 0.9 : 1}
                  />
                </div>
                <CardTitle className="tracking-tight text-white">{title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-200 text-sm leading-relaxed">{desc}</p>
            </CardContent>
          </ShinyCard>
        ))}
      </div>
    </Section>
  );
}
