import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  // The owner has not supplied a public domain. Configure NEXT_PUBLIC_SITE_URL to publish an absolute sitemap entry.
  return site ? [{ url: site, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }] : [];
}
