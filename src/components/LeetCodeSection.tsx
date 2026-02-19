import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Flame, TrendingUp } from "lucide-react";

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
}

const fallbackStats: LeetCodeStats = {
  totalSolved: 15,
  easySolved: 10,
  mediumSolved: 4,
  hardSolved: 1,
  totalEasy: 850,
  totalMedium: 1750,
  totalHard: 750,
};

const LeetCode = () => {
  const [stats, setStats] = useState<LeetCodeStats>(fallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const cacheBuster = `?t=${Date.now()}`;
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/vijayakumar_2007${cacheBuster}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.totalSolved !== undefined) {
            setStats({
              totalSolved: data.totalSolved,
              easySolved: data.easySolved,
              mediumSolved: data.mediumSolved,
              hardSolved: data.hardSolved,
              totalEasy: data.totalQuestions?.easy || 850,
              totalMedium: data.totalQuestions?.medium || 1750,
              totalHard: data.totalQuestions?.hard || 750,
            });
          }
        }
      } catch {
        // use fallback
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const difficulties = [
    { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "text-neon-green" },
    { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "text-yellow-400" },
    { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "text-red-400" },
  ];

  return (
    <section id="leetcode" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-gradient-purple-blue text-center mb-12"
        >
          LeetCode
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          {/* Total */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-primary mb-2">
              <Trophy size={24} />
              <span className="text-sm font-medium uppercase tracking-wider">Total Solved</span>
            </div>
            <p className="text-5xl font-black text-foreground">
              {loading ? "..." : stats.totalSolved}
            </p>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {difficulties.map((d) => (
              <div key={d.label} className="bg-muted rounded-xl p-4 text-center">
                <p className={`text-sm font-medium ${d.color}`}>{d.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{loading ? "..." : d.solved}</p>
                <p className="text-xs text-muted-foreground">/ {d.total}</p>
                <div className="w-full bg-background rounded-full h-1.5 mt-3">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(d.solved / d.total) * 100}%`,
                      background: d.label === "Easy"
                        ? "hsl(150 80% 50%)"
                        : d.label === "Medium"
                        ? "hsl(45 100% 50%)"
                        : "hsl(0 80% 55%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <a
              href="https://leetcode.com/vijayakumar_2007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <TrendingUp size={14} />
              View full profile on LeetCode
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeetCode;
