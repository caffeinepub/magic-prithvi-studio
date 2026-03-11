import { Award, Clock, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: Award, label: "Years of Excellence", value: "8+" },
  { icon: Users, label: "Artists Worked With", value: "200+" },
  { icon: Clock, label: "Studio Hours Logged", value: "5000+" },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-pad bg-card border-y border-border relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background:
              "radial-gradient(ellipse at right top, oklch(0.78 0.15 75), transparent 60%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold-dim text-xs uppercase tracking-[0.3em] mb-3 font-body">
              Who We Are
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              The <span className="gold-gradient">Story</span> Behind the Sound
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed font-body mb-4">
              Magic Prithvi Studio is Kolkata's premier boutique recording
              facility, nestled in the heart of Jadavpur. Founded with a
              singular vision — to give every artist access to world-class sound
              production without leaving the city they love.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed font-body">
              From independent musicians and Bollywood collaborators to
              corporate brands seeking the perfect voice, we've shaped sounds
              that resonate. Our state-of-the-art equipment meets an intimate,
              creative atmosphere where magic genuinely happens.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
                className="flex items-center gap-5 p-5 bg-background border border-border rounded-sm"
              >
                <div className="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="font-display text-3xl font-bold gold-gradient">
                    {s.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-body">
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
