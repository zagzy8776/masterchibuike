import { HeroSection } from "./components/HeroSection";
import { ScriptureSection } from "./components/ScriptureSection";
import { DetailsSection } from "./components/DetailsSection";
import { MessageSection } from "./components/MessageSection";
import { FamilyGallery } from "./components/FamilyGallery";
import { BlessingsSection } from "./components/BlessingsSection";
import { PrayerSection } from "./components/PrayerSection";

export default function App() {
  return (
    /* MARKER-MAKE-KIT-INVOKED */
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{ background: "#0d0a0e", fontFamily: "'Lora', serif" }}
    >
      {/* Floating nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(13,10,14,0.9), transparent)", backdropFilter: "blur(4px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
          <span style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.7rem", letterSpacing: "0.3em" }}>
            MASTER CHIBUIKE
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "STORY", href: "#story" },
            { label: "SCRIPTURE", href: "#scripture" },
            { label: "GALLERY", href: "#gallery" },
            { label: "BLESSINGS", href: "#blessings" },
            { label: "PRAYER", href: "#prayer" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{ fontFamily: "'Cinzel', serif", color: "#a08060", fontSize: "0.6rem", letterSpacing: "0.25em" }}
              className="hover:text-[#c9a84c] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <div id="hero"><HeroSection /></div>
        <div id="scripture"><ScriptureSection /></div>
        <div id="story"><DetailsSection /></div>
        <MessageSection />
        <div id="gallery"><FamilyGallery /></div>
        <div id="blessings"><BlessingsSection /></div>
        <div id="prayer"><PrayerSection /></div>
      </main>

      <footer className="border-t border-[rgba(201,168,76,0.1)] py-10 text-center px-6">
        <p style={{ fontFamily: "'Cinzel', serif", color: "#c9a84c", fontSize: "0.65rem", letterSpacing: "0.4em", opacity: 0.5 }}>
          MASTER CHIBUIKE · DEDICATED JUNE 14, 2026 · GOD IS MY STRENGTH
        </p>
      </footer>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d0a0e; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.6); }
        * { scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.3) #0d0a0e; }
      `}</style>
    </div>
  );
}
