public class CodeCleaner {
    public static String clean(String code) {
        // remove // comments
        code = code.replaceAll("//[^\n]*", " ");

        // remove /* */ comments
        code = code.replaceAll("/\\*[\\s\\S]*?\\*/", " ");

        // remove # comments (python)
        code = code.replaceAll("#[^\n]*", " ");

        // replace strings with STR
        code = code.replaceAll("\"[^\"]*\"", " STR ");
        code = code.replaceAll("'[^']*'", " STR ");

        // replace numbers with NUM
        code = code.replaceAll("\\b\\d+(\\.\\d+)?\\b", " NUM ");

        // remove extra whitespace
        code = code.replaceAll("\\s+", " ").trim();

        return code;
    }
}