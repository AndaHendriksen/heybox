import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Menu({ bgColor = "bg-olive-100/70" }: { bgColor?: string}) {
  return (
    // <nav className={`w-full backdrop-blur-lg z-50 fixed top-0 ${bgColor}`}>
    <nav className="top-0 left-0 z-100 w-full bg-white border-b border-black px-4 py-2 flex items-center justify-between">
      <div className="">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">heybox!</h1>
        {/* <img src="/heybox-logo.svg" alt="heybox logo" className="w-20" /> */}
      </div>
      {/* <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
        <Link href="/booking">
          <Button size="sm" className="bg-green-300">
            Beregn din pris
            <ArrowRight className="w-2 h-2" />
          </Button>
        </Link>
      </div> */}
    </nav>
  )
}