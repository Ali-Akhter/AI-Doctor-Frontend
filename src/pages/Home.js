import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <style>{themeCSS}</style>
      <div style={styles.page}>
        <div style={styles.bgGlow} />
        <div style={styles.bgGlow2} />

        <div style={styles.card}>
          <div style={styles.badge}>
            <span style={styles.dot} />
            AI-POWERED DIAGNOSTICS
          </div>

          <h1 style={styles.title}>
            AI <span style={styles.titleAccent}>Doctor</span> System
          </h1>
          <p style={styles.subtitle}>
            Intelligent medical assistance powered by machine learning.
            Choose a module below to begin your analysis.
          </p>

          <div style={styles.options}>
            <button
              onClick={() => navigate("/ask-ai")}
              style={styles.option}
              className="opt-card"
            >
              <div style={{ ...styles.iconBox, background: "linear-gradient(135deg,#06b6d4,#0ea5e9)" }}>🤖</div>
              <div style={styles.optText}>
                <div style={styles.optTitle}>Ask AI Bot</div>
                <div style={styles.optDesc}>Describe symptoms in natural language</div>
              </div>
              <span style={styles.arrow}>→</span>
            </button>

            <button
              onClick={() => navigate("/blood")}
              style={styles.option}
              className="opt-card"
            >
              <div style={{ ...styles.iconBox, background: "linear-gradient(135deg,#f43f5e,#e11d48)" }}>🩸</div>
              <div style={styles.optText}>
                <div style={styles.optTitle}>Blood Prediction</div>
                <div style={styles.optDesc}>Analyze CBC blood test parameters</div>
              </div>
              <span style={styles.arrow}>→</span>
            </button>

            <button
              onClick={() => navigate("/thyroid")}
              style={styles.option}
              className="opt-card"
            >
              <div style={{ ...styles.iconBox, background: "linear-gradient(135deg,#a78bfa,#7c3aed)" }}>🦋</div>
              <div style={styles.optText}>
                <div style={styles.optTitle}>Thyroid Prediction</div>
                <div style={styles.optDesc}>TSH, T3, T4 hormone evaluation</div>
              </div>
              <span style={styles.arrow}>→</span>
            </button>
          </div>

          <div style={styles.footer}>
            ⚕️ For educational use only — always consult a licensed physician
          </div>
        </div>
      </div>
    </>
  );
}

export const themeCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  .opt-card { transition: all .25s ease; }
  .opt-card:hover { transform: translateY(-2px); border-color: #38bdf8 !important; background: rgba(56,189,248,0.08) !important; }
  .opt-card:hover .arrow { transform: translateX(4px); }
  .btn-primary { transition: all .2s ease; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 12px 30px -8px rgba(56,189,248,0.55) !important; }
  .input-field:focus { border-color: #38bdf8 !important; box-shadow: 0 0 0 3px rgba(56,189,248,0.15) !important; outline: none; }
  .back-btn:hover { background: rgba(56,189,248,0.1) !important; }
  ::placeholder { color: #64748b; }
  input[type="checkbox"] { accent-color: #38bdf8; width: 16px; height: 16px; cursor: pointer; }
`;

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at top, #0b1220 0%, #050810 60%, #03060d 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', system-ui, sans-serif",
    padding: 24,
    position: "relative",
    overflow: "hidden",
    color: "#e2e8f0",
  },
  bgGlow: {
    position: "absolute", top: "-20%", left: "-10%",
    width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)",
    filter: "blur(40px)", pointerEvents: "none",
  },
  bgGlow2: {
    position: "absolute", bottom: "-20%", right: "-10%",
    width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)",
    filter: "blur(40px)", pointerEvents: "none",
  },
  card: {
    position: "relative",
    background: "linear-gradient(180deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(148,163,184,0.12)",
    padding: 40,
    borderRadius: 24,
    width: "100%",
    maxWidth: 520,
    boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
  },
  badge: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "6px 12px", borderRadius: 999,
    background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.25)",
    color: "#7dd3fc", fontSize: 11, fontWeight: 600, letterSpacing: 1,
    marginBottom: 20,
  },
  dot: {
    width: 6, height: 6, borderRadius: "50%", background: "#22d3ee",
    boxShadow: "0 0 8px #22d3ee",
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 38, fontWeight: 700, margin: 0, lineHeight: 1.1,
    color: "#f1f5f9",
  },
  titleAccent: {
    background: "linear-gradient(135deg,#22d3ee,#38bdf8,#818cf8)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#94a3b8", marginTop: 12, marginBottom: 32, fontSize: 15, lineHeight: 1.6,
  },
  options: { display: "flex", flexDirection: "column", gap: 12 },
  option: {
    display: "flex", alignItems: "center", gap: 16,
    padding: 16, borderRadius: 14,
    background: "rgba(15,23,42,0.6)",
    border: "1px solid rgba(148,163,184,0.12)",
    cursor: "pointer", color: "#e2e8f0", textAlign: "left",
    fontFamily: "inherit",
  },
  iconBox: {
    width: 48, height: 48, borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, flexShrink: 0,
    boxShadow: "0 8px 24px -8px rgba(0,0,0,0.5)",
  },
  optText: { flex: 1 },
  optTitle: { fontWeight: 600, fontSize: 15, color: "#f1f5f9" },
  optDesc: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  arrow: { color: "#38bdf8", fontSize: 18, transition: "transform .25s" },
  footer: {
    marginTop: 28, textAlign: "center", fontSize: 12, color: "#64748b",
    paddingTop: 20, borderTop: "1px solid rgba(148,163,184,0.1)",
  },
};

export default Home;
