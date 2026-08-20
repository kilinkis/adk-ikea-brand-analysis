"""Shared constants and environment configuration for Brand Search Optimization."""

import os
from pathlib import Path

# Load .env from project root if present
_env_path = Path(__file__).resolve().parent.parent.parent / ".env"

try:
    from dotenv import load_dotenv
    if _env_path.exists():
        load_dotenv(_env_path)
    else:
        load_dotenv()
except ImportError:
    # Lightweight fallback parser for .env files when python-dotenv is not installed
    if _env_path.exists():
        with open(_env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip().strip("\"'"))

AGENT_NAME = "brand_search_optimization"
DESCRIPTION = "A multi-agent assistant for brand search optimization and product title enrichment."

# Model settings
GOOGLE_GENAI_USE_VERTEXAI = int(os.getenv("GOOGLE_GENAI_USE_VERTEXAI", "0"))
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
PROJECT = os.getenv("GOOGLE_CLOUD_PROJECT", "demo-project")
LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1")
MODEL = os.getenv("MODEL", "gemini-2.5-flash")

# Catalog settings
USE_LOCAL_CATALOG = int(os.getenv("USE_LOCAL_CATALOG", "1"))
LOCAL_CATALOG_PATH = os.getenv(
    "LOCAL_CATALOG_PATH",
    str(Path(__file__).resolve().parent.parent.parent / "data" / "ikea_catalog.json"),
)
DATASET_ID = os.getenv("DATASET_ID", "products_data_agent")
TABLE_ID = os.getenv("TABLE_ID", "ikea_items")

# Browser & Web Search settings
DISABLE_WEB_DRIVER = int(os.getenv("DISABLE_WEB_DRIVER", "0"))
HEADLESS_BROWSER = int(os.getenv("HEADLESS_BROWSER", "1"))
STAGING_BUCKET = os.getenv("STAGING_BUCKET", "")
