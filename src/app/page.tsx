"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Building2, Check, ChevronLeft, ChevronRight, Flame, Heart, MapPin, Menu, Music2, PartyPopper, Pause, Phone, Play, Smartphone, Sparkles, Star, WandSparkles, Wind, X } from "lucide-react";

const phone = "7057292923";
const wa = "917057292923";
const inquiry = "Hello Jeyya Events, I am interested in your event services. I would like to discuss my event requirements.";
const waUrl = (message = inquiry) => `https://wa.me/${wa}?text=${encodeURIComponent(message)}`;
const address = "Fulsundar Super Market, Near ST Stand, Pune-Nashik Highway, Narayangaon, Taluka Junnar, District Pune, Maharashtra – 410504, India.";
const mapsUrl = "https://maps.app.goo.gl/grFMgddvhYX2Xd976";
const img = (filename: string) => `/images/gallery/${filename}`;
const socialLinks = { instagram: "https://www.instagram.com/jeyyaevents?cplk=Zzl3OTRvZTZqaW0y" };
const ritualPhotos = [
  { src: "/images/ritual-owner.png", alt: "Jeyya Events owner in a blue and gold outfit", heading: "", accent: "", copy: "We are all like fireworks. We climb, shine and always go our separate ways and become further apart. But even if that time comes, let's not disappear like a firework, and continue to shine... forever.", attribution: "~Jayya Da Phulsuundar", attributionRole: "Owner" },
  { src: "/images/ritual-owner-2.jpeg", alt: "Jeyya Events owner in traditional white attire", heading: "", accent: "", copy: "May Every firework you see tonight feel like God saying : Still beautiful,still worth it", attribution: "~Virrajj D Fulsunddar", attributionRole: "Director" },
  { src: "/images/ritual-owner-3.png", alt: "Portrait remembered in loving memory", heading: "In loving memory", accent: "Rest in Peace.", copy: "" },
];

const services = [
  { title: "Indoor & Outdoor Firework", text: "Add a memorable visual highlight with professionally planned, venue-appropriate fireworks and special effects.", icon: Building2, tag: "01", image: "/images/service-indoor-outdoor-firework.png", imageAlt: "Indoor wedding sparklers and outdoor fireworks display" },
  { title: "Rooftop Display", text: "Elevate your celebration with breathtaking rooftop fireworks displays that transform the night sky into a memorable experience.", icon: ArrowUpRight, tag: "02", image: "/images/service-rooftop-display.png", imageAlt: "A couple watching golden fireworks light up the night sky" },
  { title: "Concert Special Effect", text: "Create unforgettable concert moments with professional stage effects and spectacular visual experiences.", icon: Music2, tag: "03", image: "/images/service-concert-special-effect.png", imageAlt: "Golden fireworks above a live concert stage and crowd" },
  { title: "Pyro Musical", text: "Experience the magic of fireworks synchronized with music, creating a powerful combination of sound, light, and emotion.", icon: WandSparkles, tag: "04", image: "/images/service-pyro-musical.png", imageAlt: "Fire performers spinning sparks and flames at night" },
  { title: "CO₂ Jet & Flame Effect", text: "Add energy and excitement to live performances with dynamic CO₂ jets and professionally managed flame effects.", icon: Flame, tag: "05", image: "/images/service-co2-jet-flame-effect.png", imageAlt: "Stage pyro, flames, and CO₂ jets at a live festival" },
  { title: "Computerized Firework", text: "Precision-controlled fireworks displays designed to create spectacular visual experiences for weddings, celebrations, and special events.", icon: Sparkles, tag: "06", image: "/images/service-computerized-firework.png" },
  { title: "Festival Firework", text: "Bring festivals to life with vibrant fireworks displays that fill the sky with color and excitement.", icon: PartyPopper, tag: "07", image: "/images/service-festival-firework.png", imageAlt: "Golden festival fireworks filling the night sky" },
  { title: "Motor Tube Firework", text: "Create spectacular visual highlights with professionally managed motor tube fireworks displays.", icon: Wind, tag: "08", image: "/images/service-motor-tube-firework.png", imageAlt: "Orange fireworks mortar tubes secured in a launch rack" },

];

