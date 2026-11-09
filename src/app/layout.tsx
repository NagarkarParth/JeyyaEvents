import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display", display: "swap" });

const description = "Jeyya Events delivers spectacular fireworks displays, computerized fireworks, wedding stage effects, concert special effects, and pyro musical experiences for events across India. Contact us to plan your celebration.";
const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const metadata: Metadata = {
  title: { default: "Jeyya Events | Fireworks & Stage Effects Across India", template: "%s | Jeyya Events" },
  description,
  ...(site ? { metadataBase: new URL(site) } : {}),
  keywords: ["Jeyya Events", "Fireworks display services in India", "Professional fireworks company in India", "Wedding fireworks across India", "Event special effects in India", "Stage effects company in India", "Pyro musical fireworks in India", "Computerized fireworks display", "Rooftop fireworks display services", "Concert special effects in India", "Wedding fireworks and stage effects", "Nationwide event production services"],
  openGraph: { title: "Jeyya Events | Fireworks & Stage Effects Across India", description, type: "website", locale: "en_IN" },
  twitter: { card: "summary", title: "Jeyya Events | Fireworks & Stage Effects Across India", description },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
  alternates: { canonical: "/" },
};

const jsonLd = { "@context": "https://schema.org", "@type": "LocalBusiness", name: "Jeyya Events", description, telephone: "+91-7057292923", address: { "@type": "PostalAddress", streetAddress: "Fulsundar Super Market, Near ST Stand, Pune-Nashik Highway", addressLocality: "Narayangaon", addressRegion: "Maharashtra", postalCode: "410504", addressCountry: "IN" }, areaServed: { "@type": "Country", name: "India" }, knowsAbout: ["Fireworks display services in India", "Computerized fireworks displays", "Wedding fireworks", "Stage effects", "Concert special effects", "Pyro musical fireworks", "Nationwide event production services"] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${serif.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</body></html>;
}
