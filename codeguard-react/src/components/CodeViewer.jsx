export default function CodeViewer({ pair, files, onClose }) {
  const fileA = files.find((f) => f.name === pair.fileA);
  const fileB = files.find((f) => f.name === pair.fileB);

  const linesA = fileA.content.split("\n");
  const linesB = fileB.content.split("\n");

  function clean(line) {
    return line.trim().replace(/\s+/g, " ");
  }

  function isMatching(lineA, lineB) {
    return clean(lineA) === clean(lineB) && clean(lineA).length > 3;
  }

  // build a set of matching line indexes for each side
  const matchedA = new Set();
  const matchedB = new Set();

  linesA.forEach((lineA, i) => {
    linesB.forEach((lineB, j) => {
      if (isMatching(lineA, lineB)) {
        matchedA.add(i);
        matchedB.add(j);
      }
    });
  });

  const maxLines = Math.max(linesA.length, linesB.length);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <span style={styles.headerTitle}>🔍 Code Comparison</span>
            <span style={styles.similarityBadge}>
              {pair.similarity}% Similar
            </span>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>
            ✕ Close
          </button>
        </div>

        {/* File name headers */}
        <div style={styles.fileHeaders}>
          <div style={styles.fileHeader}>📄 {pair.fileA}</div>
          <div style={styles.fileHeader}>📄 {pair.fileB}</div>
        </div>

        {/* Legend */}
        <div style={styles.legend}>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: "#ff444444" }}></span>
            Matching lines
          </span>
          <span style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: "transparent", border: "1px solid #334155" }}></span>
            Unique lines
          </span>
        </div>

        {/* Code panels */}
        <div style={styles.panels}>
          {/* Left panel */}
          <div style={styles.panel}>
            {Array.from({ length: maxLines }).map((_, i) => {
              const line = linesA[i] ?? "";
              const highlighted = matchedA.has(i);
              return (
                <div
                  key={i}
                  style={{
                    ...styles.line,
                    background: highlighted ? "#ff444422" : "transparent",
                    borderLeft: highlighted ? "3px solid #ff4444" : "3px solid transparent",
                  }}
                >
                  <span style={styles.lineNumber}>{i + 1}</span>
                  <span style={styles.lineContent}>{line}</span>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div style={styles.divider} />

          {/* Right panel */}
          <div style={styles.panel}>
            {Array.from({ length: maxLines }).map((_, i) => {
              const line = linesB[i] ?? "";
              const highlighted = matchedB.has(i);
              return (
                <div
                  key={i}
                  style={{
                    ...styles.line,
                    background: highlighted ? "#ff444422" : "transparent",
                    borderLeft: highlighted ? "3px solid #ff4444" : "3px solid transparent",
                  }}
                >
                  <span style={styles.lineNumber}>{i + 1}</span>
                  <span style={styles.lineContent}>{line}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "#000000cc",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  modal: {
    background: "#0f1117",
    borderRadius: "16px",
    border: "1px solid #334155",
    width: "100%",
    maxWidth: "1100px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
    borderBottom: "1px solid #1e293b",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  headerTitle: {
    color: "#e2e8f0",
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  similarityBadge: {
    background: "#ff444433",
    color: "#ff4444",
    padding: "0.2rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
  closeBtn: {
    background: "#1e293b",
    color: "#e2e8f0",
    border: "none",
    borderRadius: "8px",
    padding: "0.4rem 1rem",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  fileHeaders: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderBottom: "1px solid #1e293b",
  },
  fileHeader: {
    padding: "0.75rem 1.5rem",
    color: "#00ff88",
    fontSize: "0.9rem",
    fontFamily: "Courier New, monospace",
    background: "#1e293b",
    borderRight: "1px solid #334155",
  },
  legend: {
    display: "flex",
    gap: "1.5rem",
    padding: "0.5rem 1.5rem",
    borderBottom: "1px solid #1e293b",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    color: "#64748b",
    fontSize: "0.8rem",
  },
  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: "3px",
  },
  panels: {
    display: "grid",
    gridTemplateColumns: "1fr 2px 1fr",
    overflow: "auto",
    flex: 1,
  },
  panel: {
    overflow: "auto",
    fontFamily: "Courier New, monospace",
    fontSize: "0.85rem",
  },
  divider: {
    background: "#1e293b",
  },
  line: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    padding: "0.15rem 1rem",
    minHeight: "24px",
  },
  lineNumber: {
    color: "#334155",
    fontSize: "0.75rem",
    minWidth: "24px",
    textAlign: "right",
    userSelect: "none",
    paddingTop: "1px",
  },
  lineContent: {
    color: "#e2e8f0",
    whiteSpace: "pre",
    flex: 1,
  },
};