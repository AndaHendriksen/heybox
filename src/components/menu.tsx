import Link from "next/link";
import { Button } from "./ui/button";

export function Menu({ bgColor = "bg-olive-100/70" }: { bgColor?: string}) {
  return (
    <nav className={`w-full backdrop-blur-lg z-50 fixed top-0 ${bgColor}`}>
      <div className="px-6 py-2 flex items-center justify-between">
        <div className="">
          <img src="/heybox-logo.svg" alt="heybox logo" className="w-20" />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <Link href="/booking">
            <Button className="bg-primary hover:bg-[#246337] text-white font-medium px-6 rounded-full h-11 hidden md:inline-flex">
              Beregn din pris
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}