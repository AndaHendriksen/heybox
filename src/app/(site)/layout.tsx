import { Menu } from "@/components/sections/menu";
import { Footer } from "@/components/sections/footer";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <Menu />
      <main className="pt-12">{children}</main>
      <Footer />
    </>
  );
}
