export default function SimilarityMatrix({ files, results }) {
  function getScore(nameA, nameB) {
    if (nameA === nameB) return 100;
    const match = results.find(
      (r) =>
        (r.fileA === nameA && r.fileB === nameB) ||
        (r.fileA === nameB && r.fileB === nameA)
    );
    return match ? match.similarity : 0;
  }

  function getColor(score, isSame) {
    if (isSame) return "#1e293b";
    if (score >= 70) return "#ff444433";
    if (score >= 40) return "#f59e0b33";
    return "#00ff8833";
  }

  function getTextColor(score, isSame) {
    if (isSame) return "#64748b";
    if (score >= 70) return "#ff4444";
    if (score >= 40) return "#f59e0b";
    return "#00ff88";
  }

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>📊 Similarity Matrix</h2>

      {/* Legend */}
      <div style={styles.legend}>
        <span style={{ ...styles.badge, background: "#ff444433", color: "#ff4444" }}>🔴 High ≥70%</span>
        <span style={{ ...styles.badge, background: "#f59e0b33", color: "#f59e0b" }}>🟡 Medium 40–70%</span>
        <span style={{ ...styles.badge, background: "#00ff8833", color: "#00ff88" }}>🟢 Low &lt;40%</span>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.cornerCell}></th>
              {files.map((f) => (
                <th key={f.name} style={styles.headerCell}>
                  {f.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {files.map((rowFile) => (
              <tr key={rowFile.name}>
                <td style={styles.rowHeader}>{rowFile.name}</td>
                {files.map((colFile) => {
                  const isSame = rowFile.name === colFile.name;
                  const score = getScore(rowFile.name, colFile.name);
                  return (
                    <td
                      key={colFile.name}
                      style={{
                        ...styles.cell,
                        background: getColor(score, isSame),
                        color: getTextColor(score, isSame),
                      }}
                    >
                      {score}%
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    color: "#e2e8f0",
    fontSize: "1.3rem",
    marginBottom: "1rem",
  },
  legend: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  badge: {
    padding: "0.3rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "12px",
    border: "1px solid #1e293b",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#0f1117",
  },
  cornerCell: {
    padding: "1rem",
    background: "#0f1117",
  },
  headerCell: {
    padding: "0.75rem 1rem",
    color: "#94a3b8",
    fontSize: "0.8rem",
    textAlign: "center",
    borderBottom: "1px solid #1e293b",
    whiteSpace: "nowrap",
    maxWidth: "120px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  rowHeader: {
    padding: "0.75rem 1rem",
    color: "#94a3b8",
    fontSize: "0.8rem",
    whiteSpace: "nowrap",
    borderRight: "1px solid #1e293b",
    maxWidth: "120px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cell: {
    padding: "0.75rem 1rem",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "0.95rem",
    border: "1px solid #1e293b",
    fontFamily: "Courier New, monospace",
  },
};