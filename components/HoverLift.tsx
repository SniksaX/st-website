// components/HoverLift.tsx
"use client"
import React from "react"
import { motion, useAnimationControls } from "framer-motion"

export function HoverLift({
  children,
  lift = -3, // hauteur en px
}: {
  children: React.ReactNode
  lift?: number
}) {
  const controls = useAnimationControls()

  return (
    <motion.div
      className="inline-block will-change-transform"
      animate={controls}
      onHoverStart={() =>
        controls.start({
          y: lift,
          transition: { type: "spring", stiffness: 600, damping: 28 }
        })
      }
      onHoverEnd={() =>
        controls.start({
          y: 0,
          transition: { type: "spring", stiffness: 500, damping: 26 }
        })
      }
    >
      {children}
    </motion.div>
  )
}
