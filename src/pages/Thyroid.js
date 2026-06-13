import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { themeCSS } from "./Home";
const API = process.env.REACT_APP_API_URL;
function Thyroid() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "", sex: "F",
    on_thyroxine: 0, query_on_thyroxine: 0, on_antithyroid_medication: 0,
    sick: 0, pregnant: 0, thyroid_surgery: 0, i131_treatment: 0,
    query_hypothyroid: 0, query_hyperthyroid: 0, lithium: 0,
    goitre: 0, tumor: 0, hypopituitary: 0, psych: 0,
    TSH: "", T3: "", TT4: "", T4U: "", FTI: "",
  });

  const [result, setResult] = useState("");

  const handleCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked ? 1 : 0 });
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const predictDisease = async () => {
    try {
      const response = await fetch(`${API}/thyroid-predict/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.log(error);
      alert("Prediction failed");
    }
  };

  const boolFields = [
    "on_thyroxine", "query_on_thyroxine", "on_antithyroid_medication",
    "sick", "pregnant", "thyroid_surgery", "i131_treatment",
    "query_hypothyroid", "query_hyperthyroid", "lithium",
    "goitre", "tumor", "hypopituitary", "psych",
  ];

  const labFields = [
    { name: "TSH", label: "TSH (mIU/L)" },
    { name: "T3", label: "T3 (ng/dL)" },
    { name: "TT4", label: "TT4 (μg/dL)" },
    { name: "T4U", label: "T4U" },
    { name: "FTI", label: "FTI" },
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
            <div style={styles.iconBox}>🦋</div>
            <div>
              <h1 style={styles.title}>Thyroid Prediction</h1>
              <p style={styles.subtitle}>Enter patient data to evaluate thyroid condition</p>
            </div>
          </div>

          <Section title="Patient Information">
            <div style={styles.grid}>
              <Field label="Age">
                <input type="number" name="age" placeholder="e.g. 45"
                  onChange={handleInput} style={styles.input} className="input-field" />
              </Field>
              <Field label="Sex">
                <select name="sex" onChange={handleInput} style={styles.input} className="input-field">
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                </select>
              </Field>
            </div>
          </Section>

          <Section title="Lab Values (optional)">
            <div style={styles.grid}>
              {labFields.map((f) => (
                <Field key={f.name} label={f.label}>
                  <input type="number" step="any" name={f.name} placeholder="—"
                    onChange={handleInput} style={styles.input} className="input-field" />
                </Field>
              ))}
            </div>
          </Section>

          <Section title="Medical Conditions">
            <div style={styles.checkboxContainer}>
              {boolFields.map((field) => (
                <label key={field} style={styles.checkLabel}>
                  <input type="checkbox" name={field} onChange={handleCheckbox} />
                  <span style={{ textTransform: "capitalize" }}>{field.replaceAll("_", " ")}</span>
                </label>
              ))}
            </div>
          </Section>

          <button onClick={predictDisease} style={styles.predict} className="btn-primary">
            Run Prediction →
          </button>

          {result && (
            <div style={styles.resultBox}>
              <div style={styles.resultPill}>RESULT</div>
              <h2 style={styles.resultText}>{result}</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginTop: 24 }}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div style={styles.fieldLabel}>{label}</div>
      {children}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at top, #0b1220 0%, #050810 60%, #03060d 100%)",
    padding: 24, fontFamily: "'Inter', system-ui, sans-serif",
    position: "relative", overflow: "hidden", color: "#e2e8f0",
  },
  bgGlow: {
    position: "absolute", top: "-15%", left: "50%", transform: "translateX(-50%)",
    width: 700, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(167,139,250,0.15), transparent 70%)",
    filter: "blur(50px)", pointerEvents: "none",
  },
  card: {
    position: "relative", maxWidth: 920, margin: "auto",
    background: "linear-gradient(180deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(148,163,184,0.12)",
    padding: 32, borderRadius: 24,
    boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
  },
  back: {
    background: "transparent", border: "1px solid rgba(56,189,248,0.3)",
    color: "#7dd3fc", padding: "8px 14px", borderRadius: 8,
    cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "inherit",
    transition: "all .2s",
  },
  header: { display: "flex", alignItems: "center", gap: 14, marginTop: 18, marginBottom: 8 },
  iconBox: {
    width: 52, height: 52, borderRadius: 14,
    background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 26, boxShadow: "0 8px 24px -8px rgba(124,58,237,0.6)",
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    margin: 0, fontSize: 26, fontWeight: 700, color: "#f1f5f9",
  },
  subtitle: { margin: "2px 0 0", color: "#94a3b8", fontSize: 13 },
  sectionTitle: {
    fontSize: 12, fontWeight: 700, color: "#7dd3fc",
    letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 12px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 14,
  },
  fieldLabel: { fontSize: 12, color: "#94a3b8", marginBottom: 6, fontWeight: 500 },
  input: {
    width: "100%", padding: "10px 12px", borderRadius: 10,
    border: "1px solid rgba(148,163,184,0.18)",
    background: "rgba(2,6,15,0.6)", color: "#f1f5f9",
    fontSize: 14, fontFamily: "inherit", outline: "none",
    transition: "all .2s",
  },
  checkboxContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 8,
  },
  checkLabel: {
    display: "flex", gap: 10, alignItems: "center",
    fontSize: 13, color: "#cbd5e1",
    padding: "10px 12px", borderRadius: 10,
    background: "rgba(2,6,15,0.4)",
    border: "1px solid rgba(148,163,184,0.08)",
    cursor: "pointer",
  },
  predict: {
    width: "100%", marginTop: 28, padding: 14, border: "none", borderRadius: 12,
    background: "linear-gradient(135deg,#06b6d4,#0ea5e9)",
    color: "white", cursor: "pointer", fontSize: 15, fontWeight: 600,
    fontFamily: "inherit",
    boxShadow: "0 10px 28px -8px rgba(14,165,233,0.55)",
  },
  resultBox: {
    marginTop: 24, padding: 24, borderRadius: 14,
    background: "rgba(2,6,15,0.5)",
    border: "1px solid rgba(34,211,238,0.3)",
    textAlign: "center",
  },
  resultPill: {
    display: "inline-block", padding: "4px 10px", borderRadius: 999,
    background: "rgba(34,211,238,0.12)", color: "#22d3ee",
    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
  },
  resultText: {
    fontFamily: "'Space Grotesk', sans-serif",
    margin: "10px 0 0", fontSize: 24, color: "#f1f5f9", fontWeight: 700,
  },
};

export default Thyroid;
