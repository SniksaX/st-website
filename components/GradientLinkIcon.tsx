"use client"
import * as React from "react"
import type { ComponentType, SVGProps, ReactElement } from "react"

type Stop = { offset: number | string; color: string; opacity?: number }

type GLIProps = {
  /** Lucide (ou autre) composant d'icône, ex: Link, BookOpen… */
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  /** Ou bien un <svg> déjà instancié: <GLI><Link /></GLI> */
  children?: ReactElement<SVGProps<SVGSVGElement>>
  className?: string
  size?: number | string
  strokeWidth?: number
  /** "stroke" (par défaut) pour les icônes outline, "fill" pour les icônes pleines */
  mode?: "stroke" | "fill"
  /** Orientation du gradient */
  x1?: string; y1?: string; x2?: string; y2?: string
  /** Stops perso si tu veux override la palette */
  stops?: Stop[]
}

/** Gradient Link Icon — applique un gradient à n'importe quel SVG */
export default function GLI({
  icon: Icon,
  children,
  className,
  size = 16,
  strokeWidth = 2,
  mode = "stroke",
  x1 = "0", y1 = "0", x2 = "1", y2 = "1",
  stops,
}: GLIProps) {
  const id = React.useId()
  const gradId = `gli-${id}`

  // Par défaut, on colle ta palette --grad-1 (approx en hex)
  const defaultStops: Stop[] = [
    { offset: "0%",   color: "#9E55FF" }, // ≈ oklch(0.72 0.27 315)
    { offset: "55%",  color: "#FF6FB3" }, // ≈ oklch(0.76 0.15 345)
    { offset: "100%", color: "#FFB077" }, // ≈ oklch(0.82 0.15 25)
  ]
  const S = stops ?? defaultStops

  // 1) On récupère un <svg> soit via icon, soit via children
  const svgEl: ReactElement<SVGProps<SVGSVGElement>> =
    Icon ? <Icon /> : (children as ReactElement<SVGProps<SVGSVGElement>>)

  // 2) On clone le <svg> pour lui injecter <defs> + stroke/fill url(#id)
  const newProps: SVGProps<SVGSVGElement> = {
    ...svgEl.props,
    className,
    width: size, height: size,
    strokeWidth,
    // On force le paint server selon le mode
    ...(mode === "stroke"
      ? { stroke: `url(#${gradId})`, fill: "none" }
      : { fill: `url(#${gradId})`, stroke: "none" }),
    // access
    "aria-hidden": svgEl.props["aria-hidden"] ?? true,
    focusable: svgEl.props.focusable ?? "false",
  }

  const defs = (
    <defs>
      <linearGradient id={gradId} x1={x1} y1={y1} x2={x2} y2={y2}>
        {S.map((st, i) => (
          <stop
            key={i}
            offset={typeof st.offset === "number" ? `${st.offset}%` : st.offset}
            stopColor={st.color}
            stopOpacity={st.opacity}
          />
        ))}
      </linearGradient>
    </defs>
  )

  // On conserve les paths d’origine et on préfixe avec nos defs
  const childrenWithDefs = (
    <>
      {defs}
      {svgEl.props.children}
    </>
  )

  return React.cloneElement(svgEl, newProps, childrenWithDefs)
}
