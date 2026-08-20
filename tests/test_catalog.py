"""Unit tests for IKEA catalog connector and database loading."""

import unittest
from pathlib import Path

from brand_search_optimization.tools.catalog_connector import (
    _load_local_catalog,
    get_product_details_for_brand,
    get_products_for_brand_raw,
)


class TestCatalogConnector(unittest.TestCase):
    def test_load_local_catalog(self):
        """Verifies that the local IKEA catalog loads valid product data."""
        catalog = _load_local_catalog()
        self.assertIsInstance(catalog, list)
        self.assertGreaterEqual(len(catalog), 5)

        # Check required schema fields
        sample = catalog[0]
        self.assertIn("title", sample)
        self.assertIn("brand", sample)
        self.assertIn("category", sample)
        self.assertIn("description", sample)
        self.assertIn("attributes", sample)

    def test_get_products_for_brand_ikea(self):
        """Verifies query filtering for brand 'IKEA'."""
        products = get_products_for_brand_raw("IKEA", limit=5)
        self.assertGreaterEqual(len(products), 3)
        titles = [p["title"] for p in products]
        # Ensure iconic models exist
        self.assertTrue(any("BILLY" in t for t in titles))
        self.assertTrue(any("POÄNG" in t for t in titles))

    def test_get_product_details_markdown_formatting(self):
        """Verifies markdown table output for tool calling."""
        md_table = get_product_details_for_brand(brand="IKEA")
        self.assertIn("| Title | Category | Description | Attributes | Brand |", md_table)
        self.assertIn("BILLY Bookcase", md_table)
        self.assertIn("POÄNG Armchair", md_table)


if __name__ == "__main__":
    unittest.main()
