import { Film, Headphones, Mic2, Music, Radio, Volume2 } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Music,
    title: "Music Production",
    desc: "Full-scale music production from concept to mastered track, blending modern techniques with timeless artistry.",
  },
  {
    icon: Radio,
    title: "Beat Making",
    desc: "Custom beats across genres — Hip-Hop, R&B, Pop, Bollywood, Electronic. Every rhythm crafted for impact.",
  },
  {
    icon: Mic2,
    title: "Song Making",
    desc: "Songwriting, arrangement, and production services to bring your musical vision to life from scratch.",
  },
  {
    icon: Volume2,
    title: "Voice Over",
    desc: "Professional voice over recording for advertisements, documentaries, e-learning, and corporate content.",
  },
  {
    icon: Film,
    title: "Voice Dubbing",
    desc: "Accurate and expressive dubbing for films, series, and animation in multiple languages.",
  },
  {
    icon: Headphones,
    title: "Mixing & Mastering",
    desc: "Radio-ready mixes and masters that translate perfectly across all playback systems and platforms.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad bg-background relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-gold-dim text-xs uppercase tracking-[0.3em] mb-3 font-body">
            What We Do
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Our <span className="gold-gradient">Services</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-6 bg-card border border-border rounded-sm hover:border-gold/50 hover:glow-gold transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <s.icon className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
