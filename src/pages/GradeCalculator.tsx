import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, BookOpen, FlaskConical, AlertTriangle, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const grades = [
  { label: "O", value: 90 },
  { label: "A+", value: 80 },
  { label: "A", value: 70 },
  { label: "B+", value: 60 },
  { label: "B", value: 50 },
];

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

const InputCard = ({
  label,
  value,
  onChange,
  max,
  placeholder,
  suffix = "",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  max: number;
  placeholder?: string;
  suffix?: string;
}) => (
  <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-4 transition-all hover:border-primary/40">
    <label className="block text-xs font-medium text-muted-foreground mb-2">{label}</label>
    <div className="relative">
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `Max ${max}`}
        className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suffix}</span>
      )}
    </div>
  </div>
);

const GradeCalculator = () => {
  const [mode, setMode] = useState<"theory" | "theory-cum-lab">("theory");

  // Theory mode state
  const [cat1, setCat1] = useState("");
  const [cat2, setCat2] = useState("");
  const [quiz, setQuiz] = useState("");
  const [theoryGrade, setTheoryGrade] = useState("90");

  // Theory-cum-lab mode state
  const [tlCat1, setTlCat1] = useState("");
  const [tlCat2, setTlCat2] = useState("");
  const [model, setModel] = useState("");
  const [practicalInternal, setPracticalInternal] = useState("");
  const [practicalEndSem, setPracticalEndSem] = useState("");
  const [tlGrade, setTlGrade] = useState("90");

  const theoryResult = useMemo(() => {
    const c1 = clamp(Number(cat1) || 0, 0, 75);
    const c2 = clamp(Number(cat2) || 0, 0, 75);
    const q = clamp(Number(quiz) || 0, 0, 50);
    const target = Number(theoryGrade) || 90;

    const internalMarks = (c1 + c2 + q) / 5; // out of 40
    const required = (target - internalMarks) / 0.6; // out of 100

    return { internalMarks, required, target };
  }, [cat1, cat2, quiz, theoryGrade]);

  const tlResult = useMemo(() => {
    const c1 = clamp(Number(tlCat1) || 0, 0, 50);
    const c2 = clamp(Number(tlCat2) || 0, 0, 50);
    const m = clamp(Number(model) || 0, 0, 25);
    const pi = clamp(Number(practicalInternal) || 0, 0, 75);
    const pe = clamp(Number(practicalEndSem) || 0, 0, 100);
    const target = Number(tlGrade) || 90;

    // Standard 50/50 hybrid weighting
    // Theory 50%: internal theory (CAT1+CAT2+Model) scaled to 20%, end sem theory scaled to 30%
    // Practical 50%: practical internal scaled to 25%, end sem practical scaled to 25%
    const internalTheory = ((c1 + c2 + m) / 125) * 20;
    const practicalInternalScore = (pi / 75) * 25;
    const practicalEndSemScore = (pe / 100) * 25;
    const known = internalTheory + practicalInternalScore + practicalEndSemScore;
    const required = ((target - known) / 30) * 100;

    return { internalTheory, practicalInternalScore, practicalEndSemScore, required, target };
  }, [tlCat1, tlCat2, model, practicalInternal, practicalEndSem, tlGrade]);

  const renderAlert = (required: number) => {
    if (required > 100) {
      return (
        <div className="flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-red-400">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm font-medium">Mission Impossible: This grade is mathematically out of reach.</p>
        </div>
      );
    }
    if (required < 45) {
      return (
        <div className="flex items-start gap-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 p-4 text-yellow-400">
          <AlertTriangle size={20} className="shrink-0 mt-0.5" />
          <p className="text-sm font-medium">
            Math says {required.toFixed(1)}, but remember you MUST score a minimum of 45/100 in the university exam to pass!
          </p>
        </div>
      );
    }
    return (
      <div className="flex items-start gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-400">
        <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
        <p className="text-sm font-medium">This target is achievable with focus and preparation.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <span className="text-xl font-bold text-gradient-neon" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Vijaya Kumar A
          </span>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-card/50 border border-border backdrop-blur-md mb-4">
              <Calculator size={24} className="text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-purple-blue mb-2">
              End Sem Grade Target
            </h1>
            <p className="text-sm text-muted-foreground">Calculate exactly what you need to score.</p>
          </div>

          {/* Mode toggle */}
          <div className="relative flex p-1 rounded-xl bg-muted border border-border mb-8">
            <motion.div
              layout
              className="absolute inset-y-1 rounded-lg bg-primary/20 border border-primary/30"
              style={{
                width: "50%",
                left: mode === "theory" ? "4px" : "50%",
                right: mode === "theory" ? "50%" : "4px",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setMode("theory")}
              className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                mode === "theory" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <BookOpen size={16} />
              Theory
            </button>
            <button
              onClick={() => setMode("theory-cum-lab")}
              className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                mode === "theory-cum-lab" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <FlaskConical size={16} />
              Theory Cum Lab
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === "theory" ? (
              <motion.div
                key="theory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputCard label="CAT 1 Mark" value={cat1} onChange={setCat1} max={75} suffix="/75" />
                  <InputCard label="CAT 2 Mark" value={cat2} onChange={setCat2} max={75} suffix="/75" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputCard label="Quiz Mark" value={quiz} onChange={setQuiz} max={50} suffix="/50" />
                  <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-4">
                    <label className="block text-xs font-medium text-muted-foreground mb-2">Desired Grade</label>
                    <select
                      value={theoryGrade}
                      onChange={(e) => setTheoryGrade(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      {grades.map((g) => (
                        <option key={g.label} value={g.value}>
                          {g.label} = {g.value}%
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Internal Marks</p>
                  <p className="text-3xl font-black text-foreground mb-1">
                    {theoryResult.internalMarks.toFixed(1)}
                    <span className="text-base font-medium text-muted-foreground">/40</span>
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
                  <p className="text-sm text-primary mb-2">Required End Sem Score</p>
                  <p className="text-4xl font-black text-foreground mb-2">
                    {theoryResult.required > 0 ? theoryResult.required.toFixed(1) : "0"}
                    <span className="text-lg font-medium text-muted-foreground">/100</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You have {theoryResult.internalMarks.toFixed(1)}/40 internals. You need to score{" "}
                    {theoryResult.required > 0 ? theoryResult.required.toFixed(1) : "0"} out of 100 in the End Sem Theory
                    Exam to get an {grades.find((g) => g.value === Number(theoryGrade))?.label}.
                  </p>
                </div>

                {renderAlert(theoryResult.required)}
              </motion.div>
            ) : (
              <motion.div
                key="tl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-4">
                  <p className="text-xs text-muted-foreground">
                    Weighting: 50% Theory + 50% Practical. Theory internal (CAT1+CAT2+Model) → 20% of final. End Sem
                    Theory → 30% of final. Practical Internal → 25% of final. End Sem Practical → 25% of final.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputCard label="CAT 1 Mark" value={tlCat1} onChange={setTlCat1} max={50} suffix="/50" />
                  <InputCard label="CAT 2 Mark" value={tlCat2} onChange={setTlCat2} max={50} suffix="/50" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputCard label="Model Exam Mark" value={model} onChange={setModel} max={25} suffix="/25" />
                  <InputCard label="Practical Internal Mark" value={practicalInternal} onChange={setPracticalInternal} max={75} suffix="/75" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputCard label="Expected End Sem Practical Mark" value={practicalEndSem} onChange={setPracticalEndSem} max={100} suffix="/100" />
                  <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl p-4">
                    <label className="block text-xs font-medium text-muted-foreground mb-2">Desired Grade</label>
                    <select
                      value={tlGrade}
                      onChange={(e) => setTlGrade(e.target.value)}
                      className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      {grades.map((g) => (
                        <option key={g.label} value={g.value}>
                          {g.label} = {g.value}%
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase">Theory Int</p>
                    <p className="text-lg font-bold text-foreground">{tlResult.internalTheory.toFixed(1)}%</p>
                  </div>
                  <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase">Prac Int</p>
                    <p className="text-lg font-bold text-foreground">{tlResult.practicalInternalScore.toFixed(1)}%</p>
                  </div>
                  <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-3 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase">Prac Ext</p>
                    <p className="text-lg font-bold text-foreground">{tlResult.practicalEndSemScore.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
                  <p className="text-sm text-primary mb-2">Required End Sem Theory Score</p>
                  <p className="text-4xl font-black text-foreground mb-2">
                    {tlResult.required > 0 ? tlResult.required.toFixed(1) : "0"}
                    <span className="text-lg font-medium text-muted-foreground">/100</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Based on your expected practical scores, you need to score{" "}
                    {tlResult.required > 0 ? tlResult.required.toFixed(1) : "0"} out of 100 in the End Sem Theory Exam to
                    secure an {grades.find((g) => g.value === Number(tlGrade))?.label}.
                  </p>
                </div>

                {renderAlert(tlResult.required)}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Built for engineering students. Always confirm the exact weighting with your university syllabus.
          </p>
        </div>
      </main>
    </div>
  );
};

export default GradeCalculator;
