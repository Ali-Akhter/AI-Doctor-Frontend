import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { themeCSS } from "./Home";
const API = process.env.REACT_APP_API_URL;
function Chat() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/symptom-predict/`, { text });
      setResult(res.data.result);
      setReport(res.data.ai_report);
    } catch (error) {
      console.log("Error:", error);
      setResult("Error");
      setReport("");
    }
    setLoading(false);
  };

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
            <div style={styles.iconBox}>🤖</div>
            <div>
              <h1 style={styles.title}>AI Medical Chatbot</h1>
              <p style={styles.subtitle}>Describe your symptoms — get instant analysis</p>
            </div>
          </div>

          <div style={styles.chatBox}>
            {loading ? (
              <div style={styles.loadingWrap}>
                <div style={styles.spinner} />
                <p style={{ color: "#7dd3fc", margin: 0 }}>Analyzing symptoms...</p>
              </div>
            ) : result ? (
              <div>
                <div style={styles.resultPill}>DIAGNOSIS</div>
                <h2 style={styles.diseaseName}>{result}</h2>
                <div style={styles.divider} />
                <div style={styles.reportLabel}>🤖 AI Report</div>
                <p style={styles.reportText}>{report}</p>
              </div>
            ) : (
              <div style={styles.emptyState}>
                <div style={{ fontSize: 48, opacity: 0.3 }}>💬</div>
                <p style={{ color: "#64748b", margin: "12px 0 4px", fontWeight: 500 }}>
                  Ready when you are
                </p>
                <p style={{ color: "#475569", fontSize: 13, margin: 0 }}>
                  Try: "fever, headache, body pain since 2 days"
                </p>
              </div>
            )}
          </div>

          <div style={styles.inputRow}>
            <input
              placeholder="Type your symptoms here..."
              style={styles.input}
              className="input-field"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={styles.btn} className="btn-primary" onClick={sendMessage}>
              Send →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(ellipse at top, #0b1220 0%, #050810 60%, #03060d 100%)",
    display: "flex", justifyContent: "center", alignItems: "center",
    fontFamily: "'Inter', system-ui, sans-serif",
    padding: 24, position: "relative", overflow: "hidden", color: "#e2e8f0",
  },
  bgGlow: {
    position: "absolute", top: "-15%", right: "-10%",
    width: 600, height: 600, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(56,189,248,0.15), transparent 70%)",
    filter: "blur(50px)", pointerEvents: "none",
  },
  card: {
    position: "relative",
    background: "linear-gradient(180deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(148,163,184,0.12)",
    padding: 28, borderRadius: 24, width: "100%", maxWidth: 720,
    boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
  },
  back: {
    background: "transparent", border: "1px solid rgba(56,189,248,0.3)",
    color: "#7dd3fc", padding: "8px 14px", borderRadius: 8,
    cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "inherit",
    transition: "all .2s",
  },
  header: { display: "flex", alignItems: "center", gap: 14, marginTop: 18, marginBottom: 20 },
  iconBox: {
    width: 52, height: 52, borderRadius: 14,
    background: "linear-gradient(135deg,#06b6d4,#0ea5e9)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 26, boxShadow: "0 8px 24px -8px rgba(14,165,233,0.6)",
  },
  title: {
    fontFamily: "'Space Grotesk', sans-serif",
    margin: 0, fontSize: 24, fontWeight: 700, color: "#f1f5f9",
  },
  subtitle: { margin: "2px 0 0", color: "#94a3b8", fontSize: 13 },
  chatBox: {
    height: 380, background: "rgba(2,6,15,0.5)",
    border: "1px solid rgba(148,163,184,0.08)",
    borderRadius: 14, marginBottom: 14, padding: 22,
    overflowY: "auto",
  },
  emptyState: {
    height: "100%", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", textAlign: "center",
  },
  loadingWrap: {
    height: "100%", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 16,
  },
  spinner: {
    width: 36, height: 36, borderRadius: "50%",
    border: "3px solid rgba(56,189,248,0.15)",
    borderTopColor: "#38bdf8",
    animation: "spin 0.8s linear infinite",
  },
  resultPill: {
    display: "inline-block", padding: "4px 10px", borderRadius: 999,
    background: "rgba(34,211,238,0.12)", color: "#22d3ee",
    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
  },
  diseaseName: {
    fontFamily: "'Space Grotesk', sans-serif",
    margin: "10px 0 0", fontSize: 26, color: "#f1f5f9", fontWeight: 700,
  },
  divider: { height: 1, background: "rgba(148,163,184,0.12)", margin: "18px 0" },
  reportLabel: { color: "#7dd3fc", fontSize: 12, fontWeight: 600, marginBottom: 8 },
  reportText: { color: "#cbd5e1", fontSize: 14, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" },
  inputRow: { display: "flex", gap: 10 },
  input: {
    flex: 1, padding: "12px 14px", borderRadius: 10,
    border: "1px solid rgba(148,163,184,0.18)",
    background: "rgba(2,6,15,0.6)", color: "#f1f5f9",
    fontSize: 14, fontFamily: "inherit", outline: "none",
    transition: "all .2s",
  },
  btn: {
    padding: "12px 22px",
    background: "linear-gradient(135deg,#06b6d4,#0ea5e9)",
    border: "none", borderRadius: 10, color: "white",
    fontWeight: 600, cursor: "pointer", fontSize: 14, fontFamily: "inherit",
    boxShadow: "0 8px 20px -6px rgba(14,165,233,0.5)",
  },
};

// inject spinner keyframes once
if (typeof document !== "undefined" && !document.getElementById("spin-kf")) {
  const s = document.createElement("style");
  s.id = "spin-kf";
  s.innerHTML = "@keyframes spin{to{transform:rotate(360deg)}}";
  document.head.appendChild(s);
}

export default Chat;
