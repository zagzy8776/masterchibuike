import { motion } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "../hooks/useInView";
import { Heart, Loader2 } from "lucide-react";
import {
  fetchBlessings,
  postBlessing,
  toggleLike,
  getFingerprint,
  type Blessing,
} from "../../utils/api";

export function BlessingsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const fingerprint = getFingerprint();

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchBlessings();
      setBlessings(data);
    } catch {
      // fail silently — API may not be running yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleLike = async (id: number) => {
    // Optimistic update
    const alreadyLiked = likedIds.has(id);
    setLikedIds((prev) => {
      const next = new Set(prev);
      alreadyLiked ? next.delete(id) : next.add(id);
      return next;
    });
    setBlessings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, likes: alreadyLiked ? b.likes - 1 : b.likes + 1 } : b
      )
    );

    try {
      const result = await toggleLike(id, fingerprint);
      setBlessings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, likes: result.likes } : b))
      );
      setLikedIds((prev) => {
        const next = new Set(prev);
        result.liked ? next.add(id) : next.delete(id);
        return next;
      });
    } catch {
      // revert on error
      setLikedIds((prev) => {
        const next = new Set(prev);
        alreadyLiked ? next.add(id) : next.delete(id);
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) {
      setSubmitError("Please enter your name and a message.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const saved = await postBlessing({
        name: newName.trim(),
        relation: newRelation.trim() || "Friend",
        message: newMessage.trim(),
      });
      setBlessings((prev) => [saved, ...prev]);
      setNewName("");
      setNewRelation("");
      setNewMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setSubmitError("Could not save blessing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a0e] via-[#0f0b15] to-[#0d0a0e]" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#c9a84c]"
            style={{ left: `${(i * 37 + 5) % 100}%`, top: `${(i * 53 + 10) % 100}%`, opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0], y: [-10, -40, -60] }}
            transition={{ repeat: Infinity, duration: 3 + (i % 3), delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
          <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", letterSpacing: "0.3em", fontSize: "0.7rem" }}>
            WALL OF BLESSINGS
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-14"
          style={{ fontFamily: "'Lora', serif", color: "#a08060", fontStyle: "italic", fontSize: "0.95rem" }}
        >
          Prayers and love poured out for Master Chibuike
        </motion.p>

        {/* Blessings grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={28} color="#c9a84c" className="animate-spin" style={{ opacity: 0.5 }} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {blessings.map((blessing, i) => (
              <motion.div
                key={blessing.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.07 }}
                className="group relative"
              >
                <div
                  className="relative p-6 border border-[rgba(201,168,76,0.12)] h-full flex flex-col gap-4 transition-all duration-300 group-hover:border-[rgba(201,168,76,0.3)] group-hover:bg-[rgba(201,168,76,0.025)]"
                  style={{ background: "rgba(26,17,24,0.7)" }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p style={{ fontFamily: "'Playfair Display', serif", color: "#f5ede0", fontWeight: 600, fontSize: "1rem" }}>
                        {blessing.name}
                      </p>
                      <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.6rem", letterSpacing: "0.2em", opacity: 0.7, marginTop: "2px" }}>
                        {blessing.relation}
                      </p>
                    </div>
                    <button
                      onClick={() => handleLike(blessing.id)}
                      className="flex items-center gap-1.5 transition-all duration-200 hover:scale-110 active:scale-95"
                      style={{ color: likedIds.has(blessing.id) ? "#c9a84c" : "#a08060" }}
                    >
                      <Heart
                        size={14}
                        fill={likedIds.has(blessing.id) ? "#c9a84c" : "none"}
                        stroke={likedIds.has(blessing.id) ? "#c9a84c" : "#a08060"}
                      />
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem" }}>{blessing.likes}</span>
                    </button>
                  </div>
                  <p style={{ fontFamily: "'Lora', serif", color: "#c8bfb0", fontSize: "0.9rem", lineHeight: 1.7, fontStyle: "italic", flex: 1 }}>
                    "{blessing.message}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add blessing form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="p-8 border border-[rgba(201,168,76,0.2)]"
            style={{ background: "rgba(26,17,24,0.8)" }}
          >
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#f5ede0", fontSize: "1.25rem", fontWeight: 600, textAlign: "center", marginBottom: "1.5rem" }}>
              Leave Your Blessing
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="text-3xl mb-3">🙏</div>
                <p style={{ fontFamily: "'Lora', serif", color: "#c9a84c", fontStyle: "italic" }}>
                  Your blessing has been received. Thank you!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your name *"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-transparent border border-[rgba(201,168,76,0.2)] px-4 py-3 outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-[#a08060]/40"
                    style={{ fontFamily: "'Lora', serif", color: "#f5ede0", fontSize: "0.9rem" }}
                  />
                  <input
                    type="text"
                    placeholder="Your relation (e.g. Uncle)"
                    value={newRelation}
                    onChange={(e) => setNewRelation(e.target.value)}
                    className="bg-transparent border border-[rgba(201,168,76,0.2)] px-4 py-3 outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-[#a08060]/40"
                    style={{ fontFamily: "'Lora', serif", color: "#f5ede0", fontSize: "0.9rem" }}
                  />
                </div>
                <textarea
                  placeholder="Write your blessing or prayer for Chibuike..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                  className="bg-transparent border border-[rgba(201,168,76,0.2)] px-4 py-3 outline-none focus:border-[#c9a84c]/60 transition-colors placeholder:text-[#a08060]/40 resize-none"
                  style={{ fontFamily: "'Lora', serif", color: "#f5ede0", fontSize: "0.9rem" }}
                />
                {submitError && (
                  <p style={{ fontFamily: "'Lora', serif", color: "#d4183d", fontSize: "0.8rem", fontStyle: "italic" }}>
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 border border-[#c9a84c] px-8 py-3 transition-all duration-300 hover:bg-[#c9a84c]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.7rem", letterSpacing: "0.3em" }}
                >
                  {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
                  {submitting ? "SENDING..." : "SEND BLESSING"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
