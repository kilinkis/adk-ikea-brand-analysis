"""Evaluation test suite computing mathematical search query recall benchmarks."""

import json
import unittest
from pathlib import Path

from brand_search_optimization.tools.metrics import (
    calculate_catalog_recall_metrics,
    calculate_query_recall,
)


class TestAgentEvaluation(unittest.TestCase):
    def setUp(self):
        eval_file = Path(__file__).resolve().parent / "eval_data.json"
        with open(eval_file, "r", encoding="utf-8") as f:
            self.eval_sets = json.load(f)

    def test_eval_catalog_recall_uplift(self):
        """Verifies that multi-surface merchandising significantly improves query token recall."""
        results = calculate_catalog_recall_metrics(self.eval_sets)
        
        self.assertEqual(results["total_queries_evaluated"], 15)
        self.assertGreater(results["avg_optimized_recall_pct"], results["avg_baseline_recall_pct"])
        self.assertGreaterEqual(results["avg_optimized_recall_pct"], 75.0)

        print(f"\n📊 Evaluation Benchmark Results:")
        print(f"   • Baseline Query Token Recall:   {results['avg_baseline_recall_pct']}%")
        print(f"   • Optimized Query Token Recall:  {results['avg_optimized_recall_pct']}%")
        print(f"   • Net Uplift:                   +{results['avg_optimized_recall_pct'] - results['avg_baseline_recall_pct']:.1f}%")

    def test_single_query_token_recall_calculation(self):
        """Verifies exact token recall arithmetic for BILLY query."""
        query = "79 inch tall white bookshelf with adjustable shelves"
        baseline_meta = "BILLY Bookcase"
        optimized_meta = "BILLY Bookcase (White, 79\") | Modern Bookshelf Storage | Synonyms: white bookshelf, adjustable shelves, tall"

        b_recall, _, _ = calculate_query_recall(query, baseline_meta)
        o_recall, matched, missing = calculate_query_recall(query, optimized_meta)

        self.assertLess(b_recall, 0.20)
        self.assertGreaterEqual(o_recall, 0.70)
        self.assertIn("bookshelf", matched)
        self.assertIn("shelves", matched)


if __name__ == "__main__":
    unittest.main()
