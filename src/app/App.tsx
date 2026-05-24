import React, { useState, useEffect } from "react";
import {
  Droplets,
  Menu,
  X,
  Star,
  Wifi,
  Car,
  Sparkles,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Quote,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { BookingWidget } from "./components/BookingWidget";

export default function App() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(
    null,
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedBookingCard, setExpandedBookingCard] =
    useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAmenity, setActiveAmenity] = useState<number | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen || expandedBookingCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, expandedBookingCard]);

  const navLinks = [
    "Home",
    "Villas",
    "Experiences",
    "Gallery",
    "Contact",
  ];

  const ambientParticles = [
    { top: "18%", left: "10%", size: "clamp(7rem, 12vw, 14rem)", delay: 0, duration: 10 },
    { top: "52%", left: "76%", size: "clamp(8rem, 14vw, 18rem)", delay: 1.6, duration: 12 },
    { top: "72%", left: "24%", size: "clamp(5rem, 9vw, 11rem)", delay: 3.2, duration: 11 },
  ];

  const villas = [
    {
      id: "01",
      image: "https://huktvoldmkiahhyrvwqn.supabase.co/storage/v1/object/public/villa-images/villa1%20inside.jpg",
      alt: "First Chair Villa",
      key: "rocking-chair",
      price: 12500
    },
    {
      id: "02",
      image: "https://huktvoldmkiahhyrvwqn.supabase.co/storage/v1/object/public/villa-images/villa2%20inside.jpg",
      alt: "Second Chair Villa",
      key: "ocean-breeze",
      price: 18000
    }
  ];

  const selectedBookingVilla = villas.find((villa) => villa.key === expandedBookingCard);

  // Handle scroll to shrink nav and logo
  useEffect(() => {
    const handleScroll = (e?: Event) => {
      let top = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

      // If the scroll event came from an internal element (like body with overflow), check its scrollTop
      if (e && e.target instanceof Element && e.target.scrollTop > 0) {
        top = Math.max(top, e.target.scrollTop);
      }

      setIsScrolled(top > 50);
    };

    // Use capture phase (true) to catch scroll events from ANY element, because scroll events do not bubble.
    window.addEventListener("scroll", handleScroll, true);
    // Run once on mount
    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll, true);
  }, []);

  useEffect(() => {
    if (!expandedBookingCard) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpandedBookingCard(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedBookingCard]);

  return (
    <div className="relative w-full bg-[#f7f5f0] font-inter text-stone-50 overflow-x-hidden">
      {/* Hero Section Container (100vh) */}
      <div className="relative w-full h-screen min-h-[700px] sm:min-h-[800px] overflow-hidden bg-[#1a202c]">
        {/* Background Image & Overlays */}
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0 overflow-hidden"
        >
          <ImageWithFallback
            src="https://huktvoldmkiahhyrvwqn.supabase.co/storage/v1/object/public/villa-images/villa%201%20front.jpg"
            alt="Rocking Chair Pool Villa"
            className="absolute w-full h-full object-cover"
          />
          {/* Silk-like Gradient Overlay for Text Readability and Transition */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a202c] via-[#1a202c]/40 to-[#1a202c]/30 z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7f5f0] to-transparent z-10" />
        </motion.div>

        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {ambientParticles.map((particle, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-[#f7f5f0]/10 blur-3xl"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                x: [0, 14, 0],
                y: [0, -18, 0],
                opacity: [0.14, 0.32, 0.14],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Central Hero Content (Removed by request) */}
      </div>

      {/* The Concept Section */}
      <section id="concept" className="relative z-20 isolate w-full min-h-screen sm:min-h-[800px] flex flex-col justify-start py-20 lg:py-24 overflow-x-clip overflow-y-visible">

        {/* Split Background */}
        <div className="absolute inset-0 flex flex-col md:flex-row pointer-events-none z-0">
          {/* Left Background for Text */}
          <div className="w-full md:w-[55%] h-full bg-[#f7f5f0]"></div>
          {/* Right Background for Chair */}
          <div className="w-full md:w-[45%] h-full bg-[#f7f5f0]"></div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e2d8ce]/20 rounded-full blur-[120px] pointer-events-none z-[1]" />

        <div className="relative z-10 w-[90%] lg:w-[85%] max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 xl:gap-32 md:h-[80vh]">

          {/* Left: Text Content (Split into 3 distinct parts) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-1/2 flex flex-col justify-center min-h-[200px] md:min-h-full text-left z-10 py-8 md:py-12"
          >
            {/* Part 1: Title */}
            <div className="flex flex-col gap-4">
              <div className="h-[1px] w-12 sm:w-16 bg-[#8c6d53]/60"></div>
              <h2 className="font-playfair text-[#1a202c] tracking-[0.06em] uppercase leading-[0.95] md:whitespace-nowrap pr-6"
                style={{ fontSize: "clamp(2rem, 5vw + 1rem, 4rem)" }}>
                Where nature meets
                <span className="italic text-[#8c6d53] lowercase font-light tracking-normal block sm:inline"> simplicity</span>
              </h2>
            </div>

            <div className="h-3 md:h-4 lg:h-10" />

            {/* Part 2 & 3: Highlight + Description stack */}
            <div className="mt-16 md:mt-20 text-[#1a202c]/75">
              <div className="flex flex-col gap-5">
                <p className="text-[#8c6d53] text-lg sm:text-xl font-medium border-l-2 border-[#8c6d53]/30 pl-6 py-2 italic leading-relaxed max-w-[90%]">
                  Rocking Chair Pool Villa is designed around a single idea that true luxury is found in simplicity.
                </p>
                <div className="text-base sm:text-lg font-light leading-[1.9] tracking-widest space-y-6 max-w-lg">
                  <p className="leading-relaxed">
                    Nestled in Koh Samui's lush hillside, every space blends open-air living with serene natural beauty.
                  </p>
                  <p className="leading-relaxed text-[#1a202c]/65">
                    No excess — no pretension. Just the gentle rhythm of island life, a private pool, and the freedom to simply be.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Rocking Chair Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center md:justify-end md:absolute md:-right-[20%] md:-bottom-[35vh] md:w-[50vw] md:h-[120%] z-20 mt-16 md:mt-0 pointer-events-none"
          >
            <div className="w-full h-full md:translate-y-[22vh]">
              {/* The rocking animation wrapper */}
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ transformOrigin: "bottom center" }}
                className="w-[90%] md:w-full md:h-full"
              >
                {/* NOTE: You need to replace this src with your rocking chair image path */}
                <img
                  src="https://huktvoldmkiahhyrvwqn.supabase.co/storage/v1/object/public/villa-images/chair%202%20no%20bg.png"
                  alt="Rocking Chair"
                  className="w-full h-auto md:h-full object-contain object-bottom md:object-right-bottom drop-shadow-2xl scale-125 origin-bottom-right"
                  onError={(e) => {
                    // Fallback if image doesn't exist yet
                    (e.target as HTMLImageElement).src = "https://huktvoldmkiahhyrvwqn.supabase.co/storage/v1/object/public/villa-images/final11.png";
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      <section
        id="amenities"
        className="relative w-full flex flex-col items-center justify-center bg-[#f7f5f0] overflow-hidden px-[clamp(1.5rem,5vw,4rem)]"
        style={{
          paddingTop: "clamp(4rem, 10vw, 8rem)",
          paddingBottom: "clamp(3rem, 7vw, 6rem)"
        }}
      >
        <div
          className="flex flex-col gap-12 text-center z-10"
          style={{
            maxWidth: "clamp(300px, 80vw, 800px)"
          }}
        >
          <span
            className="font-playfair text-[#8c6d53] font-semibold tracking-[0.25em] uppercase"
            style={{ fontSize: "clamp(2rem, 5vw + 1rem, 4rem)" }}
          >
            Amenities
          </span>
          <p
            className="font-playfair text-[#1a202c]/65 leading-relaxed italic mt-12 mx-auto gap-12"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
          >
            Curated comforts designed to make every moment of your stay effortless and truly unforgettable.
          </p>

          {/* Icons centered directly after description */}
          <div className="flex flex-col items-center mt-8 md:mt-20 w-full">
            <div
              className="flex flex-row flex-wrap justify-center"
              style={{
                gap: "clamp(1.5rem, 3vw, 4rem)"
              }}
            >
              {[
                { icon: Droplets, title: "Private Pool", desc: "Crystal-clear infinity pool with sun loungers" },
                { icon: Wifi, title: "High-Speed WiFi", desc: "Seamless connectivity throughout" },
                { icon: Sparkles, title: "Housekeeping", desc: "Daily service to keep your villa pristine" },
                { icon: ShieldCheck, title: "24/7 Security", desc: "Round-the-clock peace of mind" },
                { icon: Car, title: "Airport Transfer", desc: "Complimentary luxury pickup & drop-off" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center group"
                  onMouseEnter={() => setActiveAmenity(idx)}
                  onMouseLeave={() => setActiveAmenity(null)}
                  onClick={() => setActiveAmenity(activeAmenity === idx ? null : idx)}
                >
                  <motion.div
                    animate={{
                      scale: activeAmenity === idx ? 1.2 : 1,
                      color: activeAmenity === idx ? "#8c6d53" : "#d4bca3"
                    }}
                    className="cursor-pointer transition-colors duration-300"
                  >
                    <item.icon
                      style={{ width: "clamp(4rem, 6vw, 8rem)", height: "clamp(4rem, 6vw, 8rem)" }}
                      strokeWidth={0.8}
                    />
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Expandable Description */}
            <div className="h-24 mt-8 flex justify-center items-center w-full max-w-2xl px-4">
              <AnimatePresence mode="wait">
                {activeAmenity !== null && (
                  <motion.div
                    key={activeAmenity}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <h4 className="font-playfair text-[#8c6d53] text-xl md:text-2xl font-semibold mb-2">
                      {[
                        "Private Pool",
                        "High-Speed WiFi",
                        "Housekeeping",
                        "24/7 Security",
                        "Airport Transfer"
                      ][activeAmenity]}
                    </h4>
                    <p className="text-[#1a202c]/70 text-sm md:text-base font-light italic">
                      {[
                        "Crystal-clear infinity pool with sun loungers",
                        "Seamless connectivity throughout the villa",
                        "Daily service to keep your sanctuary pristine",
                        "Round-the-clock peace of mind for your stay",
                        "Complimentary luxury pickup & drop-off"
                      ][activeAmenity]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden px-[clamp(1.5rem,5vw,4rem)]"
        style={{
          background: "linear-gradient(to bottom, #f7f5f0 0%, #f7f5f0 8%, #e2d8ce 28%, #1a202c 46%, #1a202c 78%, #d8cbbd 92%, #f7f5f0 100%)",
          paddingTop: "clamp(5rem, 10vw, 8rem)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)"
        }}
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative w-full max-w-6xl mx-auto flex flex-col justify-center items-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-[clamp(3rem,6vw,5rem)]"
          >
            <div className="flex items-center gap-4 mb-[clamp(1.75rem,4vw,2rem)]">
              <div className="h-[1px] w-14 bg-[#d4bca3]"></div>
              <p className="text-[#d4bca3] text-sm font-semibold tracking-[0.25em] uppercase">Guest Stories</p>
              <div className="h-[1px] w-14 bg-[#d4bca3]"></div>
            </div>
            <h2 className="font-playfair text-white leading-[1.15] max-w-3xl"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
              Loved by travellers <span className="italic text-[#d4bca3]">from around the world</span>
            </h2>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1.25rem,3vw,2rem)]">
            {[
              {
                quote: "An absolutely magical experience. The villa exceeded every expectation — from the stunning pool to the impeccable service.",
                name: "James & Sarah Mitchell",
                location: "London, United Kingdom",
              },
              {
                quote: "A true sanctuary. Waking up to the ocean views and enjoying breakfast by the pool felt like pure luxury. We'll be back every year.",
                name: "Hiroshi Tanaka",
                location: "Tokyo, Japan",
              },
              {
                quote: "The attention to detail is unmatched. The private chef prepared the most incredible Thai dishes. Rocking Chair is unforgettable.",
                name: "Emma Laurent",
                location: "Paris, France",
              },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white/[0.035] border border-white/10 hover:border-[#d4bca3]/30 rounded-[1.25rem] p-[clamp(1.5rem,3vw,2.5rem)] backdrop-blur-sm transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4bca3]/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute -top-10 right-8 h-24 w-24 rounded-full bg-[#d4bca3]/10 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <Quote className="w-8 h-8 text-[#d4bca3]/50 mb-6" strokeWidth={1.5} />
                <div className="flex items-center justify-center gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-[#d4bca3] fill-[#d4bca3]" />
                  ))}
                </div>
                <blockquote className="font-playfair text-white/90 leading-loose italic mb-[clamp(1.75rem,4vw,2.5rem)] flex-1"
                  style={{ fontSize: "clamp(1.05rem, 1.7vw, 1.45rem)" }}>
                  "{item.quote}"
                </blockquote>
                <div className="pt-[clamp(1.5rem,3vw,2rem)] border-t border-white/10 w-full">
                  <p className="text-white text-base font-medium">{item.name}</p>
                  <p className="text-white/50 text-sm font-light mt-1.5 tracking-wide">{item.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Sanctuaries Section */}
      <section
        id="sanctuaries"
        className="relative isolate w-full flex flex-col items-center overflow-hidden px-6"
        style={{
          background: "linear-gradient(to bottom, #f7f5f0 0%, #f7f5f0 15%, #e2d8ce 40%, #1a202c 60%, #1a202c 85%, #e2d8ce 95%, #f7f5f0 100%)",
          paddingTop: "clamp(2rem, 5vw, 4rem)",
          paddingBottom: "0"
        }}
      >
        <motion.div
          className="absolute right-[-10%] top-[18%] z-0 h-[clamp(14rem,24vw,26rem)] w-[clamp(14rem,24vw,26rem)] rounded-full bg-[#d4bca3]/20 blur-[110px]"
          animate={{ y: [0, -24, 0], opacity: [0.45, 0.75, 0.45], scale: [1, 1.06, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[-12%] bottom-[16%] z-0 h-[clamp(16rem,28vw,30rem)] w-[clamp(16rem,28vw,30rem)] rounded-full bg-[#8c6d53]/14 blur-[130px]"
          animate={{ y: [0, 28, 0], opacity: [0.32, 0.58, 0.32], scale: [1, 1.08, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[clamp(1.25rem,6vw,8rem)]">
          {/* Part 1: Header - Full Viewport */}
          <div className="min-h-[100vh] flex flex-col justify-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center"
            >
              <div className="flex items-center justify-center gap-[clamp(0.9rem,3vw,1.25rem)] mb-[clamp(2rem,5vw,4rem)]">
                <div className="h-[1px] w-[clamp(2.25rem,8vw,6rem)] bg-[#8c6d53]/60" />
                <span className="text-center text-[#8c6d53] font-light lowercase tracking-[clamp(0.25em,1vw,0.55em)]"
                  style={{ fontSize: "clamp(0.85rem, 1.45vw, 1.2rem)" }}>
                  our sanctuaries
                </span>
                <div className="h-[1px] w-[clamp(2.25rem,8vw,6rem)] bg-[#8c6d53]/60" />
              </div>

              <div className="flex justify-center">
                <div className="inline-grid max-w-full grid-cols-[1fr_auto_1fr] items-center gap-x-[clamp(0.65rem,3vw,3.5rem)] text-[#050505] font-light lowercase leading-[1.35]"
                  style={{ fontSize: "clamp(2rem, 7vw, 5.7rem)", letterSpacing: "clamp(0.1em, 1.7vw, 0.28em)" }}>
                  <div className="text-right">space</div>
                  <div className="text-[#8c6d53]/60 leading-none tracking-normal">·</div>
                  <div className="text-left">shape</div>

                  <div className="text-right">for</div>
                  <div className="text-[#8c6d53]/60 leading-none tracking-normal">·</div>
                  <div className="text-left text-[#d4c8a7]">stillness</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Part 2: Styles Selection & Villa Cards - Grouped Together */}
          <div className="min-h-[100vh] flex flex-col justify-evenly py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-end gap-6"
            >
              <span className="text-[#8c6d53] font-light lowercase tracking-[0.45em]"
                style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.4rem)" }}>
                select your styles
              </span>
              <div className="h-[1px] w-[clamp(4rem,10vw,7rem)] bg-[#8c6d53]/60" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(2.5rem,6vw,5rem)] items-start">
              {villas.map((villa) => (
                <motion.div
                  key={villa.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <span className="absolute -top-[clamp(2.4rem,5vw,3.5rem)] left-0 z-20 font-playfair text-[#d4c8a7] leading-none"
                    style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}>
                    {villa.id}
                  </span>
                  <motion.button
                    type="button"
                    onClick={() => setExpandedBookingCard(villa.key)}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative w-full aspect-[1.45/1] overflow-hidden rounded-[1.35rem] border border-white/10 shadow-xl shadow-[#8c6d53]/10 outline-none transition-shadow duration-700 hover:shadow-2xl hover:shadow-[#8c6d53]/25"
                  >
                    <ImageWithFallback
                      src={villa.image}
                      alt={villa.alt}
                      className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a202c]/55 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-[1200ms] group-hover:left-[120%] group-hover:opacity-100" />
                    <div className="absolute left-5 top-5 h-2 w-2 rounded-full bg-[#d4bca3] shadow-[0_0_24px_rgba(212,188,163,0.9)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white lowercase tracking-[0.35em] whitespace-nowrap"
                      style={{ fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)" }}>
                      check availability
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedBookingVilla && (
          <motion.div
            key="booking-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[95] flex items-end justify-end bg-[#1a202c]/45 px-0 backdrop-blur-sm md:items-stretch"
            onClick={() => setExpandedBookingCard(null)}
          >
            <motion.div
              initial={{ opacity: 0, x: 32, y: 32 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 32, y: 32 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[92vh] w-full overflow-y-auto rounded-t-[2rem] bg-[#f7f5f0] p-[clamp(0.9rem,3vw,1.5rem)] shadow-2xl shadow-[#1a202c]/30 md:h-full md:max-h-none md:w-[min(900px,76vw)] md:rounded-l-[2rem] md:rounded-tr-none"
              onClick={(event) => event.stopPropagation()}
            >
              <BookingWidget
                onClose={() => setExpandedBookingCard(null)}
                pricePerNight={selectedBookingVilla.price}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Section */}
      <footer className="w-full bg-[#f7f5f0] text-[#1a202c]/70 border-t border-[#e2d8ce]/40"
        style={{ padding: "clamp(4rem, 10vw, 8rem) 0 clamp(2.5rem, 5vw, 4rem)" }}>
        <div className="w-full max-w-[1440px] mx-auto px-[clamp(1.5rem,5vw,6rem)]">
          {/* Top Grid: 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[clamp(2.5rem,5vw,4rem)] mb-[clamp(3rem,8vw,5rem)]">
            {/* Brand */}
            <div className="lg:col-span-4 flex flex-col">
              <h4 className="font-playfair text-[#1a202c] mb-4"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>Rocking Chair</h4>
              <p className="text-[#1a202c]/60 font-light leading-relaxed mb-8 max-w-xs"
                style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.95rem)" }}>
                Koh Samui's premier private pool villa retreat. Where tropical elegance meets thoughtful hospitality.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Instagram" className="w-[clamp(2rem,3vw,2.5rem)] h-[clamp(2rem,3vw,2.5rem)] rounded-full border border-[#8c6d53]/20 flex items-center justify-center text-[#8c6d53]/60 hover:bg-[#8c6d53] hover:border-[#8c6d53] hover:text-white transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" aria-label="Facebook" className="w-[clamp(2rem,3vw,2.5rem)] h-[clamp(2rem,3vw,2.5rem)] rounded-full border border-[#8c6d53]/20 flex items-center justify-center text-[#8c6d53]/60 hover:bg-[#8c6d53] hover:border-[#8c6d53] hover:text-white transition-all">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            {/* Navigate */}
            <div className="lg:col-span-2">
              <h5 className="text-[#1a202c] font-semibold tracking-widest uppercase mb-6"
                style={{ fontSize: "clamp(0.65rem, 1vw, 0.75rem)" }}>Navigate</h5>
              <ul className="flex flex-col gap-4 font-light">
                {["Home", "Villas", "Experiences", "Gallery", "Contact"].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[#1a202c]/50 hover:text-[#8c6d53] transition-colors"
                      style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)" }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h5 className="text-[#1a202c] font-semibold tracking-widest uppercase mb-6"
                style={{ fontSize: "clamp(0.65rem, 1vw, 0.75rem)" }}>Contact</h5>
              <ul className="flex flex-col gap-5 font-light">
                <li className="flex items-start gap-3 text-[#1a202c]/50"
                  style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)" }}>
                  <MapPin size={18} className="shrink-0 mt-0.5 text-[#8c6d53]" />
                  <span>Chaweng Noi, Koh Samui, Surat Thani 84320, Thailand</span>
                </li>
                <li className="flex items-center gap-3 text-[#1a202c]/50 hover:text-[#8c6d53] transition-colors"
                  style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)" }}>
                  <Phone size={18} className="shrink-0 text-[#8c6d53]" />
                  <a href="tel:+66123456789">+66 (0)12 345 6789</a>
                </li>
                <li className="flex items-center gap-3 text-[#1a202c]/50 hover:text-[#8c6d53] transition-colors"
                  style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)" }}>
                  <Mail size={18} className="shrink-0 text-[#8c6d53]" />
                  <a href="mailto:hello@rockingchair.com">hello@rockingchair.com</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-3">
              <h5 className="text-[#1a202c] font-semibold tracking-widest uppercase mb-6"
                style={{ fontSize: "clamp(0.65rem, 1vw, 0.75rem)" }}>Stay Inspired</h5>
              <p className="text-[#1a202c]/50 font-light leading-relaxed mb-6"
                style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)" }}>
                Receive seasonal offers and exclusive stories from our villa.
              </p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white border border-[#e2d8ce]/60 rounded-full pl-6 pr-14 py-3.5 text-sm text-[#1a202c] placeholder:text-stone-400 focus:outline-none focus:border-[#8c6d53] transition-colors"
                  style={{ fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)" }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#8c6d53] text-white flex items-center justify-center hover:bg-[#a08266] transition-colors shadow-lg shadow-[#8c6d53]/20"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-[#e2d8ce]/60 mb-8"></div>

          {/* Bottom Bar */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[#1a202c]/40"
            style={{ fontSize: "clamp(0.7rem, 1vw, 0.8rem)" }}>
            <p>&copy; {new Date().getFullYear()} Rocking Chair Pool Villa. All rights reserved.</p>
            <div className="flex flex-wrap justify-center items-center gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-2">
              <a href="#" className="hover:text-[#8c6d53] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#8c6d53] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#8c6d53] transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-[#8c6d53] transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Navigation Bar (Fixed & Responsive to Scroll) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-center ${isScrolled
          ? "py-3 bg-[#1a202c]/95 backdrop-blur-md shadow-lg"
          : "py-6 bg-gradient-to-b from-[#1a202c]/70 to-transparent"
          }`}
      >
        <div className="w-[90%] lg:w-[85%] max-w-[1440px] flex items-center relative justify-between">
          {/* Left Logo */}
          <div
            className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-start cursor-pointer shrink-0"
          >
            {/* ไม่มีวงกลมแล้ว ใช้ Drop Shadow แบบเรืองแสง/กระจก เพื่อให้แนบไปกับขอบรูปโลโก้แทน */}
            <div
              className="relative flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: isScrolled ? 'clamp(64px, 10vw, 120px)' : 'clamp(96px, 15vw, 200px)',
                height: isScrolled ? 'clamp(64px, 10vw, 120px)' : 'clamp(96px, 15vw, 200px)'
              }}
            >
              <ImageWithFallback
                src="https://huktvoldmkiahhyrvwqn.supabase.co/storage/v1/object/public/villa-images/final11.png"
                alt="Rocking Chair Logo"
                className="w-full h-full object-contain transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
              />
            </div>
          </div>

          {/* Right Links + Actions */}
          <div className="hidden lg:flex items-center justify-end gap-10 flex-1">
            {["Home", "Villas", "Experiences", "Gallery", "Contact"].map((link) => (
              <div
                key={link}
                className="relative cursor-pointer py-2 group"
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span className="text-xs font-semibold tracking-widest uppercase text-white/80 group-hover:text-white transition-colors duration-300">
                  {link}
                </span>
                <div
                  className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${hoveredLink === link ? "w-full" : "w-0"}`}
                />
              </div>
            ))}
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest cursor-pointer">
              <span className="text-white/60 hover:text-white transition-colors">TH</span>
              <span className="text-white/40">|</span>
              <span className="text-white">EN</span>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-4 lg:hidden ml-auto">
            <button
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#1a202c]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {/* Close Button Inside Overlay */}
            <button
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-2xl font-playfair tracking-wide hover:text-[#d4bca3] transition-colors"
              >
                {link}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-8 text-white px-10 py-3.5 rounded-lg text-sm font-semibold tracking-widest uppercase transition-all active:scale-95 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: "#8c6d53" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Direct
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div >
  );
}
