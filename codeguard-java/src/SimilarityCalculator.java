import java.util.*;

public class SimilarityCalculator {
    public static int calculate(CodeFile fileA, CodeFile fileB) {
        List<String> tokensA = Tokenizer.tokenize(fileA.content);
        List<String> tokensB = Tokenizer.tokenize(fileB.content);

        if (tokensA.isEmpty() || tokensB.isEmpty())
            return 0;

        Set<String> ngramsA = NGramGenerator.generateNgrams(tokensA, 3);
        Set<String> ngramsB = NGramGenerator.generateNgrams(tokensB, 3);

        if (ngramsA.isEmpty() || ngramsB.isEmpty())
            return 0;

        int common = 0;
        for (String gram : ngramsA) {
            if (ngramsB.contains(gram))
                common++;
        }

        double score = (2.0 * common) / (ngramsA.size() + ngramsB.size()) * 100;
        return (int) Math.round(score);
    }
}