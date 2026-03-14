import java.util.*;

public class Main {
    public static void main(String[] args) {
        String inputFolder = "input";
        String outputFile = "output/results.json";

        System.out.println("⚔️  CodeGuard — Plagiarism Detector");
        System.out.println("=====================================");

        // step 1 — load files
        List<CodeFile> files = FileLoader.loadFiles(inputFolder);

        if (files.size() < 2) {
            System.out.println("❌ Need at least 2 files in the input folder!");
            return;
        }

        System.out.println("\n🔍 Analyzing " + files.size() + " files...\n");

        // step 2 — compare every file with every other file
        List<int[]> scores = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {
            for (int j = i + 1; j < files.size(); j++) {
                int similarity = SimilarityCalculator.calculate(files.get(i), files.get(j));
                scores.add(new int[] { i, j, similarity });

                System.out.println(
                        files.get(i).name + " ↔ " +
                                files.get(j).name + " → " +
                                similarity + "%");
            }
        }

        // step 3 — sort by highest similarity
        scores.sort((a, b) -> b[2] - a[2]);

        // step 4 — export results
        System.out.println("\n💾 Saving results...");
        ResultExporter.export(scores, files, outputFile);

        System.out.println("\n✅ Done!");
    }
}