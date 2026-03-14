import java.io.*;
import java.util.*;

public class ResultExporter {
    public static void export(List<int[]> scores, List<CodeFile> files, String outputPath) {
        StringBuilder json = new StringBuilder();
        json.append("[\n");

        int total = scores.size();
        for (int i = 0; i < total; i++) {
            int[] score = scores.get(i);
            String fileA = files.get(score[0]).name;
            String fileB = files.get(score[1]).name;
            int similarity = score[2];

            json.append("  {\n");
            json.append("    \"fileA\": \"").append(fileA).append("\",\n");
            json.append("    \"fileB\": \"").append(fileB).append("\",\n");
            json.append("    \"similarity\": ").append(similarity).append("\n");
            json.append("  }");

            if (i < total - 1)
                json.append(",");
            json.append("\n");
        }

        json.append("]");

        try {
            // create output folder if not exists
            new File(outputPath).getParentFile().mkdirs();

            FileWriter writer = new FileWriter(outputPath);
            writer.write(json.toString());
            writer.close();
            System.out.println("✅ Results saved to: " + outputPath);
        } catch (IOException e) {
            System.out.println("❌ Could not save results: " + e.getMessage());
        }
    }
}