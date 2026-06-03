import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Menu() {
  return (
    <nav className="top-0 left-0 z-100 w-full bg-white border-b border-black px-4 py-2 flex items-center justify-between">
      <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight">
        heybox!
      </Link>
      <div className="flex items-center gap-4 md:gap-8 text-sm font-medium text-zinc-600">
        <Link href="/about" className="hidden sm:inline hover:text-black transition-colors">
          Om os
        </Link>
        <Link href="/booking">
          <Button size="sm" className="bg-green-300">
            Beregn din pris
            <ArrowRight className="w-4 h-4 ml-1 -mr-2" />
          </Button>
        </Link>
      </div>
    </nav>
  )
}
