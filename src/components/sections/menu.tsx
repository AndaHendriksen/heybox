"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu as MenuIcon, X } from "lucide-react";

export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-100 w-full bg-white border-b border-black px-4 py-2 flex items-center justify-between">
      <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight">
        heybox!
      </Link>

      {/* Desktop menu */}
      <div className="hidden sm:flex items-center gap-4 md:gap-8 text-sm font-medium text-zinc-600">
        <Link href="/lokationer" className="hover:text-black transition-colors">
          Lokationer
        </Link>
        <Link href="/faq" className="hover:text-black transition-colors">
          FAQ
        </Link>
        <Link href="/om-os" className="hover:text-black transition-colors">
          Om os
        </Link>
        <Link href="/booking">
          <Button size="sm" className="bg-green-300">
            Beregn din pris
            <ArrowRight className="w-4 h-4 ml-1 -mr-2" />
          </Button>
        </Link>
      </div>

      {/* Mobile burger button */}
      <button
        type="button"
        aria-label={open ? "Luk menu" : "Åbn menu"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="sm:hidden inline-flex items-center justify-center p-1 text-zinc-700 hover:text-black transition-colors"
      >
        {open ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white border-b border-black flex flex-col gap-1 px-4 py-3 text-sm font-medium text-zinc-600">
          <Link
            href="/lokationer"
            onClick={() => setOpen(false)}
            className="py-2 hover:text-black transition-colors"
          >
            Lokationer
          </Link>
          <Link
            href="/faq"
            onClick={() => setOpen(false)}
            className="py-2 hover:text-black transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/om-os"
            onClick={() => setOpen(false)}
            className="py-2 hover:text-black transition-colors"
          >
            Om os
          </Link>
          <Link href="/booking" onClick={() => setOpen(false)} className="mt-2">
            <Button size="sm" className="bg-green-300 w-full">
              Beregn din pris
              <ArrowRight className="w-4 h-4 ml-1 -mr-2" />
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
