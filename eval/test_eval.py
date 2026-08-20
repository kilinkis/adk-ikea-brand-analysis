"""Evaluation runner for Brand Search Optimization agents."""

import json
import unittest
from pathlib import Path

from brand_search_optimization.tools.catalog_connector import get_products_for_brand_raw


class TestAgentEvaluation(unittest.TestCase):
    def setUp(self):
        eval_file = Path(__file__).resolve().parent / "eval_data.json"
        with open(eval_file, "r", encoding="utf-8") as f:
            self.eval_sets = json.load(f)

    def test_eval_catalog_coverage(self):
        """Verifies that all evaluated products exist in the catalog dataset."""
        products = get_products_for_brand_raw("IKEA", limit=10)
        catalog_titles = [p["title"] for p in products]

        for item in self.eval_sets:
            product_name = item["product"]
            matching = any(product_name.split()[0] in t for t in catalog_titles)
            self.assertTrue(
                matching,
                f"Evaluation target '{product_name}' not found in catalog titles: {catalog_titles}",
            )


if __name__ == "__main__":
    unittest.main()
