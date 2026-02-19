import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import LeetCode from "@/components/LeetCodeSection";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <Skills />
      <Education />
      <Projects />
      <LeetCode />
      <Contact />
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2025 Vijaya Kumar A. Built with passion.
      </footer>
    </div>
  );
};

export default Index;
