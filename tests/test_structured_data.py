"""Unit tests for Schema.org JSON-LD and Google Merchant Center feed generator."""

import json
import tempfile
import unittest
from pathlib import Path

from brand_search_optimization.tools.catalog_connector import _load_local_catalog
from brand_search_optimization.tools.structured_data_generator import (
    export_structured_data,
    generate_google_merchant_feed_tsv,
    generate_product_json_ld,
)


class TestStructuredDataGenerator(unittest.TestCase):
    def setUp(self):
        self.catalog = _load_local_catalog()
        self.sample_product = self.catalog[0]  # BILLY

    def test_generate_product_json_ld_schema(self):
        """Verifies compliant Schema.org/Product JSON-LD structure."""
        json_ld = generate_product_json_ld(self.sample_product)

        self.assertEqual(json_ld["@context"], "https://schema.org/")
        self.assertEqual(json_ld["@type"], "Product")
        self.assertIn("BILLY", json_ld["name"])
        self.assertEqual(json_ld["brand"]["name"], "IKEA")
        self.assertIn("offers", json_ld)
        self.assertEqual(json_ld["offers"]["priceCurrency"], "USD")
        self.assertEqual(json_ld["offers"]["availability"], "https://schema.org/InStock")

        # Verify JSON serializability
        serialized = json.dumps(json_ld)
        self.assertIn("BILLY", serialized)

    def test_generate_google_merchant_feed_tsv(self):
        """Verifies Google Merchant Center TSV formatting and headers."""
        feed_tsv = generate_google_merchant_feed_tsv(self.catalog[:3])
        lines = feed_tsv.split("\n")

        self.assertGreaterEqual(len(lines), 4)  # Header + 3 products
        headers = lines[0].split("\t")
        self.assertIn("id", headers)
        self.assertIn("title", headers)
        self.assertIn("price", headers)
        self.assertIn("brand", headers)
        self.assertIn("availability", headers)

    def test_export_structured_data_isolation(self):
        """Verifies file export using temporary directory isolation."""
        with tempfile.TemporaryDirectory() as tmp_dir:
            paths = export_structured_data(self.catalog[:2], output_dir=tmp_dir)

            json_path = Path(paths["json_ld_path"])
            feed_path = Path(paths["merchant_feed_path"])

            self.assertTrue(json_path.exists())
            self.assertTrue(feed_path.exists())

            # Validate JSON content
            with open(json_path, "r", encoding="utf-8") as f:
                loaded_json = json.load(f)
                self.assertEqual(len(loaded_json), 2)


if __name__ == "__main__":
    unittest.main()
