export default function SuspiciousPairs({ results, onViewPair }) {
    function getIcon(score) {
        if (score >= 70) return "🚨";
        if (score >= 40) return "⚠️";
        return "✅";
    }

    function getColor(score) {
        if (score >= 70) return "#ff4444";
        if (score >= 40) return "#f59e0b";
        return "#00ff88";
    }

    function getLabel(score) {
        if (score >= 70) return "High Risk";
        if (score >= 40) return "Moderate";
        return "Low Risk";
    }

    return (
        <div style={styles.wrapper}>
            <h2 style={styles.title}>🕵️ Suspicious Pairs</h2>

            {results.length === 0 ? (
                <p style={styles.empty}>No pairs to compare.</p>
            ) : (
                <div style={styles.list}>
                    {results.map((r, i) => (
                        <div key={i} style={styles.card}>
                            {/* Left — icon + files */}
                            <div style={styles.left}>
                                <span style={styles.icon}>{getIcon(r.similarity)}</span>
                                <div style={styles.fileNames}>
                                    <span style={styles.fileName}>{r.fileA}</span>
                                    <span style={styles.arrow}>↔</span>
                                    <span style={styles.fileName}>{r.fileB}</span>
                                </div>
                            </div>

                            {/* Right — score + label + button */}
                            <div style={styles.right}>
                                <div style={styles.scoreBlock}>
                                    <span style={{ ...styles.score, color: getColor(r.similarity) }}>
                                        {r.similarity}%
                                    </span>
                                    <span style={{ ...styles.label, color: getColor(r.similarity) }}>
                                        {getLabel(r.similarity)}
                                    </span>
                                </div>
                                <button
                                    style={styles.viewBtn}
                                    onClick={() => onViewPair(r)}
                                >
                                    View →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    wrapper: {
        width: "100%",
        maxWidth: "800px",
        margin: "2rem auto 0",
    },
    title: {
        color: "#e2e8f0",
        fontSize: "1.3rem",
        marginBottom: "1rem",
    },
    empty: {
        color: "#64748b",
        fontSize: "0.9rem",
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    },
    card: {
        background: "#1e293b",
        borderRadius: "12px",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        border: "1px solid #334155",
    },
    left: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },
    icon: {
        fontSize: "1.5rem",
    },
    fileNames: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
    },
    fileName: {
        color: "#e2e8f0",
        fontFamily: "Courier New, monospace",
        fontSize: "0.9rem",
        background: "#0f1117",
        padding: "0.2rem 0.6rem",
        borderRadius: "6px",
    },
    arrow: {
        color: "#64748b",
        fontSize: "1rem",
    },
    right: {
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
    },
    scoreBlock: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    score: {
        fontSize: "1.4rem",
        fontWeight: "bold",
        fontFamily: "Courier New, monospace",
    },
    label: {
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "1px",
    },
    viewBtn: {
        background: "#0f1117",
        color: "#00ff88",
        border: "1px solid #00ff88",
        borderRadius: "8px",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "bold",
        whiteSpace: "nowrap",
    },
};