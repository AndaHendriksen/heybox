import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  LOCALE,
  organizationJsonLd,
  localBusinessJsonLd,
} from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "heybox! Lej flyttekasser til flytning",
    template: "%s - heybox",
  },
  description:
    "Lej stærke flyttekasser til samme pris som pap. Levering og afhentning i Storkøbenhavn er inkluderet - ingen bil og ingen oprydning bagefter. Beregn din pris online.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "heybox",
    locale: LOCALE,
    url: "/",
    title: "heybox! Lej flyttekasser til flytning",
    description:
      "Lej flyttekasser til samme pris som pap. Levering og afhentning i Storkøbenhavn inkluderet.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "heybox - lej flyttekasser billigt og nemt i Storkøbenhavn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "heybox! Lej flyttekasser til flytning",
    description:
      "Lej stærke flyttekasser til samme pris som pap. Levering og afhentning i Storkøbenhavn inkluderet.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${montserrat.variable} h-full antialiased`}>
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        {children}
      </body>
    </html>
  );
}
