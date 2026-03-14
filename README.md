# ⚔️ CodeGuard — Code Plagiarism Detector

A full-stack web application that detects similarity between code files using N-gram tokenization algorithm.

## 🔍 Features
- Drag & drop multiple code file uploads (.java .py .cpp .c .js)
- N-gram tokenization algorithm for accurate similarity detection
- Color-coded similarity matrix (High 🔴 / Medium 🟡 / Low 🟢)
- Side-by-side code viewer with highlighted matching lines
- Bar chart visualization with Recharts
- Java 17 backend processing engine
- Dual mode — JS (browser) or Java (backend) analysis

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Recharts, Custom CSS |
| Backend | Java 17 |
| Algorithm | N-gram Tokenization + Dice Coefficient |
| Data Exchange | JSON |

## 🚀 How to Run

### Frontend
```bash
cd codeguard-react
npm install
npm start
```

### Backend
```bash
cd codeguard-java
javac -d out src/*.java
java -cp out Main
```

### Full Workflow
1. Drop code files into `codeguard-java/input/`
2. Run Java backend → `results.json` generated in `output/`
3. Copy `results.json` to `codeguard-react/public/`
4. Open React app → click ⚡ Load Java Results

## 📁 Project Structure
```
codeguard/
 ├── codeguard-react/     ← React frontend
 │    ├── src/
 │    │   ├── components/
 │    │   ├── pages/
 │    │   └── utils/
 │    └── public/
 │
 └── codeguard-java/      ← Java backend
      ├── src/
      │   ├── Main.java
      │   ├── FileLoader.java
      │   ├── CodeCleaner.java
      │   ├── Tokenizer.java
      │   ├── NGramGenerator.java
      │   ├── SimilarityCalculator.java
      │   └── ResultExporter.java
      ├── input/
      └── output/
```

## 👨‍💻 Author
**Egambaram T** — [LinkedIn](https://linkedin.com/in/egambaram-t)