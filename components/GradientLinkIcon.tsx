// components/GradientLinkIcon.tsx
"use client";
import * as React from "react";
import type { ComponentType, SVGProps, ReactElement } from "react";

type Stop = { offset: string | number; color: string; opacity?: number };

type Props = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children?: ReactElement<SVGProps<SVGSVGElement>>;
  className?: string;
  size?: number | string;
  mode?: "stroke" | "fill";
  strokeWidth?: number;
  stops?: Stop[];
  gradientProps?: Partial<SVGProps<SVGLinearGradientElement>>;
  /** réduit légèrement le dessin pour éviter le clipping sur certains pictos */
  shrink?: number; // 1 = pas de réduction, 0.9 = -10%
};

export default function GradientLinkIcon({
  icon: Icon,
  children,
  className,
  size = 16,
  mode = "stroke",
  strokeWidth = 1.75,
  stops,
  gradientProps,
  shrink = 1,
}: Props) {
  const id = React.useId();
  const gradId = `gli-${id}`;

  const defaultStops: Stop[] = [
    { offset: "0%", color: "oklch(0.72 0.27 315)" },
    { offset: "55%", color: "oklch(0.76 0.15 345)" },
    { offset: "100%", color: "oklch(0.82 0.15 25)" },
  ];
  const S = stops ?? defaultStops;

  const svgEl: ReactElement<SVGProps<SVGSVGElement>> =
    Icon ? <Icon /> : (children as ReactElement<SVGProps<SVGSVGElement>>);

  const paintProps =
    mode === "stroke"
      ? { stroke: `url(#${gradId})`, fill: "none", strokeWidth }
      : { fill: `url(#${gradId})`, stroke: "none" };

  const newProps: SVGProps<SVGSVGElement> = {
    ...svgEl.props,
    width: size,
    height: size,
    className,
    ...paintProps,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    overflow: "visible", // attribut SVG – évite le crop au bord du viewBox
    style: { overflow: "visible", ...(svgEl.props.style || {}) },
    "aria-hidden": svgEl.props["aria-hidden"] ?? true,
    focusable: svgEl.props.focusable ?? "false",
  };

  const defs = (
    <defs>
      <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1" {...gradientProps}>
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
  );

  // scale autour du centre (12,12) pour ne pas rogner
  const wrap = (nodes: React.ReactNode) =>
    shrink === 1
      ? nodes
      : <g transform={`translate(12 12) scale(${shrink}) translate(-12 -12)`}>{nodes}</g>;

  return React.cloneElement(
    svgEl,
    newProps,
    <>
      {defs}
      {wrap(svgEl.props.children)}
    </>
  );
}
