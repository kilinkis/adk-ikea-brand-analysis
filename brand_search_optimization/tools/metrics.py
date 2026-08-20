"""Metric calculation engine for Brand Search Optimization and Query Recall."""

import re
from typing import Dict, List, Set, Tuple


def tokenize(text: str) -> Set[str]:
    """Tokenizes and normalizes text into lowercase alphanumeric keywords, filtering stop words."""
    stop_words = {
        "a", "an", "the", "and", "or", "in", "on", "at", "for", "with",
        "of", "by", "from", "to", "is", "it", "this", "that", "unit",
    }
    # Clean text and split
    words = re.findall(r"\b[a-zA-Z0-9\"']+\b", text.lower().replace("\"", "inch"))
    return {w for w in words if w not in stop_words and len(w) > 1}


def calculate_query_recall(query: str, metadata_text: str) -> Tuple[float, List[str], List[str]]:
    """
    Calculates the Token Recall Rate of a shopper search query against product metadata.
    
    Formula:
        Recall = |Tokens(Query) ∩ Tokens(Metadata)| / |Tokens(Query)|
    
    Returns:
        (recall_score, matched_tokens, missing_tokens)
    """
    query_tokens = tokenize(query)
    meta_tokens = tokenize(metadata_text)

    if not query_tokens:
        return 1.0, [], []

    matched = sorted(list(query_tokens.intersection(meta_tokens)))
    missing = sorted(list(query_tokens.difference(meta_tokens)))
    recall = len(matched) / len(query_tokens)

    return round(recall, 3), matched, missing


def calculate_catalog_recall_metrics(
    eval_benchmark: List[Dict[str, any]],
) -> Dict[str, any]:
    """
    Evaluates baseline vs multi-surface recall across a benchmark suite.
    """
    baseline_recalls = []
    optimized_recalls = []
    details = []

    for item in eval_benchmark:
        product_title = item.get("product", "")
        original_meta = item.get("original_meta", product_title)
        optimized_meta = item.get("optimized_meta", "")
        test_queries = item.get("test_queries", [])

        for q in test_queries:
            b_recall, b_match, b_miss = calculate_query_recall(q, original_meta)
            o_recall, o_match, o_miss = calculate_query_recall(q, optimized_meta)

            baseline_recalls.append(b_recall)
            optimized_recalls.append(o_recall)

            details.append({
                "product": product_title,
                "query": q,
                "baseline_recall": f"{b_recall * 100:.1f}%",
                "optimized_recall": f"{o_recall * 100:.1f}%",
                "matched_after": o_match,
                "missing_after": o_miss,
            })

    avg_baseline = sum(baseline_recalls) / len(baseline_recalls) if baseline_recalls else 0.0
    avg_optimized = sum(optimized_recalls) / len(optimized_recalls) if optimized_recalls else 0.0

    return {
        "avg_baseline_recall_pct": round(avg_baseline * 100, 1),
        "avg_optimized_recall_pct": round(avg_optimized * 100, 1),
        "total_queries_evaluated": len(baseline_recalls),
        "query_details": details,
    }
