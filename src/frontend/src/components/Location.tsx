import { Clock, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

export default function Location() {
  return (
    <section
      id="location"
      className="section-pad bg-card border-y border-border"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-gold-dim text-xs uppercase tracking-[0.3em] mb-3 font-body">
            Find Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Our <span className="gold-gradient">Location</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <div>
                <div className="font-body font-semibold text-foreground mb-1">
                  Address
                </div>
                <p className="text-muted-foreground text-sm font-body">
                  Near Jadavpur, Kolkata
                  <br />
                  West Bengal, India
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-gold" />
              </div>
              <div>
                <div className="font-body font-semibold text-foreground mb-1">
                  Studio Hours
                </div>
                <p className="text-muted-foreground text-sm font-body">
                  Mon – Sat: 10:00 AM – 10:00 PM
                  <br />
                  Sunday: By appointment only
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-sm bg-green-500/10 flex items-center justify-center shrink-0">
                <SiWhatsapp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="font-body font-semibold text-foreground mb-1">
                  WhatsApp
                </div>
                <a
                  href="https://wa.me/919091672627"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 text-sm font-body hover:text-green-400 transition-colors flex items-center gap-2"
                >
                  <SiWhatsapp className="w-3.5 h-3.5" />
                  +91 90916 72627
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-gold" />
              </div>
              <div>
                <div className="font-body font-semibold text-foreground mb-1">
                  Email
                </div>
                <a
                  href="mailto:baraiprodip2@gmail.com"
                  className="text-gold text-sm font-body hover:text-gold-glow transition-colors"
                >
                  baraiprodip2@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-sm overflow-hidden border border-border h-72 bg-muted flex items-center justify-center"
          >
            <iframe
              title="Magic Prithvi Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14735.84741174597!2d88.3628!3d22.4996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271050000000%3A0x0!2sJadavpur%2C+Kolkata%2C+West+Bengal!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
