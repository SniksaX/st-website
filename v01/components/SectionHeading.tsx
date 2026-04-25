"use client";

import React from "react";
import clsx from "clsx";

type SectionHeadingProps = {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "text-center items-center"
      : "text-left items-start";

  return (
    <div className={clsx("flex flex-col gap-2", alignment, className)}>
      {kicker && (
        <p className="text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
          {kicker}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-base text-muted-foreground leading-snug max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
