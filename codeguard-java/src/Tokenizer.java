import java.util.*;

public class Tokenizer {
    public static List<String> tokenize(String code) {
        // clean first
        String cleaned = CodeCleaner.clean(code);

        // split by spaces and punctuation
        String[] parts = cleaned.split("[\\s,;(){}\\[\\]]+");

        List<String> tokens = new ArrayList<>();
        for (String part : parts) {
            if (!part.isEmpty()) {
                tokens.add(part);
            }
        }

        return tokens;
    }
}