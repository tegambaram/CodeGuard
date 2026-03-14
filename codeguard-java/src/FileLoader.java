import java.io.*;
import java.nio.file.*;
import java.util.*;

public class FileLoader {
    private static final List<String> ALLOWED = Arrays.asList(
        ".java", ".py", ".cpp", ".c", ".js"
    );

    public static List<CodeFile> loadFiles(String folderPath) {
        List<CodeFile> files = new ArrayList<>();
        File folder = new File(folderPath);

        if (!folder.exists() || !folder.isDirectory()) {
            System.out.println("❌ Folder not found: " + folderPath);
            return files;
        }

        for (File file : folder.listFiles()) {
            if (file.isFile() && isAllowed(file.getName())) {
                try {
                    String content = new String(Files.readAllBytes(Paths.get(file.getPath())));
                    files.add(new CodeFile(file.getName(), content));
                    System.out.println("✅ Loaded: " + file.getName());
                } catch (IOException e) {
                    System.out.println("❌ Could not read: " + file.getName());
                }
            }
        }

        return files;
    }

    private static boolean isAllowed(String name) {
        for (String ext : ALLOWED) {
            if (name.endsWith(ext)) return true;
        }
        return false;
    }
}