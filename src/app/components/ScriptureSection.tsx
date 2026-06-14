import { motion } from "motion/react";
import { useInView } from "../hooks/useInView";
import { useRef } from "react";

export function ScriptureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Candle light bg */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1577202356409-c6b24521c92d?w=1920&h=1000&fit=crop&auto=format"
          alt="Candle light"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a0e] via-[#12091a]/90 to-[#0d0a0e]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#c9a84c]" />
          <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", letterSpacing: "0.3em", fontSize: "0.7rem" }}>
            THE WORD OF GOD
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#c9a84c]" />
        </motion.div>

        {/* Scripture quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
            fontStyle: "italic",
            color: "#f5ede0",
            lineHeight: 1.7,
            letterSpacing: "0.01em",
          }}
        >
          <span style={{ color: "#c9a84c", fontSize: "3em", lineHeight: 0, verticalAlign: "-0.3em", marginRight: "0.1em", fontStyle: "normal" }}>"</span>
          Before I formed you in the womb I knew you, before you were born I set you apart; I appointed you as a prophet to the nations.
          <span style={{ color: "#c9a84c", fontSize: "3em", lineHeight: 0, verticalAlign: "-0.3em", marginLeft: "0.1em", fontStyle: "normal" }}>"</span>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8"
          style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", letterSpacing: "0.2em", fontSize: "0.85rem" }}
        >
          JEREMIAH 1:5
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
          <div className="w-2 h-2 rotate-45 border border-[#c9a84c]/50" />
          <div className="h-px w-8 bg-[#c9a84c]/50" />
          <div className="w-3 h-3 rotate-45 border border-[#c9a84c] bg-[#c9a84c]/20" />
          <div className="h-px w-8 bg-[#c9a84c]/50" />
          <div className="w-2 h-2 rotate-45 border border-[#c9a84c]/50" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
        </motion.div>
      </div>
    </section>
  );
}
