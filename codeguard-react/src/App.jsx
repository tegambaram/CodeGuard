import { useState } from "react";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import { analyzeAllFiles } from "./utils/similarity";
export default function App() {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState("upload"); // "upload" | "dashboard"
  console.log(analyzeAllFiles(files));

  return (
    <div>
      {page === "upload" ? (
        <UploadPage
          files={files}
          setFiles={setFiles}
          onAnalyze={() => setPage("dashboard")}
        />
      ) : (
        <Dashboard
          files={files}
          onBack={() => setPage("upload")}
        />
      )}
    </div>
  );
}