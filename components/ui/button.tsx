"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-3xl font-semibold transition-all duration-200 motion-safe:transition-[transform,box-shadow,opacity] active:scale-[.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        secondary: "bg-accent text-accent-foreground hover:opacity-90",
        brand: "text-neutral-950 [background:var(--grad-1)] shadow-sm hover:shadow-md",
        white: "border border-neutral-700 bg-white text-black hover:bg-neutral-200 hover:text-black",
        neutral: "border border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800",
        outline: "border border-neutral-700 bg-transparent text-white hover:bg-neutral-900/50",
        ghost: "hover:bg-neutral-100/5",
        link: "underline-offset-4 hover:underline text-accent",
      },
      size: {
        sm: "h-9 px-4 text-[14px]",
        md: "h-11 px-5 text-[15px]",
        lg: "h-12 px-6 text-[15px]",
      },
    },
    defaultVariants: { variant: "brand", size: "md" },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
const MotionButton = motion(Button)
export { MotionButton }
