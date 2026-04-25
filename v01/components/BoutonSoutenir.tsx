'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export default function BoutonSoutenir() {
  return (
    <div className="flex justify-center">
      <motion.a
        href="https://www.helloasso.com/associations/sans-transition/formulaires/1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Faire un don à Sans Transition"
        whileHover={{ y: -3, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="group relative block w-full sm:w-[560px] rounded-3xl overflow-hidden shadow-[0_0_45px_rgba(255,145,77,0.2)]"
        style={{
          background: 'linear-gradient(90deg, #8c52ff 0%, #ff914d 100%)',
        }}
      >
        {/* === Logo === */}
        <div className="relative flex items-center justify-center py-8 sm:py-10">
          <Image
            src="/banner.png"
            alt="Soutenez Sans Transition"
            width={1080}
            height={220}
            className="w-auto max-h-[200px] object-contain invert dark:invert-0"
            priority
          />
        </div>

        {/* === Reflet animé === */}
        <span
          className="shine pointer-events-none absolute inset-0 rounded-3xl"
          aria-hidden
        />

        {/* === Contour et halo === */}
        <span
          className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-border shadow-[0_0_25px_rgba(140,82,255,0.35)]"
          aria-hidden
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -inset-10 blur-3xl opacity-20"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 50%, rgba(140,82,255,.6), rgba(255,145,77,.4), transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />

        <style jsx>{`
          .shine {
            overflow: hidden;
            mix-blend-mode: screen;
          }
          .shine::before {
            content: "";
            position: absolute;
            top: -35%;
            bottom: -35%;
            left: -30%;
            width: 80%;
            background: linear-gradient(
              115deg,
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.1) 35%,
              rgba(255, 255, 255, 0.45) 50%,
              rgba(255, 255, 255, 0.1) 65%,
              rgba(255, 255, 255, 0) 100%
            );
            transform: skewX(-20deg) translateX(-250%);
            animation: sweep 3.2s linear infinite;
            will-change: transform;
          }

          @keyframes sweep {
            0% {
              transform: skewX(-20deg) translateX(-250%);
            }
            100% {
              transform: skewX(-20deg) translateX(250%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .shine::before {
              animation-duration: 6s;
              opacity: 0.2;
            }
          }
        `}</style>
      </motion.a>
    </div>
  );
}
