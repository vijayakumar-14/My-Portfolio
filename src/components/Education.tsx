import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

interface EducationItem {
  degree: string;
  school: string;
  year: string;
  description: string;
  badge?: string;
}
const education = [
  {
    degree: "Mechatronics Engineering Student",
    school: "Rajalakshmi Engineering College",
    year: "2025 – 2029",
    description: "Currently pursuing a Bachelor's in Mechatronics, focusing on robotics, automation, embedded systems, and intelligent manufacturing.",
    badge: "Current",
  },
  {
    degree: "Higher Secondary Education",
    school: "Seventh Day Adventist Matric Higher Secondary School",
    year: "2023 – 2025",
    description: "Strong foundation in Physics, Mathematics, and Computer Science fundamentals.",
  },
  {
    degree: "Primary & Secondary Education",
    school: "Little Jacky Matric Higher Secondary School",
    year: "2010 – 2023",
    description: "Completed primary and secondary schooling with a strong academic foundation.",
  },
];

const Education = () => (
  <section id="education" className="py-24 px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gradient-purple-blue text-center mb-12"
      >
        Education
      </motion.h2>

      <div className="space-y-6">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card border border-border rounded-xl p-6 card-hover relative"
          >
            {edu.badge && (
              <span className="absolute top-3 right-3 md:top-4 md:right-4 text-[10px] md:text-xs font-semibold px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-accent/15 text-neon-green border border-neon-green/30 glow-green">
                {edu.badge}
              </span>
            )}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{edu.school}</h3>
                <p className="text-sm text-muted-foreground mt-1">{edu.degree}</p>
                <div className="flex items-center gap-1.5 text-xs text-accent mt-2">
                  <Calendar size={12} />
                  {edu.year}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