const proofPoints = [
  { value: "5,000+", label: "Events completed" },
  { value: "5+ Yrs", label: "Experience" },
  { value: "25+", label: "SFX products" },
  { value: "100%", label: "Safe track record" },
  { value: "24h", label: "Reply time" },
];
const proofAssurances = ["Trained Operators", "Venue Assessment", "Indoor-Safe Effects"];
const faqs = [
  { question: "Can we use fireworks on our own?", answer: "For a large event display, we recommend working with experienced fireworks professionals rather than handling the setup yourself. Fireworks should only be used where permitted, according to their instructions, and never indoors. We can plan a professionally managed display for your event." },
  { question: "How much does a fireworks show cost?", answer: "Pricing depends on the show duration, scale, effects, venue, audience distance, and event location. We can tailor a proposal to your event and budget. Share your date, venue, and preferred effects to request a quote." },
  { question: "How safe are fireworks?", answer: "No fireworks display is risk-free. Our team plans around the venue, audience separation, weather, and applicable permissions. If safe conditions cannot be maintained, the display may need to be changed or postponed." },
  { question: "What happens in case of bad weather?", answer: "We review weather and site conditions for each event. Rain or wind can affect the venue and equipment, and strong winds can make aerial fireworks unsuitable. If conditions or local authorities make a display unsafe, we will discuss changes, a delay, or rescheduling in line with the booking terms." },
];

const nav = [{ label: "Home", href: "#home" }, { label: "About", href: "#about" }, { label: "Rituals", href: "#rituals" }, { label: "Services", href: "#services" }, { label: "Contact", href: "#contact" }];

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href={footer ? "#home" : "/owner/login"} className={footer ? "brand-footer-logo" : "brand"} aria-label={footer ? "Jeyya Events home" : "Owner login"}><Image src="/images/glossy-jeyya-events-logo.png" alt="Jeyya Events — Stage effects and fireworks" width={1774} height={887} priority={!footer} className={footer ? "brand-footer-image" : "brand-logo"} /></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.style.overflow = open ? "hidden" : "";
    body.style.overflow = open ? "hidden" : "";
    return () => {
      root.style.overflow = "";
      body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const sections = nav.map((item) => document.querySelector<HTMLElement>(item.href)).filter((section): section is HTMLElement => section !== null);
    const updateActiveSection = () => {
      const activationLine = Math.min(180, window.innerHeight * 0.28);
      let currentId = sections[0]?.id ?? "home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) currentId = section.id;
      }
      setActiveSection(currentId);
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);
  return <>
    <header className="header"><div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <a key={item.label} className={activeSection === item.href.slice(1) ? "active" : ""} aria-current={activeSection === item.href.slice(1) ? "location" : undefined} href={item.href}>{item.label}</a>)}</nav><a className="button button-red header-cta" href={waUrl("Hello Jeyya Events, I would like to book your services.")} target="_blank" rel="noreferrer"><span className="wa-mark">◉</span> Book Now <ArrowRight size={15} /></a><button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></header>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mobile-drawer"><div className="drawer-links">{nav.map((item) => <a key={item.label} className={activeSection === item.href.slice(1) ? "active" : ""} aria-current={activeSection === item.href.slice(1) ? "location" : undefined} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={17} /></a>)}</div><a className="button button-red drawer-book" href={waUrl()} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Enquire on WhatsApp <ArrowRight size={16} /></a><div className="drawer-note">Made for moments that matter.</div></motion.div>}</AnimatePresence>
  </>;
}

function SectionLabel({ children }: { children: React.ReactNode }) { return <div className="section-label"><span />{children}<span /></div>; }
function InstagramMark() { return <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>; }

