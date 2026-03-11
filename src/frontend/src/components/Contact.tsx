import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const services = [
  "Music Production",
  "Beat Making",
  "Song Making",
  "Voice Over",
  "Voice Dubbing",
  "Mixing & Mastering",
];

export default function Contact() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Studio not connected yet, please try again.");
      return;
    }
    setLoading(true);
    try {
      await actor.submitBooking(
        form.name,
        form.email,
        form.service,
        form.message,
      );
      toast.success("Booking request sent! We'll be in touch soon.");
      setForm({ name: "", email: "", service: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-pad bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-gold-dim text-xs uppercase tracking-[0.3em] mb-3 font-body">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Book a <span className="gold-gradient">Session</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-muted-foreground text-xs uppercase tracking-wider font-body"
            >
              Name
            </Label>
            <Input
              id="name"
              data-ocid="contact.input"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
              className="bg-card border-border focus:border-gold"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-muted-foreground text-xs uppercase tracking-wider font-body"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              data-ocid="contact.input"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              required
              className="bg-card border-border focus:border-gold"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label
              htmlFor="service"
              className="text-muted-foreground text-xs uppercase tracking-wider font-body"
            >
              Service
            </Label>
            <select
              id="service"
              data-ocid="contact.select"
              value={form.service}
              onChange={(e) =>
                setForm((p) => ({ ...p, service: e.target.value }))
              }
              required
              className="w-full h-10 px-3 text-sm bg-card border border-border rounded-sm text-foreground focus:outline-none focus:border-gold font-body"
            >
              <option value="">Select a service…</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label
              htmlFor="message"
              className="text-muted-foreground text-xs uppercase tracking-wider font-body"
            >
              Message
            </Label>
            <Textarea
              id="message"
              data-ocid="contact.textarea"
              placeholder="Tell us about your project…"
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              rows={5}
              className="bg-card border-border focus:border-gold resize-none"
            />
          </div>

          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={loading}
              data-ocid="contact.submit_button"
              className="w-full sm:w-auto px-10 bg-gold text-background hover:opacity-90 font-body font-semibold rounded-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Send Request
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
