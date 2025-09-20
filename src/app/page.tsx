'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Formats from '@/components/Formats';
import VideosYouTube from '@/components/VideosYouTube';
import VideosTikTok from '@/components/VideosTikTok';
import Links from '@/components/Links';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  // ✅ le hook est maintenant DANS le composant
  useEffect(() => {
    const required = ['formats', 'videos-youtube', 'videos-tiktok', 'liens', 'contact'];
    const missing = required.filter((id) => !document.getElementById(id));
    if (missing.length) console.error('Smoke test failed: missing sections:', missing);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-neutral-800">
      <Header />
      <Hero />
      <Separator className="bg-neutral-900" />
      <Links />
      <Separator className="bg-neutral-900" />
      <VideosYouTube />
      <Separator className="bg-neutral-900" />
      <Formats />
      <Separator className="bg-neutral-900" />
      <VideosTikTok />
      <Footer />
    </div>
  );
}
