# JEYYA EVENTS website

Responsive Next.js marketing site for JEYYA EVENTS, built with the App Router, React, TypeScript, Tailwind CSS, Framer Motion, Lucide icons, and optimized Next.js images.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Use `npm run build` to create the production build and `npm start` to serve it.

## Project map

- `src/app/page.tsx` — complete single-page site, navigation, service cards, gallery filter/lightbox, and inquiry form.
- `src/app/globals.css` — responsive brand styling and reduced-motion treatment.
- `src/app/layout.tsx` — metadata and LocalBusiness/EventPlanner structured data.
- `src/app/robots.ts` and `src/app/sitemap.ts` — crawl directives and sitemap endpoint.
- `public/images/jeyya-logo.jpg` — cropped display copy of the supplied logo; `jeyya-logo-original.jpg` preserves the original file.
- `public/videos/fireworks.mp4` — optional hero video location (the directory includes a note; add the video file yourself).
- `public/images/gallery/` — six compressed illustrative sample photos; replace them with real event photos when available.

## Hero video

The hero video is already installed at `public/videos/fireworks.mp4`. It is a 6-second fireworks-in-the-night-sky clip from Sang Naom on Pexels, downloaded locally so playback does not rely on a third-party video host. The hero plays it muted, inline, and on loop; the fireworks poster remains visible while loading and for reduced-motion visitors. Source: https://www.pexels.com/video/bright-fireworks-display-in-the-night-sky-4966235/. Pexels license: https://www.pexels.com/license/.

## Inquiries

The contact form validates the required fields and phone number, then opens WhatsApp with the entered event details addressed to +91 70572 92923. The visitor must press Send in WhatsApp to submit the message; no form service or API key is configured. Phone and address links open the dialer and Google Maps.

## Assets and content to configure

- Replace the illustrative Unsplash JPEGs in `public/images/gallery/` with JEYYA EVENTS event photography. Gallery cards are explicitly labeled as illustrative until then. Add an optional `video: "/videos/your-event.mp4"` property to a gallery entry to play a local event video in the lightbox.
- Add the official Instagram and YouTube URLs in the footer when supplied.
- Set `NEXT_PUBLIC_SITE_URL` in Vercel or a local `.env.local` after the official site domain is selected. This enables the absolute sitemap entry; no domain has been assumed.

## Deploy to Vercel

Import the project from its Git repository in Vercel, keep the detected Next.js defaults, add `NEXT_PUBLIC_SITE_URL` after the domain is assigned, and deploy. No backend or secret is required for WhatsApp inquiries.
