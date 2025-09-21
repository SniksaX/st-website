'use client';
import React from 'react';
import Section from './Section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, HeartHandshake } from 'lucide-react';

export default function Contact() {
  return (
    <Section id="contact" className="py-14">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Contact</h2>
        <span className="text-xs text-neutral-300">presse • invité·es • partenaires</span>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-950 border-neutral-900 rounded-3xl">
          <CardHeader><CardTitle className="tracking-tight text-white">Écrire à l&apos;équipe</CardTitle></CardHeader>
          <CardContent>
            <form className="grid gap-3">
              <Input placeholder="Nom" className="rounded-2xl bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500" />
              <Input type="email" placeholder="Email" className="rounded-2xl bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500" />
              <Textarea placeholder="Message" rows={5} className="rounded-2xl bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500" />
              <Button type="submit" className="rounded-2xl font-semibold">Envoyer <Mail className="ml-2 h-4 w-4" /></Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-neutral-950 border-neutral-900 rounded-3xl">
          <CardHeader><CardTitle className="tracking-tight text-white">Kit presse & soutien</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-neutral-200 text-sm">Télécharge logo/charte/photos. Soutiens le média si tu peux.</p>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl border-neutral-800 text-white">Télécharger le kit</Button>
              <Button className="rounded-2xl font-semibold">Faire un don <HeartHandshake className="ml-2 h-4 w-4" /></Button>
            </div>
            <div className="text-sm text-neutral-300 space-y-1">
              <p><strong>Assoc loi 1901</strong> • Sans Transition</p>
              <p>Handles : @sanstransition (TikTok), @SansTransitionMedia (YouTube)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
