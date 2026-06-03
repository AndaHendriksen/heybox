import { Menu } from "@/components/menu";
import { Footer } from "@/components/footer";

// Shared chrome for the marketing/content pages (home, about, terms).
// The booking flow lives outside this group, so it never gets this Menu/Footer.
// Pages must NOT render their own <main>/<Footer> — they're provided here.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menu />
      <main>{children}</main>
      <Footer />
    </>
  );
}
