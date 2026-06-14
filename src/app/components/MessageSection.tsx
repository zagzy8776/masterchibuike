import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "../hooks/useInView";

export function MessageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Family photo background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1647616927583-1d44a79a38a5?w=1920&h=1000&fit=crop&auto=format"
          alt="Joyful family"
          className="w-full h-full object-cover opacity-10 object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a0e] via-[#1a0d2e]/95 to-[#0d0a0e]" />
      </div>

      {/* Purple glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7c3f8e]/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
          <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", letterSpacing: "0.3em", fontSize: "0.7rem" }}>
            A LETTER FROM YOUR FRIEND
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Outer glow */}
          <div className="absolute -inset-px bg-gradient-to-br from-[#c9a84c]/30 via-transparent to-[#7c3f8e]/30 blur-sm rounded-sm" />

          <div
            className="relative p-10 md:p-16 border border-[rgba(201,168,76,0.2)]"
            style={{ background: "rgba(26,17,24,0.85)", backdropFilter: "blur(12px)" }}
          >
            {/* Quote icon */}
            <div
              className="mb-8"
              style={{ fontFamily: "'Playfair Display', serif", color: "#c9a84c", fontSize: "5rem", lineHeight: 0.8, opacity: 0.4 }}
            >
              "
            </div>

            <div style={{ fontFamily: "'Lora', serif", color: "#e8d5a3", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.9 }}>
              <p className="mb-6">
                Dear Master Chibuike,
              </p>
              <p className="mb-6">
                Today, on this sacred day of your dedication, the world pauses to celebrate the miracle that you are. You arrived not by accident, but by divine appointment — chosen before the foundations of the earth were laid, known before you drew your very first breath.
              </p>
              <p className="mb-6">
                Your name carries a powerful truth: <em style={{ color: "#c9a84c" }}>Chi bu ike</em> — God is my strength. May that truth anchor every step you take, every dream you dare to dream, and every storm you are called to face.
              </p>
              <p className="mb-6">
                Though I couldn't be there in person today, know that this gift was built with every ounce of love I carry for you and your wonderful family. You are surrounded by people who will cheer you on, lift you up, and point you always toward the One who formed you.
              </p>
              <p>
                Grow mighty, Chibuike. The world is waiting for you.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#c9a84c]/20" />
              <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.75rem", letterSpacing: "0.2em" }}>
                WITH ALL MY LOVE
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
