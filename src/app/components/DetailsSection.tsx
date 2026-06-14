import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "../hooks/useInView";

const details = [
  { label: "FULL NAME", value: "Master Chibuike", sub: "Gift of God" },
  { label: "DEDICATED ON", value: "June 14, 2026", sub: "Sunday" },
  { label: "MEANING", value: "Chi bu ike", sub: "God is my strength" },
  { label: "BLESSED BY", value: "Family & Friends", sub: "With love & prayers" },
];

export function DetailsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a0e] via-[#120918] to-[#0d0a0e]" />

      {/* Large decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ opacity: 0.03 }}
      >
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: "20vw", color: "#c9a84c", whiteSpace: "nowrap" }}>
          CHIBUIKE
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
          <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", letterSpacing: "0.3em", fontSize: "0.7rem" }}>
            HIS STORY
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {details.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group relative"
            >
              <div
                className="relative p-8 border border-[rgba(201,168,76,0.12)] transition-all duration-500 group-hover:border-[rgba(201,168,76,0.4)] group-hover:bg-[rgba(201,168,76,0.04)] cursor-default"
                style={{ background: "rgba(26,17,24,0.6)" }}
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#c9a84c]/50 group-hover:border-[#c9a84c] transition-colors duration-300" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#c9a84c]/50 group-hover:border-[#c9a84c] transition-colors duration-300" />

                <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.6rem", letterSpacing: "0.3em", marginBottom: "1rem", opacity: 0.7 }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#f5ede0", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontWeight: 600, lineHeight: 1.3, marginBottom: "0.5rem" }}>
                  {item.value}
                </p>
                <p style={{ fontFamily: "'Lora', serif", color: "#a08060", fontSize: "0.8rem", fontStyle: "italic" }}>
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-16 relative mx-auto max-w-2xl"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#c9a84c]/20 via-[#7c3f8e]/20 to-[#c9a84c]/20 blur-lg" />
          <div className="relative border border-[rgba(201,168,76,0.25)] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1582486225644-aeacf6aa0b1b?w=1200&h=600&fit=crop&auto=format"
              alt="Adult hand holding tiny baby hand"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a0e]/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#e8d5a3", fontSize: "1.1rem", fontStyle: "italic", opacity: 0.9 }}>
                Every tiny hand holds the promise of greatness
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
