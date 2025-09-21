'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Formats from '@/components/Formats';
import VideosYouTube from '@/components/VideosYouTube';
import VideosTikTok from '@/components/VideosTikTok';
import Links from '@/components/Links';
import Footer from '@/components/Footer';
import About from '@/components/About';
import { Separator } from '@/components/ui/separator';
import { BackdropParallax } from '@/components/ScrollFx';

export default function Page() {
  useEffect(() => {
    const required = ['formats', 'videos-youtube', 'videos-tiktok', 'liens', 'contact'];
    const missing = required.filter((id) => !document.getElementById(id));
    if (missing.length) console.error('Smoke test failed: missing sections:', missing);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-neutral-800">
      {/* background animé (asymétrique) */}
      <BackdropParallax />

      <Header />

      {/* Hero sans reveal (il est déjà animé) */}
      <Hero />

      <Separator className="bg-neutral-900" />

      {/* Sections sans <Reveal> wrappers */}
      <Links />

      <Separator className="bg-neutral-900" />

      <VideosYouTube />

      <Separator className="bg-neutral-900" />

      <Formats />

      <Separator className="bg-neutral-900" />

      <VideosTikTok />

      <Separator className="bg-neutral-900" />

      <About />

      <Footer />
    </div>
  );
}
