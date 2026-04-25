"use client";
import React, { type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";

export function BackdropParallax() {
  // Parallaxe légère et asymétrique
  const { scrollYProgress } = useScroll();
  const x1 = useTransform(scrollYProgress, [0, 1], ["-6%", "5%"]);
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["8%", "-4%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["6%", "-2%"]);

  // Même gradient que la page, avec fallback
  const GRADIENT = "var(--grad-1, linear-gradient(90deg,#ff4dd8,#8a7bff,#ff4dd8))";

  // Base de style partagée (typée, sans any)
  const baseBlob: MotionStyle = {
    background: GRADIENT,
    mixBlendMode: "screen" as CSSProperties["mixBlendMode"],
  };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* halo central diffus */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0.12, rotate: 0 }}
        animate={{ scale: 1.05, opacity: 0.16, rotate: 8 }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vh] rounded-[50%] blur-[160px]"
        style={{ ...baseBlob, x: x1, y: y1 }}
      />

      {/* accents asymétriques */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0.12, rotate: -6 }}
        animate={{ scale: 1.08, opacity: 0.16, rotate: 6 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute right-[6vw] top-[8vh] w-[18vw] h-[18vw] rounded-[45%] blur-[100px]"
        style={{ ...baseBlob, x: x2, y: y2 }}
      />

      <motion.div
        initial={{ scale: 0.92, opacity: 0.12, rotate: 4 }}
        animate={{ scale: 1.06, opacity: 0.16, rotate: -4 }}
        transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute left-[6vw] bottom-[8vh] w-[20vw] h-[20vw] rounded-[55%] blur-[110px]"
        style={baseBlob}
      />

      {/* grain doux */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsSAAALEgHS3X78AAABcUlEQVR4nO3QMQEAAAjAMMC/5Q0YkW5qgq1m5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPxX4b4AAf5qzXsAAAAASUVORK5CYII=')",
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}

type RevealProps = {
  children: React.ReactNode;
  index?: number;      // alterne gauche/droite
  className?: string;
  distance?: number;   // px de slide (default 16)
  once?: boolean;      // rejoue ou non (default true)
};

export function Reveal({
  children,
  index = 0,
  className,
  distance = 16,
  once = true,
}: RevealProps) {
  const fromLeft = index % 2 === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18, x: fromLeft ? -distance : distance, rotate: fromLeft ? -0.4 : 0.4 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 360, damping: 26, mass: 0.6 }}
      viewport={{ once, amount: 0.1, margin: "20% 0px -10% 0px" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
