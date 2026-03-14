import { useState } from "react";
import { analyzeAllFiles } from "../utils/similarity";
import { fetchJavaResults } from "../utils/api";
import SimilarityMatrix from "../components/SimilarityMatrix";
import SuspiciousPairs from "../components/SuspiciousPairs";
import CodeViewer from "../components/CodeViewer";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell
} from "recharts";

export default function Dashboard({ files, onBack }) {
  const [selectedPair, setSelectedPair] = useState(null);
  const [useJava, setUseJava] = useState(false);
  const [javaResults, setJavaResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const results = useJava ? javaResults : analyzeAllFiles(files);

  async function loadJavaResults() {
    setLoading(true);
    try {
      const data = await fetchJavaResults();
      setJavaResults(data);
      setUseJava(true);
      console.log("✅ Java results loaded:", data);
    } catch (err) {
      alert("❌ Could not load results.json — make sure you copied it to /public folder!");
    }
    setLoading(false);
  }

  function switchToJS() {
    setUseJava(false);
    setJavaResults([]);
  }

  // ── Stats ──────────────────────────────────────
  const totalFiles = files.length;
  const totalPairs = results.length;
  const highRisk = results.filter((r) => r.similarity >= 70).length;
  const moderate = results.filter((r) => r.similarity >= 40 && r.similarity < 70).length;
  const avgSimilarity = results.length
    ? Math.round(results.reduce((sum, r) => sum + r.similarity, 0) / results.length)
    : 0;

  // ── Chart data ─────────────────────────────────
  const chartData = results.map((r) => ({
    name: `${r.fileA.replace(/\.[^.]+$/, "")} ↔ ${r.fileB.replace(/\.[^.]+$/, "")}`,
    similarity: r.similarity,
  }));

  function getBarColor(score) {
    if (score >= 70) return "#ff4444";
    if (score >= 40) return "#f59e0b";
    return "#00ff88";
  }

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <h1 style={styles.logo}>⚔️ CodeGuard Results</h1>

        <div style={styles.headerRight}>
          {/* Mode badge */}
          <span style={{
            ...styles.modeBadge,
            background: useJava ? "#00ff8822" : "#3b82f622",
            color: useJava ? "#00ff88" : "#3b82f6",
            border: `1px solid ${useJava ? "#00ff88" : "#3b82f6"}`,
          }}>
            {useJava ? "⚡ Java Mode" : "🌐 JS Mode"}
          </span>

          {/* Toggle button */}
          {useJava ? (
            <button onClick={switchToJS} style={styles.switchBtn}>
              🌐 Switch to JS
            </button>
          ) : (
            <button
              onClick={loadJavaResults}
              style={styles.javaBtn}
              disabled={loading}
            >
              {loading ? "⏳ Loading..." : "⚡ Load Java Results"}
            </button>
          )}
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div style={styles.statsBar}>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>📁</span>
          <span style={styles.statValue}>{totalFiles}</span>
          <span style={styles.statLabel}>Files</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>🔍</span>
          <span style={styles.statValue}>{totalPairs}</span>
          <span style={styles.statLabel}>Pairs</span>
        </div>
        <div style={{ ...styles.statCard, background: highRisk > 0 ? "#ff444422" : "#1e293b" }}>
          <span style={styles.statIcon}>🚨</span>
          <span style={{ ...styles.statValue, color: highRisk > 0 ? "#ff4444" : "#e2e8f0" }}>
            {highRisk}
          </span>
          <span style={styles.statLabel}>High Risk</span>
        </div>
        <div style={{ ...styles.statCard, background: moderate > 0 ? "#f59e0b22" : "#1e293b" }}>
          <span style={styles.statIcon}>⚠️</span>
          <span style={{ ...styles.statValue, color: moderate > 0 ? "#f59e0b" : "#e2e8f0" }}>
            {moderate}
          </span>
          <span style={styles.statLabel}>Moderate</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>📊</span>
          <span style={styles.statValue}>{avgSimilarity}%</span>
          <span style={styles.statLabel}>Avg Similarity</span>
        </div>
      </div>

      {/* ── Bar Chart ── */}
      <div style={styles.chartBox}>
        <h2 style={styles.sectionTitle}>📈 Similarity Overview</h2>
        {chartData.length === 0 ? (
          <p style={styles.empty}>No data to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 80 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748b", fontSize: 11 }}
                angle={-35}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#e2e8f0",
                }}
                formatter={(value) => [`${value}%`, "Similarity"]}
              />
              <Bar dataKey="similarity" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={getBarColor(entry.similarity)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Matrix ── */}
      <div style={styles.section}>
        <SimilarityMatrix files={files} results={results} />
      </div>

      {/* ── Suspicious Pairs ── */}
      <div style={styles.section}>
        <SuspiciousPairs results={results} onViewPair={(pair) => setSelectedPair(pair)} />
      </div>

      {/* ── Code Viewer Modal ── */}
      {selectedPair && (
        <CodeViewer
          pair={selectedPair}
          files={files}
          onClose={() => setSelectedPair(null)}
        />
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f1117",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  backBtn: {
    background: "#1e293b",
    color: "#e2e8f0",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  logo: {
    color: "#00ff88",
    fontSize: "1.8rem",
    flex: 1,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  modeBadge: {
    padding: "0.3rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  javaBtn: {
    background: "#00ff88",
    color: "#0f1117",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  switchBtn: {
    background: "#1e293b",
    color: "#3b82f6",
    border: "1px solid #3b82f6",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  statsBar: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  statCard: {
    flex: 1,
    minWidth: "120px",
    background: "#1e293b",
    borderRadius: "12px",
    padding: "1.2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    border: "1px solid #334155",
  },
  statIcon: { fontSize: "1.5rem" },
  statValue: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#e2e8f0",
    fontFamily: "Courier New, monospace",
  },
  statLabel: {
    color: "#64748b",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  chartBox: {
    background: "#1e293b",
    borderRadius: "16px",
    padding: "1.5rem",
    border: "1px solid #334155",
  },
  sectionTitle: {
    color: "#e2e8f0",
    fontSize: "1.3rem",
    marginBottom: "1.5rem",
  },
  empty: {
    color: "#64748b",
    fontSize: "0.9rem",
  },
  section: {
    width: "100%",
  },
};