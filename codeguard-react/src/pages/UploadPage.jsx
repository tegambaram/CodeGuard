import { useRef, useState } from "react";

export default function UploadPage({ files, setFiles, onAnalyze }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  function readFiles(selectedFiles) {
    const fileArray = Array.from(selectedFiles);
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFiles((prev) => {
          // avoid duplicates
          if (prev.find((f) => f.name === file.name)) return prev;
          return [...prev, { name: file.name, content: e.target.result }];
        });
      };
      reader.readAsText(file);
    });
  }

  function handleFileChange(e) {
    readFiles(e.target.files);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    readFiles(e.dataTransfer.files);
  }

  function removeFile(name) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.logo}>⚔️ CodeGuard</h1>
        <p style={styles.subtitle}>Plagiarism Detector for Code Files</p>
      </div>

      {/* Drop Zone */}
      <div
        style={{
          ...styles.dropZone,
          borderColor: dragging ? "#00ff88" : "#334155",
          background: dragging ? "#0f2a1e" : "#1e293b",
        }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div style={styles.dropIcon}>📂</div>
        <p style={styles.dropText}>
          {dragging ? "Release to upload!" : "Drag & drop your code files here"}
        </p>
        <p style={styles.dropHint}>Supports: .java .py .cpp .c .js</p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".js,.py,.java,.cpp,.c"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          style={styles.browseBtn}
          onClick={() => inputRef.current.click()}
        >
          Browse Files
        </button>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div style={styles.fileList}>
          <h3 style={styles.fileListTitle}>
            📋 Uploaded Files ({files.length})
          </h3>
          {files.map((file) => (
            <div key={file.name} style={styles.fileItem}>
              <span style={styles.fileIcon}>🗒️</span>
              <span style={styles.fileName}>{file.name}</span>
              <span style={styles.fileSize}>
                {(file.content.length / 1024).toFixed(1)} KB
              </span>
              <button
                style={styles.removeBtn}
                onClick={() => removeFile(file.name)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Analyze Button */}
      {files.length >= 2 && (
        <button style={styles.analyzeBtn} onClick={onAnalyze}>
          🔍 Analyze {files.length} Files
        </button>
      )}

      {files.length === 1 && (
        <p style={styles.hint}>Upload at least 2 files to compare</p>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f1117",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem 1rem",
    gap: "2rem",
  },
  header: {
    textAlign: "center",
  },
  logo: {
    fontSize: "2.5rem",
    color: "#00ff88",
    letterSpacing: "2px",
  },
  subtitle: {
    color: "#64748b",
    marginTop: "0.5rem",
    fontSize: "1rem",
  },
  dropZone: {
    width: "100%",
    maxWidth: "600px",
    border: "2px dashed",
    borderRadius: "16px",
    padding: "3rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  dropIcon: {
    fontSize: "3rem",
  },
  dropText: {
    fontSize: "1.2rem",
    color: "#e2e8f0",
    fontWeight: "bold",
  },
  dropHint: {
    color: "#64748b",
    fontSize: "0.85rem",
  },
  browseBtn: {
    marginTop: "0.5rem",
    padding: "0.6rem 2rem",
    background: "#00ff88",
    color: "#0f1117",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
  fileList: {
    width: "100%",
    maxWidth: "600px",
    background: "#1e293b",
    borderRadius: "12px",
    padding: "1.5rem",
  },
  fileListTitle: {
    color: "#94a3b8",
    marginBottom: "1rem",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  fileItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem",
    background: "#0f1117",
    borderRadius: "8px",
    marginBottom: "0.5rem",
  },
  fileIcon: { fontSize: "1.2rem" },
  fileName: { flex: 1, color: "#e2e8f0", fontSize: "0.95rem" },
  fileSize: { color: "#64748b", fontSize: "0.8rem" },
  removeBtn: {
    background: "#ff4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "0.2rem 0.5rem",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  analyzeBtn: {
    padding: "0.9rem 3rem",
    background: "#00ff88",
    color: "#0f1117",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    fontSize: "1.1rem",
    cursor: "pointer",
    letterSpacing: "1px",
  },
  hint: {
    color: "#64748b",
    fontSize: "0.9rem",
  },
};