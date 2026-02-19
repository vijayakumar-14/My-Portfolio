import { motion } from "framer-motion";
import { Code2, PenTool, Terminal, Cpu, GitBranch } from "lucide-react";
import { ReactNode } from "react";

interface Skill {
  name: string;
  icon: ReactNode;
  progress: number;
  badge?: string;
}

const skills: Skill[] = [
  { name: "C Programming", icon: <Code2 size={28} />, progress: 90 },
  { name: "AutoCAD", icon: <PenTool size={28} />, progress: 80 },
  { name: "Python", icon: <Terminal size={28} />, progress: 85 },
  { name: "Arduino", icon: <Cpu size={28} />, progress: 90, badge: "Learning" },
  { name: "Data Structures & Algorithms", icon: <GitBranch size={28} />, progress: 40, badge: "Learning" },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-card border border-border rounded-xl p-6 card-hover relative"
  >
    {skill.badge && (
      <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-neon-green border border-neon-green/30 glow-green">
        {skill.badge}
      </span>
    )}
    <div className="text-primary mb-4">{skill.icon}</div>
    <h3 className="text-foreground font-semibold mb-3">{skill.name}</h3>
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.progress}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
        className="h-full rounded-full neon-progress-bar"
      />
    </div>
    
  </motion.div>
);

const Skills = () => (
  <section id="skills" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gradient-purple-blue text-center mb-12"
      >
        Skills
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((s, i) => (
          <SkillCard key={s.name} skill={s} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
