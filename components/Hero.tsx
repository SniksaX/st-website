"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import FacesMosaic from "@/components/FacesMosaic";

export default function HeroFontsBarbraOrbitron() {
  const scrollToNext = React.useCallback(() => {
    const next = document.getElementById("liens");
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section className="relative flex min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex-col justify-end overflow-hidden px-6 sm:px-20 lg:px-32 xl:px-48 pb-12 pt-10 sm:pt-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -z-20 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,77,216,0.25),transparent_70%)] blur-[120px]"
      />

      <div aria-hidden className="absolute inset-0 -z-10 select-none">
        <div className="h-full w-full origin-center scale-[1.15] md:scale-[1.2] translate-y-[10%] sm:translate-y-[5%] lg:translate-y-[10%] transition-transform duration-500">
          <FacesMosaic fileUrl="/json_don.txt" variant="background" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="relative flex flex-col gap-8 text-left max-w-[120rem]">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-[9rem] font-extrabold leading-[0.95] tracking-tight text-foreground"
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
          <span className="block font-[Orbitron] uppercase text-base sm:text-2xl lg:text-3xl font-semibold text-foreground tracking-[0.25em]">
            media par et pour les minorites.
          </span>
        </motion.h1>
      </div>

      <motion.button
        type="button"
        onClick={scrollToNext}
        className="absolute right-6 bottom-24 hidden md:flex flex-col items-center justify-center rounded-full p-4 text-muted-foreground transition hover:text-foreground"
        aria-label="Descendre vers la section suivante"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
