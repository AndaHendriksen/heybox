import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/index"

// Typography primitives for the marketing (site) pages — the site's big uppercase
// font-black voice, plus body text and the small underlined eyebrow label.
//
// Spacing rule: components own their *bottom* margin only, never a top margin. The
// gap above an element belongs to the element above it (an Eyebrow's mb-5, or a
// heading's mb). Headings carry a consistent default mb; body text ships
// margin-less — pass spacing per use via className (tailwind-merge lets it win).
//
// Not for the booking flow / legal pages, which use a different voice
// (font-bold tracking-tight, sentence case).

function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "text-2xl md:text-3xl lg:text-4xl xl:text-6xl uppercase font-black mb-4 lg:mb-6",
        className
      )}
      {...props}
    />
  )
}

const h2Variants = cva("uppercase font-black", {
  variants: {
    size: {
      default: "text-xl md:text-2xl lg:text-3xl mb-4 lg:mb-6",
      section: "text-3xl md:text-5xl mb-8 md:mb-12",
      display: "text-4xl lg:text-7xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function H2({
  className,
  size,
  ...props
}: React.ComponentProps<"h2"> & VariantProps<typeof h2Variants>) {
  return <h2 className={cn(h2Variants({ size }), className)} {...props} />
}

function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-lg font-bold uppercase mb-1", className)} {...props} />
}

const pVariants = cva("", {
  variants: {
    size: {
      default: "",
      lead: "text-lg md:text-xl leading-relaxed",
      small: "text-sm",
      xsmall: "text-xs",
    },
    color: {
      default: "text-black",
      gray: "text-gray-500",
    }
  },
  defaultVariants: {
    size: "default",
    color: "default"
  },
})

function P({
  className,
  size,
  color,
  ...props
}: React.ComponentProps<"p"> & VariantProps<typeof pVariants>) {
  return <p className={cn(pVariants({ size, color }), className)} {...props} />
}

/** Small underlined label that sits above a heading. Its mb-5 owns the gap below it. */
function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("md:text-lg border-b pb-4 mb-5 inline-block", className)} {...props} />
  )
}

export { H1, H2, H3, P, Eyebrow, h2Variants, pVariants }
