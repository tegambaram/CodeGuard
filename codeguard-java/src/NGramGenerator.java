import java.util.*;

public class NGramGenerator {
    public static Set<String> generateNgrams(List<String> tokens, int n) {
        Set<String> ngrams = new HashSet<>();

        if (tokens.size() < n)
            return ngrams;

        for (int i = 0; i <= tokens.size() - n; i++) {
            StringBuilder gram = new StringBuilder();
            for (int j = i; j < i + n; j++) {
                gram.append(tokens.get(j));
                if (j < i + n - 1)
                    gram.append("|");
            }
            ngrams.add(gram.toString());
        }

        return ngrams;
    }
}