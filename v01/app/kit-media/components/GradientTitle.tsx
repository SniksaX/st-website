import { createElement, type ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3;
type HeadingTag = `h${HeadingLevel}`;

export default function GradientTitle({
  children,
  level = 2,
}: {
  children: ReactNode;
  level?: HeadingLevel;
}) {
  const Tag: HeadingTag = `h${level}`;

  return createElement(
    Tag,
    {
      className:
        "text-4xl md:text-6xl font-extrabold tracking-tight text-center",
      style: {
        backgroundImage: "var(--grad-1)", // ton gradient principal
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      },
    },
    children
  );
}
