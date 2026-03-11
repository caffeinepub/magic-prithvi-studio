import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

const LINE_KEYS = ["l1", "l2", "l3", "l4", "l5"];
const LINE_TOPS = [15, 33, 51, 69, 87];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-noise"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.15 75) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Horizontal lines decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {LINE_KEYS.map((k, i) => (
          <div
            key={k}
            className="absolute w-full border-t border-gold/5"
            style={{ top: `${LINE_TOPS[i]}%` }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-gold-dim text-xs uppercase tracking-[0.3em] mb-6 font-body"
        >
          Kolkata · Jadavpur
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
        >
          <span className="gold-gradient">Magic Prithvi</span>
          <br />
          <span className="text-foreground/90">Studio</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl font-body max-w-xl mx-auto leading-relaxed"
        >
          Where sound becomes art. Professional music production, beat making,
          voice overs & dubbing — crafted with soul in Kolkata.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            data-ocid="hero.primary_button"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-background font-body font-semibold text-sm rounded-sm hover:opacity-90 transition-opacity"
          >
            Book a Session
          </a>
          <a
            href="#services"
            data-ocid="hero.secondary_button"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gold/40 text-gold font-body font-semibold text-sm rounded-sm hover:border-gold hover:bg-gold/5 transition-all"
          >
            Our Services
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#services"
        className="absolute bottom-10 text-gold/40 hover:text-gold transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
