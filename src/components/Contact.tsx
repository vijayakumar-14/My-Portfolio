import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);
    // Simulate send — EmailJS can be wired in later
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  const contactInfo = [
    { icon: <Mail size={18} />, label: "vijayakumar.arunachalam2007@gmail.com", href: "mailto:vijayakumar.arunachalam2007@gmail.com" },
    { icon: <Phone size={18} />, label: "+91 73973 05968", href: "tel:+917397305968" },
    { icon: <Github size={18} />, label: "github.com/vijayakumar-14", href: "https://github.com/vijayakumar-14" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com/in/vijayakumar-arunachalam-b81320375" },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gradient-purple-blue text-center mb-12"
        >
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed mb-6">
              Feel free to reach out for collaborations, project discussions, or just to say hello!
            </p>
            {contactInfo.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <span className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">{c.icon}</span>
                <span className="text-sm break-all">{c.label}</span>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              required
            />
            <textarea
              placeholder="Your Message"
              maxLength={1000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              required
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 rounded-lg bg-gradient-neon text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 glow-purple"
            >
              {sending ? "Sending..." : sent ? "Sent! ✓" : <><Send size={16} /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
