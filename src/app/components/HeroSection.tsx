import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import chibuikePhoto from "../../imports/WhatsApp_Image_2026-06-10_at_11.23.40_AM.jpeg";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-[#0d0a0e]"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=1920&h=1080&fit=crop&auto=format"
          alt="Parent holding baby's tiny finger"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Deep vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,10,14,0.3)_0%,rgba(13,10,14,0.92)_75%)]" />

      {/* Gold glow beneath portrait */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#c9a84c]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top sacred label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="relative z-10 mb-8 flex flex-col items-center"
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]" />
          <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", letterSpacing: "0.35em", fontSize: "0.65rem" }}>
            A SACRED CELEBRATION
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]" />
        </div>
        <OrnamentSVG />
      </motion.div>

      {/* Layout: name left, portrait center, verse right */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">

        {/* Left — Name stack */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 text-center md:text-right"
        >
          <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", letterSpacing: "0.4em", fontSize: "clamp(0.55rem, 1.5vw, 0.75rem)", opacity: 0.7, marginBottom: "0.5rem" }}>
            WELCOME TO THE WORLD
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            color: "#f5ede0",
            textShadow: "0 0 80px rgba(201,168,76,0.25)",
          }}>
            Master
          </h1>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            color: "#c9a84c",
            fontStyle: "italic",
            textShadow: "0 0 60px rgba(201,168,76,0.5)",
          }}>
            Chibuike
          </h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#a08060", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", fontStyle: "italic", marginTop: "0.75rem" }}>
            God is my strength
          </p>
        </motion.div>

        {/* Center — Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-shrink-0"
        >
          {/* Outer ring */}
          <div className="absolute -inset-3 rounded-full border border-[#c9a84c]/20" />
          <div className="absolute -inset-6 rounded-full border border-[#c9a84c]/10" />

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-[#c9a84c]/15 blur-2xl scale-110" />

          {/* Photo frame */}
          <div
            className="relative w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-[#c9a84c]/50"
            style={{ boxShadow: "0 0 60px rgba(201,168,76,0.3), 0 0 120px rgba(201,168,76,0.15)" }}
          >
            <ImageWithFallback
              src={chibuikePhoto}
              alt="Master Chibuike on his dedication day"
              className="w-full h-full object-cover object-top"
            />
            {/* Inner vignette */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(13,10,14,0.5)_100%)]" />
          </div>

          {/* Date badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-1.5 border border-[#c9a84c]/40 whitespace-nowrap"
            style={{ background: "rgba(13,10,14,0.9)", backdropFilter: "blur(8px)" }}
          >
            <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.6rem", letterSpacing: "0.25em" }}>
              JUNE 14, 2026
            </span>
          </motion.div>
        </motion.div>

        {/* Right — Scripture teaser */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 text-center md:text-left"
        >
          <div className="h-px w-12 bg-[#c9a84c]/40 mb-5 hidden md:block" />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8d5a3", fontSize: "clamp(1rem, 2vw, 1.25rem)", fontStyle: "italic", lineHeight: 1.7, opacity: 0.85 }}>
            "Before I formed you in the womb, I knew you…"
          </p>
          <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.65rem", letterSpacing: "0.2em", marginTop: "0.75rem", opacity: 0.6 }}>
            JEREMIAH 1:5
          </p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-10 flex items-center gap-3 justify-center md:justify-start"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-[#c9a84c] to-transparent"
            />
            <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.55rem", letterSpacing: "0.3em", opacity: 0.5 }}>
              SCROLL
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function OrnamentSVG() {
  return (
    <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
      <path d="M0 10 Q20 2, 40 10 Q60 18, 80 10" stroke="#c9a84c" strokeWidth="0.75" fill="none" opacity="0.6" />
      <circle cx="40" cy="10" r="3" fill="#c9a84c" opacity="0.9" />
      <circle cx="20" cy="10" r="1.5" fill="#c9a84c" opacity="0.5" />
      <circle cx="60" cy="10" r="1.5" fill="#c9a84c" opacity="0.5" />
    </svg>
  );
}
