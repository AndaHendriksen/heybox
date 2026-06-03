import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"

// Shared design primitives used across the marketing pages (home, about, ...).
// These define the site's visual vocabulary: black borders, pastel gradients,
// hard-shadow cards and big uppercase headings. Keep markup changes here so the
// whole site stays in sync.

/** White card with a black border and a hard offset shadow. */
export function TransparentCard({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-2 md:px-3 pt-1 pb-0.5 flex items-center gap-1 mb-0.5 border border-black bg-white shadow-[3px_4px_0_0_rgba(0,0,0,1)]">
      {children}
    </div>
  )
}

/**
 * Full-bleed two-column hero shell: gradient media panel on the left, content
 * on the right. Collapses to a single column on mobile.
 */
export function SplitHero({
  media,
  children,
  minHeightClass = "min-h-[90vh]",
}: Readonly<{ media: React.ReactNode; children: React.ReactNode; minHeightClass?: string }>) {
  return (
    <section className={`${minHeightClass} grid grid-cols-1 lg:grid-cols-2 border-b border-black`}>
      <div className="lg:pt-0 bg-linear-to-br from-green-100 to-green-300 flex items-center p-8 border-b border-black lg:border-b-0 lg:border-r">
        {media}
      </div>
      <div className="p-4 pb-12 flex items-center justify-center">
        {children}
      </div>
    </section>
  )
}

/** Big uppercase title on the left, large description text on the right. */
export function SectionInfo({
  preTitle,
  title,
  description,
  className,
}: Readonly<{ preTitle?: string; title: React.ReactNode; description: React.ReactNode; className?: string }>) {
  return (
    <Section>
      <div className={`max-w-[1400px] md:px-0 mx-auto md:grid md:grid-cols-2 py-16 md:py-32 ${className || ''}`}>
        <div className="p-6 pl-0">
          {preTitle && <p className="-mt-4">{preTitle}</p>}
          <h2 className="text-4xl lg:text-7xl font-black uppercase">{title}</h2>
        </div>
        <div className="md:py-6 lg:py-8 md:pr-0 lg:pl-24">
          <p className="text-lg md:text-xl xl:text-right leading-8">{description}</p>
        </div>
      </div>
    </Section>
  )
}

export interface SectionContentProps {
  imgLast?: boolean
  imgSrc: string
  imgAlt: string
  title: string
  descriptions: string[]
  ctaText: string
  ctaLink: string
  bgColor: string
  btnColor: string
  hasBorderTop?: boolean
  imgFullSize?: boolean
}

/** Bordered card: gradient image panel one side, text + CTA the other. */
export function SectionContent({
  imgLast,
  imgSrc,
  imgAlt,
  title,
  descriptions,
  ctaText,
  ctaLink,
  hasBorderTop,
  imgFullSize = false,
}: SectionContentProps) {
  return (
    <Section>
      <div className={`border-b border-x border-black grid lg:grid-cols-2 items-center justify-center ${hasBorderTop ? 'border-t' : ''}`}>
        <div className={`${imgLast ? 'lg:order-1 lg:border-l bg-linear-to-tl' : 'lg:order-0 bg-linear-to-br'} from-yellow-50 to-orange-100 border-b lg:border-b-0 border-black ${imgFullSize ? '' : 'lg:py-24'}`}>
          <Image width="500" height="500" src={`/images/${imgSrc}`} alt={imgAlt} className={`mx-auto ${imgFullSize ? 'w-6/7' : 'w-2/3 lg:w-2/3'}`} />
        </div>
        <div className={`${imgLast ? '' : 'lg:border-l border-black'} h-full px-4 py-12 lg:p-0 flex flex-col justify-center lg:px-16`}>
          {/*  */}
          {/* <h2 className="text-2xl md:text-3xl lg:text-4xl uppercase font-bold leading-[1.2] tracking-tight mb-4"> */}
          <h2 className="text-xl md:text-2xl lg:text-3xl uppercase font-black leading-[1.2] tracking-tight mb-4">
            {title}
          </h2>
          {descriptions.map((desc, index) => (
            <p key={index} className={`text-lg md:text-xl text-black/50 ${index !== 0 ? 'mt-4' : ''}`}>
              {desc}
            </p>
          ))}
          <Link href={ctaLink} className="mt-8 md:mt-12">
            <Button className="bg-green-300">
              {ctaText} <ArrowRight className="w-4 h-4 ml-1 -mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}

export interface ThreeInfoColumnsProps {
  title: string
  description: string
  subdescription?: string
}

/** Three columns with dashed dividers. Used for stats and step-by-step. */
export function SectionThreeInfoColumns({
  hasBorderTop,
  xlTitle,
  columns,
}: Readonly<{ hasBorderTop?: boolean; xlTitle?: boolean; columns: ThreeInfoColumnsProps[] }>) {
  return (
    <Section>
      <div className={`grid md:grid-cols-3 gap-1 relative border-x border-b border-black ${hasBorderTop ? 'border-t' : ''}`}>
        {columns.map((column, index) => (
          <div key={index} className={`px-4 lg:px-8 py-8 lg:py-16 ${index === 0 ? '' : 'border-t md:border-t-0 md:border-l border-gray-400 border-dashed'}`}>
            <h3 className={`text-lg ${xlTitle ? 'md:text-2xl lg:text-4xl xl:text-5xl' : ''} font-bold uppercase mb-1`}>{column.title}</h3>
            <p>{column.description}</p>
            {column.subdescription && <p className="text-sm text-gray-500 mt-2">{column.subdescription}</p>}
          </div>
        ))}
      </div>
    </Section>
  )
}
