
export function tokenize(code) {
  return code
    .replace(/\/\/[^\n]*/g, " ")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/#[^\n]*/g, " ")
    .replace(/"[^"]*"/g, " STR ")
    .replace(/'[^']*'/g, " STR ")
    .replace(/\b\d+\b/g, " NUM ")
    .split(/\s+/)
    .filter(Boolean);
}

export function getNgrams(tokens, n = 3) {
  const grams = new Set();
  for (let i = 0; i <= tokens.length - n; i++) {
    grams.add(tokens.slice(i, i + n).join("|"));
  }
  return grams;
}

export function calcSimilarity(codeA, codeB) {
  const tokensA = tokenize(codeA);
  const tokensB = tokenize(codeB);

  if (tokensA.length === 0 || tokensB.length === 0) return 0;

  const gramsA = getNgrams(tokensA);
  const gramsB = getNgrams(tokensB);

  if (gramsA.size === 0 || gramsB.size === 0) return 0;

  let common = 0;
  for (const gram of gramsA) {
    if (gramsB.has(gram)) common++;
  }

  const score = (2 * common) / (gramsA.size + gramsB.size) * 100;
  return Math.round(score);
}

export function analyzeAllFiles(files) {
  const results = [];

  for (let i = 0; i < files.length; i++) {
    for (let j = i + 1; j < files.length; j++) {
      const score = calcSimilarity(files[i].content, files[j].content);
      results.push({
        fileA: files[i].name,
        fileB: files[j].name,
        similarity: score,
      });
    }
  }

  // sort by highest similarity first
  results.sort((a, b) => b.similarity - a.similarity);
  return results;
}