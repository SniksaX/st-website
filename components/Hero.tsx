"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FacesMosaic from "@/components/FacesMosaic";

/**
 * Hero — titre principal en Barbra, sous-titre en Orbitron.
 * Large container, typographie différenciée pour un rendu signature ST.
 */
export default function HeroFontsBarbraOrbitron() {
  const scrollToNext = React.useCallback(() => {
    const next = document.getElementById("liens");
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden px-8 pb-20 sm:px-20 lg:px-32 xl:px-48">
      {/* Halo doux */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -z-20 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,77,216,0.25),transparent_70%)] blur-[120px]"
      />

      {/* Mosaïque de visages en arrière-plan */}
      <div aria-hidden className="absolute inset-0 -z-10 select-none">
        <div className="absolute inset-x-[-12vw] top-0">
          <div className="mx-auto w-full max-w-[120rem] px-6 opacity-45">
            <FacesMosaic fileUrl="/json_don.txt" variant="background" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      {/* Content wrapper */}
      <div className="relative flex flex-col gap-10 max-w-[120rem]">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold leading-[0.95] tracking-tight text-foreground sm:text-8xl lg:text-[10rem]"
        >
          <span
            className="inline-block font-[Barbra] uppercase"
            style={{
              backgroundImage:
                "var(--grad-1, linear-gradient(90deg,#ff4dd8 0%,#8a7bff 50%,#ff8a3d 100%))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Sans Transition
          </span>
          <span className="block font-[Orbitron] uppercase text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground tracking-[0.25em]">
            média par et pour les minorités.
          </span>
        </motion.h1>

      </div>

      <motion.button
        type="button"
        onClick={scrollToNext}
        className="absolute right-6 bottom-24 hidden md:flex flex-col items-center justify-center rounded-full border border-border/60 bg-background/70 p-4 text-muted-foreground transition hover:text-foreground"
        aria-label="Descendre vers la section suivante"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