export default function Home() {
  const reduced = useReducedMotion();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const serviceTrackRef = useRef<HTMLDivElement>(null);
  const [isMobileHero, setIsMobileHero] = useState(false);
  const [serviceScrollEdges, setServiceScrollEdges] = useState({ start: true, end: false });
  const [heroVideoPaused, setHeroVideoPaused] = useState(false);
  const [ritualPhotoIndex, setRitualPhotoIndex] = useState(0);
  const [menuNote, setMenuNote] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", type: "", date: "", location: "", message: "" });
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setIsMobileHero(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!isMobileHero || reduced) return;
    const video = heroVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    void video.play().then(() => setHeroVideoPaused(false)).catch(() => setHeroVideoPaused(true));
  }, [isMobileHero, reduced]);
  useEffect(() => {
    const track = serviceTrackRef.current;
    if (!track) return;
    const updateEdges = () => setServiceScrollEdges({ start: track.scrollLeft <= 2, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2 });
    updateEdges();
    track.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);
  const scrollServices = (direction: -1 | 1) => {
    const track = serviceTrackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>(".service-card");
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * ((firstCard?.offsetWidth ?? track.clientWidth) + gap), behavior: reduced ? "auto" : "smooth" });
  };
  const toggleHeroVideo = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().then(() => setHeroVideoPaused(false)).catch(() => setHeroVideoPaused(true));
    } else {
      video.pause();
      setHeroVideoPaused(true);
    }
  };
  const submit = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setFormError(""); const digits = form.phone.replace(/\D/g, ""); const nationalNumber = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits.length === 11 && digits.startsWith("0") ? digits.slice(1) : digits; if (!/^[6-9]\d{9}$/.test(nationalNumber)) { setFormError("Please enter a valid Indian mobile number."); return; } setSending(true); const message = `Hello Jeyya Events, I'm ${form.name}. You can reach me at ${form.phone}. I am planning a ${form.type} on ${form.date || "a date to be confirmed"} at ${form.location || "a location to be confirmed"}. ${form.message}`; window.open(waUrl(message), "_blank", "noopener,noreferrer"); setMenuNote("Your message is ready in WhatsApp. Send it there to reach our team."); setForm({ name: "", phone: "", type: "", date: "", location: "", message: "" }); setSending(false); };

  return <>
    <Header />
    <main>
      <section className={`hero${!reduced ? " hero-mobile-video" : ""}`} id="home"><div className={`hero-photo${reduced ? " hero-photo-reduced" : ""}`} aria-hidden="true"><Image src="/images/hero-fireworks-pc.png" alt="Fireworks illuminating the night sky" fill priority sizes="100vw" /></div>{!reduced && <video ref={heroVideoRef} onPlay={() => setHeroVideoPaused(false)} onPause={() => setHeroVideoPaused(true)} className="hero-video" muted loop playsInline preload="none" aria-hidden="true"><source src="/videos/fireworks.mp4" type="video/mp4" /></video>}<div className="hero-veil" />{!reduced && isMobileHero && <button className="hero-video-toggle" type="button" onClick={toggleHeroVideo} aria-label={heroVideoPaused ? "Play fireworks animation" : "Pause fireworks animation"} title={heroVideoPaused ? "Play fireworks animation" : "Pause fireworks animation"}>{heroVideoPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} />}<span>{heroVideoPaused ? "Play fireworks" : "Pause fireworks"}</span></button>}<div className="hero-inner"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-rule" /> THE ART OF CELEBRATION <span className="eyebrow-rule" /></div><p className="hero-intro">TURNING MOMENTS INTO<br/><em>UNFORGETTABLE EXPERIENCES</em></p><h1>JEYYA <span>EVENTS</span></h1><p className="hero-services">Fireworks <i>•</i> Stage Effects <i>•</i> Grand Celebrations</p><p className="hero-desc">Make weddings, parties, concerts, and special events across India truly spectacular with stunning fireworks displays and professional stage effects.</p><div className="hero-actions"><a href={waUrl()} target="_blank" rel="noreferrer" className="button button-red">Enquire Now <ArrowRight size={17} /></a><a href="#services" className="button button-outline">Explore Services <ArrowDown size={16} /></a></div><div className="hero-foot"><span className="hero-foot-line" /> SPECIAL MOMENTS. SPECTACULARLY MADE.</div></div></div><a href="#services" className="scroll-cue" aria-label="Scroll to services"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a><div className="hero-index">NARAYANGAON · PUNE · MAHARASHTRA</div><div className="hero-bottom" /></section>




      <section className="proof-stats" aria-label="Jeyya Events at a glance"><div className="container"><dl className="proof-stats-grid">{proofPoints.map((point, i) => <motion.div className="proof-stat" key={point.label} initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduced ? undefined : { y: -5 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * .06, duration: .4 }}><dt>{point.label}</dt><dd>{point.value}</dd></motion.div>)}</dl></div><div className="proof-assurances"><div className="proof-assurances-inner">{proofAssurances.map((item) => <span className="proof-assurance" key={item}><Check size={17}/>{item}</span>)}</div></div></section>
      <section className="about section-pad" id="about"><div className="container about-grid"><div className="about-visual"><div className="about-main-image"><Image src="/images/about-main.jpeg" alt="A grand fireworks display illuminating a wedding venue at night" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="about-inset"><Image src="/images/about-inset.jpeg" alt="Fireworks bursting over a wedding celebration" fill sizes="180px" /></div><div className="about-caption"><Sparkles size={15} /><span>MADE TO BE REMEMBERED</span></div></div><div className="about-copy"><SectionLabel>ABOUT Jeyya Events</SectionLabel><h2>Creating <em>magical</em><br/>moments.</h2><h3>Turning every celebration into an extraordinary experience.</h3><p>Jeyya Events specializes in fireworks displays, stage effects, and grand celebrations. We are passionate about creating unforgettable experiences through creativity, precision, and professional event execution.</p><p>Based in Narayangaon, Pune, our team brings spectacular visual effects to weddings, concerts, and special events across India.</p><a href="#vision" className="text-link">A little more about us <ArrowRight size={16} /></a></div></div></section>

      
      <section className="expertise-section section-pad" id="expertise"><div className="container"><div className="expertise-heading"><SectionLabel>OUR EXPERTISE</SectionLabel><h2>Every detail, <em>beautifully handled.</em></h2><p>From custom designs and thoughtful planning to flawless execution, we handle every detail with care. Our skilled pyrotechnicians use modern technology and follow rigorous safety practices to create a performance that shines as brightly as your celebration.</p></div><div className="expertise-why"><SectionLabel>WHY CHOOSE US?</SectionLabel><div className="expertise-grid"><article className="expertise-card"><span className="expertise-number">01</span><h3>Tailored Experiences</h3><p>We work closely with you to create a display that reflects your vision and event theme.</p></article><article className="expertise-card"><span className="expertise-number">02</span><h3>Professional Service</h3><p>Our experienced team plans each detail to deliver a seamless, memorable experience.</p></article><article className="expertise-card"><span className="expertise-number">03</span><h3>Unmatched Quality</h3><p>We use quality materials and refined techniques to create dazzling results.</p></article></div></div><p className="expertise-closing"><span>Jeyya Events</span> brings spectacular displays to your celebration and helps create memories that sparkle for years to come.</p></div></section>
      <section className="values section-pad" id="vision"><div className="container values-grid"><article className="value-card vision-card"><span className="value-watermark">01</span><div className="value-icon"><Star size={19} /></div><SectionLabel>OUR VISION</SectionLabel><p>To ensure client satisfaction and loyalty as we deliver personal and unique experiences that are beyond expectation and create long-term loyal relationships by consistently providing outstanding service that creates an overall extraordinary event experience.</p><div className="value-footer"><span>THE JEYYA PROMISE</span><Sparkles size={16} /></div></article><article className="value-card mission-card"><span className="value-watermark">02</span><div className="value-icon"><Heart size={19} /></div><SectionLabel>OUR MISSION</SectionLabel><p><span className="mission-brand">Jeyya Events</span> delivers high-quality, valuable services while focusing on the uniqueness, special characteristics, and individual needs of each client’s event project.</p><div className="value-footer"><span>BUILT AROUND YOU</span><Sparkles size={16} /></div></article></div></section>

      <section className="rituals section-pad" id="rituals"><button type="button" className="ritual-side-button ritual-side-button-prev" aria-label="Previous ritual photo" onClick={() => setRitualPhotoIndex((current) => (current - 1 + ritualPhotos.length) % ritualPhotos.length)}><ChevronLeft size={20} /></button><div className="container rituals-layout"><figure className="rituals-feature"><div className="rituals-photo"><AnimatePresence mode="wait" initial={false}><motion.div className="ritual-slide" key={ritualPhotoIndex} initial={reduced ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -18 }} transition={{ duration: reduced ? 0 : .28 }}><Image src={ritualPhotos[ritualPhotoIndex].src} alt={ritualPhotos[ritualPhotoIndex].alt} fill sizes="(max-width: 760px) 84vw, 48vw" /></motion.div></AnimatePresence><span className="ritual-photo-count" aria-live="polite">{String(ritualPhotoIndex + 1).padStart(2, "0")} / {String(ritualPhotos.length).padStart(2, "0")}</span></div></figure><div className="rituals-intro"><SectionLabel>RITUALS & TRADITION</SectionLabel>{(ritualPhotos[ritualPhotoIndex].heading || ritualPhotos[ritualPhotoIndex].accent) && <h2>{ritualPhotos[ritualPhotoIndex].heading} <em>{ritualPhotos[ritualPhotoIndex].accent}</em></h2>}{ritualPhotos[ritualPhotoIndex].copy && <p>“{ritualPhotos[ritualPhotoIndex].copy}”</p>}{"attribution" in ritualPhotos[ritualPhotoIndex] && ritualPhotos[ritualPhotoIndex].attribution && <p className="rituals-attribution"><span>{ritualPhotos[ritualPhotoIndex].attribution}</span><small>{ritualPhotos[ritualPhotoIndex].attributionRole}</small></p>}</div></div><button type="button" className="ritual-side-button ritual-side-button-next" aria-label="Next ritual photo" onClick={() => setRitualPhotoIndex((current) => (current + 1) % ritualPhotos.length)}><ChevronRight size={20} /></button></section>

      <section className="services section-pad" id="services"><div className="container"><div className="section-head"><SectionLabel>OUR SERVICES</SectionLabel><h2>What we <em>offer</em></h2><p>Creating extraordinary experiences through spectacular effects.</p></div><div className="service-scroll-tools"><span className="service-scroll-desktop">Scroll to explore services</span><span className="service-scroll-mobile">Swipe to explore services</span><div><button type="button" aria-label="Scroll to previous services" onClick={() => scrollServices(-1)} disabled={serviceScrollEdges.start}><ChevronLeft size={18}/></button><button type="button" aria-label="Scroll to more services" onClick={() => scrollServices(1)} disabled={serviceScrollEdges.end}><ChevronRight size={18}/></button></div></div><div className="service-grid" ref={serviceTrackRef} role="region" aria-label="Scrollable services" tabIndex={0}>{services.map((service, i) => <motion.article className={`service-card${service.image ? " service-card-image" : ""}`} key={service.title} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ delay: i * .06, duration: .5 }}>{service.image && <div className="service-image"><Image className="service-image-backdrop" src={service.image} alt="" fill sizes="(max-width: 760px) 82vw, (max-width: 950px) 45vw, 30vw" aria-hidden="true" /><Image className="service-image-main" src={service.image} alt={"imageAlt" in service && service.imageAlt ? service.imageAlt : "Full view of golden fireworks over a wedding stage"} fill sizes="(max-width: 760px) 82vw, (max-width: 950px) 45vw, 30vw" /></div>}<div className="service-top"><span className="service-icon"><service.icon size={22} strokeWidth={1.6} /></span><span className="service-number">{service.tag}</span></div><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`Enquire about ${service.title}`} className="card-arrow"><ArrowUpRight size={17} /></a></motion.article>)}</div><div className="service-bottom"><span>CRAFTED WITH CARE. EXECUTED WITH PRECISION.</span><a href="#contact">Plan your celebration <ArrowRight size={15} /></a></div></div></section>





      <section className="service-area section-pad" id="service-area"><div className="container"><div className="service-area-heading"><SectionLabel>OUR SERVICE LOCATIONS</SectionLabel><h2>Bringing Extraordinary<br/><em>Celebrations Across India</em></h2><p>From grand weddings and concerts to corporate celebrations and special events, Jeyya Events brings spectacular fireworks displays and professional stage effects to events across India. Our team works with clients to create memorable experiences at destinations nationwide.</p></div><div className="service-area-base"><MapPin size={19}/><p><strong>Based in Narayangaon, Pune, Maharashtra</strong><span>We travel to event destinations throughout India. Our listed regions describe service coverage, not branch offices.</span></p></div><div className="service-region-grid"><article className="service-region"><h3>North & Central India</h3><p>Delhi NCR · Chandigarh · Haryana · Himachal Pradesh · Jammu and Kashmir · Ladakh · Punjab · Rajasthan · Uttar Pradesh · Uttarakhand · Madhya Pradesh · Chhattisgarh</p></article><article className="service-region"><h3>West India</h3><p>Maharashtra · Gujarat · Goa · Dadra and Nagar Haveli and Daman and Diu</p></article><article className="service-region"><h3>South India</h3><p>Andhra Pradesh · Karnataka · Kerala · Tamil Nadu · Telangana · Puducherry · Lakshadweep · Andaman and Nicobar Islands</p></article><article className="service-region"><h3>East & Northeast India</h3><p>Bihar · Jharkhand · Odisha · West Bengal · Assam · Arunachal Pradesh · Manipur · Meghalaya · Mizoram · Nagaland · Sikkim · Tripura</p></article></div></div></section>


      <section className="contact section-pad" id="contact"><div className="container"><div className="contact-heading"><SectionLabel>LET’S MAKE IT HAPPEN</SectionLabel><h2>Let’s make your event<br/><em>extraordinary.</em></h2><p>Planning a wedding, concert, celebration, or special event? Tell us what you have in mind and let’s make it unforgettable.</p></div><div className="contact-grid"><div className="contact-details"><div className="contact-block"><span className="contact-icon"><Phone size={18}/></span><div><small>CUSTOMER CARE</small><a href={`tel:+91${phone}`}>+91 70572 92923 <ArrowUpRight size={14}/></a><a href="tel:+912132244444">02132 244 444 <ArrowUpRight size={14}/></a></div></div><div className="contact-block"><span className="contact-icon"><MapPin size={18}/></span><div><small>FIND US</small><a className="address-link" href={mapsUrl} target="_blank" rel="noreferrer">{address}<ArrowUpRight size={14}/></a></div></div><a className="contact-whatsapp" href={waUrl()} target="_blank" rel="noreferrer"><span className="whatsapp-dot">◉</span><span><b>Prefer WhatsApp?</b><small>We’re one message away.</small></span><ArrowRight size={17}/></a><div className="contact-hours"><span>HERE FOR YOUR NEXT BIG MOMENT</span><Sparkles size={15}/></div></div><form className="contact-form" onSubmit={submit}><div className="form-top"><h3>Tell us about it.</h3><span>We’ll be in touch soon.</span></div><div className="form-row"><label>FULL NAME<input required autoComplete="name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Your name"/></label><label>PHONE NUMBER<input required type="tel" autoComplete="tel" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="10 digit mobile number"/></label></div><div className="form-row"><label>EVENT TYPE<select required value={form.type} onChange={e => setForm({...form,type:e.target.value})}><option value="">Choose an event</option><option>Wedding</option><option>Concert</option><option>Private celebration</option><option>Corporate event</option><option>Other</option></select></label><label>EVENT DATE<input type="date" value={form.date} onChange={e => setForm({...form,date:e.target.value})}/></label></div><label>EVENT LOCATION<input value={form.location} onChange={e => setForm({...form,location:e.target.value})} placeholder="City or venue"/></label><label>A NOTE FOR OUR TEAM<textarea rows={3} value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Tell us a little about what you’re planning…"/></label>{formError && <p className="form-error" role="alert">{formError}</p>}{menuNote && <p className="form-note" role="status"><Check size={15}/>{menuNote}</p>}<button className="button button-red form-submit" type="submit" disabled={sending}>{sending ? "Opening WhatsApp…" : "Send your enquiry"}<ArrowRight size={16}/></button><small className="form-config">This form opens WhatsApp with your details. Your enquiry is sent when you press Send in WhatsApp.</small></form></div></div></section>
      <section className="faq-section section-pad" id="faq"><div className="container"><motion.div className="faq-heading" initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: .45 }}><SectionLabel>FREQUENTLY ASKED QUESTIONS</SectionLabel><h2>Good to <em>know.</em></h2><p>Helpful details for planning your fireworks display.</p></motion.div><div className="faq-grid">{[0, 1].map((column) => <div className="faq-column" key={column}>{faqs.filter((_, index) => index % 2 === column).map((faq, itemIndex) => { const i = column + itemIndex * 2; return <motion.details className="faq-item" key={faq.question} open={i === 0} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * .07, duration: .4 }}><summary>{faq.question}</summary><p>{faq.answer}</p></motion.details>; })}</div>)}</div></div></section>

    </main>
    <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Brand footer/><p>Fireworks, stage effects, and celebrations made unforgettable. Let’s make a little magic together.</p><a className="footer-wa" href={waUrl()} target="_blank" rel="noreferrer"><span className="whatsapp-dot">◉</span> Say hello on WhatsApp <ArrowRight size={15}/></a></div><div className="footer-col"><small>EXPLORE</small>{nav.map(link => <a key={link.label} href={link.href}>{link.label}</a>)}</div><div className="footer-col"><small>WHAT WE DO</small>{services.map(service => <a key={service.title} href="#services">{service.title}</a>)}</div><div className="footer-col footer-contact"><small>FIND Jeyya Events</small><a className="footer-phone-link" href={`tel:+91${phone}`}><Smartphone size={15} aria-hidden="true"/>+91 70572 92923</a><a className="footer-phone-link" href="tel:+912132244444"><Phone size={15} aria-hidden="true"/>02132 244 444</a><a href={mapsUrl} target="_blank" rel="noreferrer">Narayangaon, Pune<br/>Maharashtra – 410504</a><div className="social-links"><a aria-label="Jeyya Events on Instagram" href={socialLinks.instagram} target="_blank" rel="noreferrer"><InstagramMark/></a><a aria-label="Jeyya Events location on Google Maps" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={17}/></a><a aria-label="Jeyya Events on YouTube" href="https://www.youtube.com/@JEYYAEVENTS" target="_blank" rel="noreferrer"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.86 4 12 4 12 4s-6.86 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.14 20 12 20 12 20s6.86 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58Z"/><path d="m9.75 15.02 5.75-3.02-5.75-3.02z"/></svg></a></div></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jeyya Events. ALL RIGHTS RESERVED.</span><span>MADE FOR MOMENTS THAT MATTER <span className="gold-dot">✦</span></span></div></div></footer>
  </>;
}
