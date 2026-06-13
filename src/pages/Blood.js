import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { themeCSS } from "./Home";
const API = process.env.REACT_APP_API_URL;
function Blood() {
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [result, setResult] = useState("");
  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setAiText("");

    try {
      const res = await axios.post(`${API}/predict/`, form);
      setResult(res.data.result);
      setAiText(res.data.ai_report);
    } catch (error) {
      setResult("Error: Cannot connect to server");
    }

    setLoading(false);
  };

  const fields = [
    { name: "WBC", label: "WBC", desc: "White blood cells" },
    { name: "LYMp", label: "LYM %", desc: "Lymphocytes %" },
    { name: "NEUTp", label: "NEUT %", desc: "Neutrophils %" },
    { name: "LYMn", label: "LYM #", desc: "Lymphocytes #" },
    { name: "NEUTn", label: "NEUT #", desc: "Neutrophils #" },
    { name: "RBC", label: "RBC", desc: "Red blood cells" },
    { name: "HGB", label: "HGB", desc: "Hemoglobin" },
    { name: "HCT", label: "HCT", desc: "Hematocrit" },
    { name: "MCV", label: "MCV", desc: "Mean corpuscular vol." },
    { name: "MCH", label: "MCH", desc: "Mean corp. hemoglobin" },
    { name: "MCHC", label: "MCHC", desc: "MCH concentration" },
    { name: "PLT", label: "PLT", desc: "Platelets" },
    { name: "PDW", label: "PDW", desc: "Platelet distrib. width" },
    { name: "PCT", label: "PCT", desc: "Plateletcrit" },
  ];

  return (
    <>
      <style>{themeCSS}</style>
      <div style={styles.page}>
        <div style={styles.bgGlow} />

        <div style={styles.card}>
          <button onClick={() => navigate("/")} style={styles.back} className="back-btn">
            ← Back to Home
          </button>

          <div style={styles.header}>
            <div style={styles.iconBox}>🩸</div>
            <div>
              <h1 style={styles.title}>Blood Test Prediction</h1>
              <p style={styles.subtitle}>Enter CBC values to predict patient condition</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              {fields.map((f) => (
                <div key={f.name}>
                  <div style={styles.fieldLabel}>
                    <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{f.label}</span>
                    <span style={{ color: "#64748b", marginLeft: 6, fontSize: 11 }}>{f.desc}</span>
                  </div>
                  <input
                    name={f.name}
                    placeholder="0.0"
                    onChange={handleChange}
                    style={styles.input}
                    className="input-field"
                    required
                  />
                </div>
              ))}
            </div>

            <button type="submit" style={styles.button} className="btn-primary" disabled={loading}>
              {loading ? "Analyzing..." : "Predict Result →"}
            </button>
          </form>

          {result && (
            <div style={styles.resultBox}>
              <div style={styles.resultPill}>PREDICTION</div>
              <h2 style={styles.resultText}>{result}</h2>
            </div>
          )}

          {aiText && (
            <div style={styles.aiBox}>
              <div style={styles.aiHeader}>
                <span style={styles.aiIcon}>🤖</span>
                <h3 style={{ margin: 0, fontSize: 15, color: "#c7d2fe", fontWeight: 600 }}>
                  AI Medical Report
                </h3>
              </div>
              <p style={styles.aiText}>{aiText}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at top, #0b1220 0%, #050810 60%, #03060d 100%)",
    display: "flex", justifyContent: "center", alignItems: "flex-start",
    padding: 24, fontFamily: "'Inter', system-ui, sans-serif",
    position: "relative", overflow: "hidden", color: "#e2e8f0",
  },
  bgGlow: {
    position: "absolute", top: "-15%", left: "-10%",
    width: 600, height: 600, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(244,63,94,0.12), transparent 70%)",
    filter: "blur(50px)", pointerEvents: "none",
  },
  card: {
    position: "relative",
    background: "linear-gradient(180deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(148,163,184,0.12)",
    padding: 32, borderRadius: 24,
    width: "100%", maxWidth: 920,
    boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
  },
  back: {
    background: "transparent", border: "1px solid rgba(56,189,248,0.3)",
    color: "#7dd3fc", padding: "8px 14px", borderRadius: 8,
    cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "inherit",
    transition: "all .2s",
  },
  header: { display: "flex", alignItems: "center", gap: 14, marginTop: 18, marginBottom: 24 },
  iconBox: {
    width: 52, height: 52, borderRadius: 14,
    background: "linear-gradient(135deg,#f43f5e,#e11d48)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 26, boxShadow: "0 8px 24px -8px rgba(225,29,72,0.6)",
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    margin: 0, fontSize: 26, fontWeight: 700, color: "#f1f5f9",
  },
  subtitle: { margin: "2px 0 0", color: "#94a3b8", fontSize: 13 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 14,
  },
  fieldLabel: { fontSize: 12, marginBottom: 6, color: "#94a3b8" },
  input: {
    width: "100%", padding: "10px 12px", borderRadius: 10,
    border: "1px solid rgba(148,163,184,0.18)",
    background: "rgba(2,6,15,0.6)", color: "#f1f5f9",
    fontSize: 14, fontFamily: "inherit", outline: "none",
    transition: "all .2s",
  },
  button: {
    marginTop: 22, width: "100%", padding: 14,
    background: "linear-gradient(135deg,#06b6d4,#0ea5e9)",
    border: "none", borderRadius: 12, color: "white",
    fontWeight: 600, cursor: "pointer", fontSize: 15, fontFamily: "inherit",
    boxShadow: "0 10px 28px -8px rgba(14,165,233,0.55)",
  },
  resultBox: {
    marginTop: 24, padding: 24, borderRadius: 14,
    background: "rgba(2,6,15,0.5)",
    border: "1px solid rgba(34,197,94,0.3)",
    textAlign: "center",
  },
  resultPill: {
    display: "inline-block", padding: "4px 10px", borderRadius: 999,
    background: "rgba(34,197,94,0.12)", color: "#4ade80",
    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
  },
  resultText: {
    fontFamily: "'Space Grotesk', sans-serif",
    margin: "10px 0 0", fontSize: 24, color: "#f1f5f9", fontWeight: 700,
  },
  aiBox: {
    marginTop: 16, padding: 20, borderRadius: 14,
    background: "rgba(2,6,15,0.5)",
    border: "1px solid rgba(129,140,248,0.25)",
  },
  aiHeader: {
    display: "flex", alignItems: "center", gap: 10,
    marginBottom: 12, paddingBottom: 12,
    borderBottom: "1px solid rgba(148,163,184,0.1)",
  },
  aiIcon: {
    width: 32, height: 32, borderRadius: 8,
    background: "linear-gradient(135deg,#818cf8,#6366f1)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
  },
  aiText: {
    whiteSpace: "pre-line", margin: 0, color: "#cbd5e1",
    fontSize: 14, lineHeight: 1.7,
  },
};

export default Blood;
