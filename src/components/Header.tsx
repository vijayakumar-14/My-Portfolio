import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Calculator } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = ["Home", "Skills", "Education", "Projects", "LeetCode", "Contact"];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (!isHome) return;
    setMobileOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const logoLink = isHome ? (
    <button onClick={() => scrollTo("Home")} className="text-xl font-bold text-gradient-neon" style={{ fontFamily: "'Dancing Script', cursive" }}>
      Vijaya Kumar A
    </button>
  ) : (
    <Link to="/" className="text-xl font-bold text-gradient-neon" style={{ fontFamily: "'Dancing Script', cursive" }}>
      Vijaya Kumar A
    </Link>
  );

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {logoLink}

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {isHome && navLinks.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </button>
          ))}
          <Link
            to="/grade-calculator"
            className="text-sm text-primary hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <Calculator size={14} />
            Grade Calculator
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-4"
        >
          {isHome && navLinks.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="block w-full text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
