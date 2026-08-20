"""Product catalog data connector supporting both local datasets and Google Cloud BigQuery."""

import json
import os
from pathlib import Path
from typing import Any, Dict, List, Optional

from ..shared_libraries import constants

# Cache local catalog in memory
_LOCAL_CATALOG_CACHE: Optional[List[Dict[str, Any]]] = None
_BQ_CLIENT = None
_BQ_INIT_ERROR = None


def _load_local_catalog() -> List[Dict[str, Any]]:
    """Loads the catalog JSON from the configured local path."""
    global _LOCAL_CATALOG_CACHE
    if _LOCAL_CATALOG_CACHE is not None:
        return _LOCAL_CATALOG_CACHE

    catalog_path = Path(constants.LOCAL_CATALOG_PATH)
    if not catalog_path.exists():
        # Fallback to relative path from project root
        project_root = Path(__file__).resolve().parent.parent.parent
        catalog_path = project_root / "data" / "ikea_catalog.json"

    if catalog_path.exists():
        with open(catalog_path, "r", encoding="utf-8") as f:
            _LOCAL_CATALOG_CACHE = json.load(f)
            return _LOCAL_CATALOG_CACHE

    return []


def _get_bq_client():
    """Initializes BigQuery client on demand if GCP is enabled."""
    global _BQ_CLIENT, _BQ_INIT_ERROR
    if _BQ_CLIENT is not None:
        return _BQ_CLIENT
    if _BQ_INIT_ERROR is not None:
        return None

    try:
        from google.cloud import bigquery

        _BQ_CLIENT = bigquery.Client(project=constants.PROJECT)
        return _BQ_CLIENT
    except Exception as e:
        _BQ_INIT_ERROR = e
        return None


def get_products_for_brand_raw(brand: str, limit: int = 5) -> List[Dict[str, Any]]:
    """
    Returns raw list of product dictionaries for a given brand name.
    Queries local JSON catalog or BigQuery based on USE_LOCAL_CATALOG flag.
    """
    brand_lower = brand.strip().lower()

    if constants.USE_LOCAL_CATALOG or _get_bq_client() is None:
        catalog = _load_local_catalog()
        # Case-insensitive brand match or fallback to all items if generic/IKEA
        matched = [
            item
            for item in catalog
            if brand_lower in item.get("brand", "").lower()
            or brand_lower in item.get("title", "").lower()
        ]
        if not matched and brand_lower in ["ikea", "all", "default"]:
            matched = catalog
        return matched[:limit]

    # BigQuery fallback
    bq_client = _get_bq_client()
    query = f"""
        SELECT Title, Description, Attributes, Brand
        FROM `{constants.PROJECT}.{constants.DATASET_ID}.{constants.TABLE_ID}`
        WHERE LOWER(Brand) LIKE CONCAT('%', LOWER(@brand_param), '%')
        LIMIT {limit}
    """
    from google.cloud import bigquery

    job_config = bigquery.QueryJobConfig(
        query_parameters=[bigquery.ScalarQueryParameter("brand_param", "STRING", brand)]
    )
    query_job = bq_client.query(query, job_config=job_config)
    results = query_job.result()

    rows = []
    for row in results:
        rows.append(
            {
                "title": row.Title,
                "description": getattr(row, "Description", "N/A"),
                "attributes": getattr(row, "Attributes", "N/A"),
                "brand": getattr(row, "Brand", brand),
            }
        )
    return rows


def get_product_details_for_brand(tool_context: Any = None, brand: Optional[str] = None) -> str:
    """
    Retrieves product catalog details (Title, Description, Attributes, Brand) for a brand.
    Compatible with Google ADK ToolContext and direct invocation.

    Args:
        tool_context: ADK ToolContext containing user query/parameters.
        brand: Direct brand string (optional, used when called outside ADK context).

    Returns:
        A formatted markdown table of product details.
    """
    target_brand = brand or "IKEA"

    # Extract brand from ADK tool_context if available
    if tool_context is not None:
        user_content = getattr(tool_context, "user_content", None)
        if user_content and hasattr(user_content, "parts") and user_content.parts:
            text_val = user_content.parts[0].text.strip()
            if text_val:
                target_brand = text_val

    products = get_products_for_brand_raw(target_brand, limit=5)

    if not products:
        return f"No products found in catalog for brand '{target_brand}'."

    markdown_table = "| Title | Category | Description | Attributes | Brand |\n"
    markdown_table += "|---|---|---|---|---|\n"

    for p in products:
        title = p.get("title", "N/A")
        category = p.get("category", "General")
        desc = p.get("description", "N/A")
        attrs = p.get("attributes", "N/A")
        b_name = p.get("brand", target_brand)
        markdown_table += f"| {title} | {category} | {desc} | {attrs} | {b_name} |\n"

    return markdown_table
