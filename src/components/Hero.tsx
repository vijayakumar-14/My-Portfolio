import { motion } from "framer-motion";

import { Code2, PenTool, Terminal, Cpu, GitBranch, Coffee, Download, Loader2 } from "lucide-react";
import resumeAsset from "@/assets/Vijaya_Kumar_1st_Yr_Resume_1.pdf.asset.json";
import { useState } from "react";

const skills = [
  { name: "C Programming", icon: <Code2 size={16} /> },
  { name: "Java", icon: <Coffee size={16} /> },
  { name: "AutoCAD", icon: <PenTool size={16} /> },
  { name: "Python", icon: <Terminal size={16} /> },
  { name: "Arduino", icon: <Cpu size={16} /> },
  { name: "DSA in Java", icon: <GitBranch size={16} /> },
];

const SkillsMarquee = () => {
  const doubled = [...skills, ...skills];
  return (
    <div className="w-full overflow-hidden border-t border-b border-border bg-muted/30 py-3 max-w-[100vw]">
      <div className="animate-marquee flex whitespace-nowrap">
        {doubled.map((s, i) => (
          <span key={i} className="mx-8 text-sm font-medium text-neon-green inline-flex items-center gap-2">
            <span className="text-primary">{s.icon}</span>
            {s.name}
            <span className="mx-4 text-muted-foreground">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const [downloading, setDownloading] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = async () => {
    try {
      setDownloading(true);
      const response = await fetch(resumeAsset.url);
      if (!response.ok) throw new Error("Failed to fetch resume");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Vijaya_Kumar_1st_Yr_Resume_1.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Resume download failed:", err);
      window.open(resumeAsset.url, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center bg-grid-pattern overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-56 md:w-80 h-56 md:h-80 rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 pt-24 pb-12 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-gradient-neon mb-4"
        >
          Vijaya Kumar A
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide mb-6"
        >
          Mechatronics Enthusiast
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Merging mechanical engineering, electronics, and computing to build intelligent systems.
          Passionate about robotics, automation, and solving complex problems through code and hardware.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href={resumeAsset.url}
            download="Vijaya_Kumar_1st_Yr_Resume_1.pdf"
            className="px-8 py-3 rounded-lg bg-gradient-neon text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-purple inline-flex items-center gap-2"
          >
            <Download size={18} />
            Get Resume
          </a>
          <button
            onClick={() => scrollTo("contact")}
            className="px-8 py-3 rounded-lg border border-foreground/30 text-foreground font-semibold hover:bg-foreground/5 transition-colors"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <div className="absolute bottom-0 left-0 right-0">
        <SkillsMarquee />
      </div>
    </section>
  );
};

export default Hero;
