"""Structured Data Generator for Schema.org/Product JSON-LD and Google Merchant Center Feeds."""

import json
from pathlib import Path
from typing import Any, Dict, List, Optional


def generate_product_json_ld(product: Dict[str, Any], layer_data: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Generates a schema.org/Product compliant JSON-LD dictionary for Google Rich Snippet indexing.
    """
    title = product.get("title", "IKEA Product")
    brand = product.get("brand", "IKEA")
    description = product.get("description", "")
    sku = product.get("sku", "N/A")
    price_str = product.get("price", "$0.00").replace("$", "").strip()
    category = product.get("category", "Home & Furniture")
    attributes = product.get("attributes", "")

    # Layer data overrides if provided
    seo_title = title
    synonyms = []
    if layer_data:
        seo_title = layer_data.get("seo_title", title)
        synonyms = layer_data.get("synonyms", [])

    # Parse attributes into structured additionalProperty
    additional_properties = []
    if attributes:
        for pair in attributes.split(","):
            if ":" in pair:
                k, v = pair.split(":", 1)
                additional_properties.append({
                    "@type": "PropertyValue",
                    "name": k.strip(),
                    "value": v.strip(),
                })

    json_ld = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": seo_title,
        "sku": sku,
        "mpn": sku.replace(".", ""),
        "brand": {
            "@type": "Brand",
            "name": brand,
        },
        "description": description,
        "category": category,
        "offers": {
            "@type": "Offer",
            "url": f"https://www.ikea.com/us/en/p/{sku.replace('.', '')}/",
            "priceCurrency": "USD",
            "price": price_str,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
        },
    }

    if additional_properties:
        json_ld["additionalProperty"] = additional_properties

    if synonyms:
        json_ld["keywords"] = ", ".join(synonyms)

    return json_ld


def generate_catalog_json_ld(catalog: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Generates a list of JSON-LD objects for all products in the catalog."""
    return [generate_product_json_ld(p) for p in catalog]


def generate_google_merchant_feed_tsv(
    products: List[Dict[str, Any]],
    layer_mapping: Optional[Dict[str, Dict[str, str]]] = None,
) -> str:
    """
    Generates a Google Merchant Center compliant TSV feed.
    Uses Layer 4 optimized titles for multi-brand ad auction visibility.
    """
    headers = [
        "id",
        "title",
        "description",
        "link",
        "image_link",
        "availability",
        "price",
        "brand",
        "condition",
        "google_product_category",
        "product_type",
        "custom_label_0",
    ]

    rows = ["\t".join(headers)]

    for p in products:
        sku = p.get("sku", "000.000.00")
        pid = sku.replace(".", "")
        brand = p.get("brand", "IKEA")
        raw_title = p.get("title", "")
        desc = p.get("description", "").replace("\t", " ").replace("\n", " ")
        price = p.get("price", "$0.00") + " USD"
        category = p.get("category", "Home & Furniture")

        # Layer 4 title mapping
        feed_title = f"{brand} {raw_title}"
        custom_intent = "Furniture"
        if layer_mapping and raw_title in layer_mapping:
            feed_title = layer_mapping[raw_title].get("feed_title", feed_title)
            custom_intent = layer_mapping[raw_title].get("intent", custom_intent)

        link = f"https://www.ikea.com/us/en/p/{pid}/"
        image_link = f"https://www.ikea.com/us/en/images/products/{pid}_PE000001_S5.JPG"

        row = [
            pid,
            feed_title,
            desc,
            link,
            image_link,
            "in_stock",
            price,
            brand,
            "new",
            "Furniture > Shelving & Storage",
            category,
            custom_intent,
        ]
        rows.append("\t".join(row))

    return "\n".join(rows)


def export_structured_data(
    products: List[Dict[str, Any]],
    output_dir: Optional[str] = None,
) -> Dict[str, str]:
    """
    Exports Schema.org JSON-LD and Google Merchant Center TSV files to the output directory.
    """
    if output_dir is None:
        project_root = Path(__file__).resolve().parent.parent.parent
        target_dir = project_root / "reports"
    else:
        target_dir = Path(output_dir)

    target_dir.mkdir(parents=True, exist_ok=True)

    # Layer mapping for realistic feed export
    layer_mapping = {
        "BILLY Bookcase": {
            "feed_title": "IKEA BILLY - 79\" Modern Tall Bookshelf with Adjustable Storage Shelves, White",
            "intent": "Living Room Storage",
        },
        "POÄNG Armchair": {
            "feed_title": "IKEA POÄNG Armchair - Scandinavian Bentwood Accent Lounge Chair with Neck Support, Beige",
            "intent": "Accent Seating",
        },
        "KALLAX Shelf Unit": {
            "feed_title": "IKEA KALLAX Shelving Unit - 16-Cube (4x4) Modular Storage Organizer & Room Divider, 58x58\"",
            "intent": "Cube Storage",
        },
        "MALM Bed Frame, High": {
            "feed_title": "IKEA MALM Queen Bed Frame - Clean-Lined High Platform Bed with Headboard, White Stained Oak",
            "intent": "Beds & Frames",
        },
        "STRANDMON Wing Chair": {
            "feed_title": "IKEA STRANDMON Wing Chair - Classic High-Back Wingback Accent Chair with Deep Cushion, Dark Gray",
            "intent": "Living Room Seating",
        },
    }

    # 1. Export Schema.org JSON-LD
    json_ld_list = [generate_product_json_ld(p) for p in products]
    json_ld_path = target_dir / "ikea_product_schema.json"
    with open(json_ld_path, "w", encoding="utf-8") as f:
        json.dump(json_ld_list, f, indent=2)

    # 2. Export Google Merchant Center TSV
    feed_tsv = generate_google_merchant_feed_tsv(products, layer_mapping=layer_mapping)
    feed_path = target_dir / "google_merchant_feed.tsv"
    with open(feed_path, "w", encoding="utf-8") as f:
        f.write(feed_tsv)

    print(f"🏷️ [Structured Data] Saved Schema.org JSON-LD to: {json_ld_path}")
    print(f"📦 [Merchant Feed] Saved Google Merchant Center TSV to: {feed_path}")

    return {
        "json_ld_path": str(json_ld_path),
        "merchant_feed_path": str(feed_path),
    }
