import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

const prayerLines = [
  "May your path be lit by grace,",
  "and your feet never stumble in darkness.",
  "May wisdom be your crown,",
  "and kindness the robe you wear each day.",
  "May every door before you open wide,",
  "and every blessing find you where you stand.",
  "May God who formed you before time",
  "guide every breath you breathe.",
  "Rise, Chibuike.",
  "The world awaits what God has placed within you.",
];

export function PrayerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [candleLit, setCandleLit] = useState(false);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Golden bokeh background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1597972090332-bf44fceb6364?w=1920&h=1000&fit=crop&auto=format"
          alt="Warm bokeh lights"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a0e] via-[#0f0c05]/90 to-[#0d0a0e]" />
      </div>

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#c9a84c]/8 blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
          <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", letterSpacing: "0.3em", fontSize: "0.7rem" }}>
            A CLOSING PRAYER
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
        </motion.div>

        {/* Prayer lines */}
        <div className="flex flex-col gap-1 mb-16">
          {prayerLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              style={{
                fontFamily: i >= 8 ? "'Playfair Display', serif" : "'Cormorant Garamond', serif",
                fontSize: i >= 8 ? "clamp(1.4rem, 3.5vw, 2.2rem)" : "clamp(1.1rem, 2.5vw, 1.6rem)",
                color: i >= 8 ? "#c9a84c" : "#e8d5a3",
                fontStyle: "italic",
                fontWeight: i >= 8 ? 700 : 400,
                lineHeight: 1.6,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Interactive candle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center gap-4"
        >
          <p style={{ fontFamily: "'Cinzel', serif", color: "#a08060", fontSize: "0.65rem", letterSpacing: "0.25em" }}>
            LIGHT A CANDLE FOR CHIBUIKE
          </p>
          <button
            onClick={() => setCandleLit(!candleLit)}
            className="relative transition-transform duration-200 hover:scale-110 active:scale-95"
            aria-label="Light candle"
          >
            <CandleSVG lit={candleLit} />
          </button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: candleLit ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "'Lora', serif", color: "#c9a84c", fontStyle: "italic", fontSize: "0.9rem" }}
          >
            Your prayer rises like incense before God.
          </motion.p>
        </motion.div>

        {/* Final ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 2 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
            <div className="w-2 h-2 rotate-45 bg-[#c9a84c]/40" />
            <div className="w-3 h-3 rotate-45 border border-[#c9a84c]/60" />
            <div className="w-2 h-2 rotate-45 bg-[#c9a84c]/40" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
          </div>
          <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.6rem", letterSpacing: "0.4em", opacity: 0.5, marginTop: "0.5rem" }}>
            CHIBUIKE · 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CandleSVG({ lit }: { lit: boolean }) {
  return (
    <svg width="48" height="90" viewBox="0 0 48 90" fill="none">
      {/* Flame */}
      {lit && (
        <>
          <motion.ellipse
            cx="24" cy="18" rx="6" ry="10"
            fill="#c9a84c"
            opacity={0.9}
            animate={{ ry: [10, 12, 9, 11, 10], cx: [24, 23.5, 24.5, 24, 24] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="24" cy="20" rx="3" ry="6"
            fill="#fff7e0"
            opacity={0.95}
            animate={{ ry: [6, 8, 5, 7, 6] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          />
          {/* Glow */}
          <motion.ellipse
            cx="24" cy="18" rx="12" ry="14"
            fill="#c9a84c"
            opacity={0.12}
            animate={{ rx: [12, 16, 11, 14, 12], ry: [14, 18, 13, 16, 14] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          />
        </>
      )}
      {!lit && (
        <ellipse cx="24" cy="22" rx="3" ry="4" fill="#555" opacity={0.5} />
      )}
      {/* Wick */}
      <line x1="24" y1={lit ? "28" : "26"} x2="24" y2="34" stroke="#333" strokeWidth="1.5" />
      {/* Candle body */}
      <rect x="14" y="34" width="20" height="48" rx="2" fill="#f5ede0" opacity={lit ? 0.95 : 0.4} />
      <rect x="14" y="34" width="5" height="48" rx="2" fill="white" opacity={lit ? 0.3 : 0.1} />
      {/* Wax drips */}
      {lit && (
        <>
          <path d="M14 44 Q12 50, 13 58" stroke="#f5ede0" strokeWidth="4" strokeLinecap="round" fill="none" opacity={0.5} />
          <path d="M30 48 Q32 54, 31 62" stroke="#f5ede0" strokeWidth="3" strokeLinecap="round" fill="none" opacity={0.4} />
        </>
      )}
      {/* Base */}
      <rect x="10" y="82" width="28" height="6" rx="1" fill="#c9a84c" opacity={0.7} />
    </svg>
  );
}
