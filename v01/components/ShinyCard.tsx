"use client"
import * as React from "react"
import { motion, useAnimationControls, useReducedMotion } from "framer-motion"
import { Card } from "@/components/ui/card"

type Props = React.ComponentProps<typeof Card> & {
  lift?: number
  baseAngle?: number
  strength?: number   // 0..1
  duration?: number   // s (court = +rapide)
  instantLift?: boolean
}

export function ShinyCard({
  className = "",
  children,
  lift = -3,
  baseAngle = 16,
  strength = 0.6,     // un poil plus visible
  duration = 0.26,    // instant/snappy
  instantLift = false,
  ...props
}: Props) {
  const prefersReduced = useReducedMotion()
  const liftCtrl = useAnimationControls()
  const sheenCtrl = useAnimationControls()
  const [rand, setRand] = React.useState({ topPct: -20, angle: baseAngle, xEnd: 140 })

  const randomize = () => {
    // hauteur du passage + angle (random à chaque hover)
    const topPct = -15 + randBetween(-8, 8)
    const angle = baseAngle + randBetween(-5, 5)
    // fin > 50%, mais pas trop loin pour rester bien visible
    const xEnd = randBetween(120, 180)
    setRand({ topPct, angle, xEnd })
  }

  const start = () => {
    randomize()

    liftCtrl.start({
      y: lift,
      transition:
        prefersReduced || instantLift
          ? { duration: 0 }
          : { type: "spring", stiffness: 600, damping: 28, mass: 0.4 }
    })

    if (prefersReduced) return

    // départ IMMÉDIAT et VISIBLE
    sheenCtrl.stop()
    sheenCtrl.set({ x: "-20%", opacity: 0 })
    sheenCtrl.start({
      x: `${rand.xEnd}%`,
      opacity: 1,
      transition: { duration, ease: [0.2, 0.6, 0.2, 1], delay: 0 }
    })
  }

  const end = () => {
    sheenCtrl.stop()
    sheenCtrl.set({ opacity: 0, x: `${rand.xEnd}%` })
    liftCtrl.start({
      y: 0,
      transition:
        prefersReduced || instantLift
          ? { duration: 0 }
          : { type: "spring", stiffness: 500, damping: 26 }
    })
  }

  // intensité (légèrement up pour qu’on le voie)
  const o1 = 0.035 * strength
  const o2 = 0.20 * strength
  const o3 = 0.035 * strength

  return (
    <motion.div
      className="self-start"
      animate={liftCtrl}
      onPointerEnter={start}
      onPointerLeave={end}
      onFocus={start}
      onBlur={end}
      onTouchStart={start}
      onTouchEnd={end}
      onTouchCancel={end}
    >
      <Card {...props} className={`relative overflow-hidden rounded-3xl ${className}`}>
        {children}

        {/* REFLET: plus centré et plus large */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top: `${rand.topPct}%`,
            left: "-35%",        // ✅ base plus centrée
            width: "32%",        // ✅ un peu plus large
            height: "165%",
            rotate: `${rand.angle}deg`,
            background: `linear-gradient(90deg,
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,${o1}) 45%,
              rgba(255,255,255,${o2}) 50%,
              rgba(255,255,255,${o3}) 55%,
              rgba(255,255,255,0) 100%
            )`,
            mixBlendMode: "screen",
            filter: "blur(.5px)",
            willChange: "transform"
          }}
          initial={false}
          animate={sheenCtrl}
          transition={{ duration, delay: 0 }}
        />
      </Card>
    </motion.div>
  )
}

function randBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}
