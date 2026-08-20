# 🛋️ Brand Search Optimization & Product Title Enrichment (IKEA Case Study)

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Google ADK](https://img.shields.io/badge/Google-ADK%20(Agent%20Development%20Kit)-4285F4.svg)](https://github.com/google/adk-samples)
[![Gemini 2.5 Flash](https://img.shields.io/badge/Model-Gemini%202.5%20Flash-orange.svg)](https://ai.google.dev/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)
[![Tests: Passing](https://img.shields.io/badge/tests-9%20passed-brightgreen.svg)](tests/)

An enterprise-grade **Multi-Agent AI System** built with **Google Agent Development Kit (ADK)** and **Gemini 2.5** to audit e-commerce brand catalogs, discover shopper search intent, benchmark live competitor listings, and synthesize multi-channel merchandising strategies through a **Generator-Critic Reflection Loop**.

---

## 🎯 Problem Statement & The "Temu-Style Title" Trap

Iconic retail brands like **IKEA** use proprietary, minimalist product names (*BILLY*, *POÄNG*, *KALLAX*). While effective in direct showroom navigation, these titles suffer search discovery penalties on search engines (Google Shopping) and multi-brand marketplaces (Amazon, Wayfair) where shoppers search using descriptive queries (e.g. `"tall white bookshelf with adjustable shelves"`).

### ⚠️ The Novice AI Mistake: "The Temu Trap"
A naive AI agent will simply rename the on-site website title to:  
`"BILLY 79' Tall Modern White 5-Shelf Bookcase Organizer"`  
While this works on Amazon or Temu, **it ruins the brand's Scandinavian aesthetic and dilutes brand equity on its flagship website (IKEA.com).**

### 💡 The Enterprise Solution: 4-Layer Multi-Surface Merchandising
Our multi-agent system solves this by decoupling discovery metadata across **4 distinct channels**:

```mermaid
flowchart TD
    Catalog[IKEA Product Catalog: BILLY] --> Pipeline[ADK Multi-Agent System]

    Pipeline --> L1[1. D2C Visual UI]
    Pipeline --> L2[2. Technical SEO]
    Pipeline --> L3[3. Search Synonyms]
    Pipeline --> L4[4. Marketplace / Ad Feeds]

    L1 --- D1["IKEA.com Display: 'BILLY' + Subtitle 'Bookcase, white, 31x11x79 in.'"]
    L2 --- D2["HTML &lt;title&gt;: 'BILLY Bookcase (White, 79 in.) | Tall Bookshelf Storage | IKEA'"]
    L3 --- D3["Elasticsearch Synonyms: 'bookshelf', 'tall white bookcase', 'adjustable shelf unit'"]
    L4 --- D4["Google Shopping Feed: 'IKEA BILLY - 79 in. Modern Bookshelf with Adjustable Shelves, White'"]
```

---

## 📐 Quantitative Evaluation: Search Query Token Recall

Rather than relying on ungrounded estimates, this system evaluates optimization using **Shopper Query Token Recall Rate ($R_{\text{query}}$)**:

$$R_{\text{query}} = \frac{|\text{Tokens}(\text{Shopper Search Query}) \cap \text{Tokens}(\text{Indexed Product Metadata})|}{|\text{Tokens}(\text{Shopper Search Query})|}$$

### 📊 Benchmark Results (15 Benchmark Shopper Intent Queries Across 5 Products)

| Metric | Baseline (Original Titles Only) | 4-Layer Multi-Surface Merchandising | Net Improvement |
| :--- | :--- | :--- | :--- |
| **Average Query Token Recall** | **21.6%** | **80.9%** | **+59.3% Gain** |
| **Zero-Match Query Rate** | **46.7%** (7/15 queries had 0 token overlap) | **0.0%** (All 15 queries matched) | **-100% Elimination of Blindspots** |
| **D2C Visual UI Cleanliness** | 100% (Clean Swedish Model Names) | **100% (Preserved without keyword spam)** | **Zero Brand Dilution** |

#### Sample Calculation (BILLY):
- **Shopper Query**: `"79 inch tall white bookshelf with adjustable shelves"` *(7 key tokens: `79`, `tall`, `white`, `bookshelf`, `adjustable`, `shelves`, `storage`)*
- **Baseline Match (`BILLY Bookcase`)**: 0 / 7 tokens matched = **0.0% Recall** (Shopper finds 0 direct keyword matches).
- **Multi-Surface Match (SEO + Synonyms + Feed)**: 5 / 7 tokens matched (`adjustable`, `bookshelf`, `shelves`, `tall`, `white`) = **71.4% Recall**.

---

## 📊 4-Layer Multi-Surface Merchandising Matrix

| Product | 1. D2C Visual Title (IKEA.com UI) | 2. Technical SEO `<title>` Tag (Google SERP) | 3. Internal Search Engine Synonyms (Elasticsearch/Algolia) | 4. Marketplace & Ad Feed Title (Amazon / Google Shopping) |
| :--- | :--- | :--- | :--- | :--- |
| **BILLY** | **`BILLY`** <br>*Bookcase, white, 31 1/2x11x79 1/2 "* | `BILLY Bookcase (White, 79") \| Modern Bookshelf Storage \| IKEA` | `["white bookshelf", "tall bookcase", "adjustable shelves", "narrow book storage"]` | `IKEA BILLY - 79" Modern Tall Bookshelf with Adjustable Storage Shelves, White` |
| **POÄNG** | **`POÄNG`** <br>*Armchair, birch veneer / beige* | `POÄNG Armchair \| Scandinavian Bentwood Lounge Chair \| IKEA` | `["scandinavian lounge chair", "bentwood accent chair", "high back reading chair"]` | `IKEA POÄNG Armchair - Scandinavian Bentwood Accent Lounge Chair with Neck Support, Beige` |
| **KALLAX** | **`KALLAX`** <br>*Shelf unit, black-brown, 57 7/8x57 7/8 "* | `KALLAX 16-Cube Shelf Unit (4x4) \| Room Divider Storage \| IKEA` | `["cube storage organizer", "16 cube bookcase", "4x4 room divider", "record storage shelf"]` | `IKEA KALLAX Shelving Unit - 16-Cube (4x4) Modular Storage Organizer & Room Divider, 58x58"` |
| **MALM** | **`MALM`** <br>*Bed frame, high, Queen, white stained oak* | `MALM Queen Bed Frame (High) \| Modern Platform Bed \| IKEA` | `["queen platform bed", "wood veneer bed frame", "underbed storage bed"]` | `IKEA MALM Queen Bed Frame - Clean-Lined High Platform Bed with Headboard, White Stained Oak` |
| **STRANDMON** | **`STRANDMON`** <br>*Wing chair, Nordvalla dark gray* | `STRANDMON Wing Chair \| Classic High-Back Reading Chair \| IKEA` | `["high-back wingback chair", "accent reading armchair", "tufted lounge chair"]` | `IKEA STRANDMON Wing Chair - Classic High-Back Wingback Accent Chair with Deep Cushion, Dark Gray` |

---

## 🏗️ Multi-Agent Architecture

```mermaid
flowchart TD
    User([User / E-Commerce Marketer]) -->|1. Provide Brand: 'IKEA'| Root[Root Supervisor Agent]

    subgraph ADK Multi-Agent Orchestration
        Root -->|2. Route Brand Catalog Query| KF[Keyword Finding Agent]
        KF -->|Query Database / Catalog| DB[(Product Catalog / BigQuery / JSON)]
        KF -->|Ranked Generic & Branded Keywords| Root

        Root -->|3. Benchmark Top Keywords| SR[Search Results Agent]
        SR -->|Browser Tooling & Market Search| Web[E-Commerce Marketplaces]
        SR -->|Competitor Title Benchmarks| Root

        Root -->|4. Trigger Optimization Pipeline| CompRoot[Comparison Supervisor Agent]

        subgraph Generator-Critic Reflection Loop
            CompRoot <-->|Draft 4-Layer Merchandising Matrix| Gen[Comparison Generator Agent]
            CompRoot <-->|Audit Brand Voice & Reject Temu Clutter| Critic[Comparison Critic Agent]
        end
    end

    CompRoot -->|5. Deliver Audited Deliverables| Reporter[Report Exporter Engine]
    Reporter -->|Export .md & .html| Output[Executive Optimization Report]
```

---

## 🚀 Quickstart & Usage

### 1. Clone & Install

```bash
git clone https://github.com/your-username/adk-ikea-brand-analysis.git
cd adk-ikea-brand-analysis
```

Install dependencies using `uv` or `pip`:

```bash
uv sync
# Or: pip install -e .
```

### 2. Configure Environment

```bash
cp .env.example .env
```
Set your `GOOGLE_API_KEY` from [Google AI Studio](https://aistudio.google.com).

### 3. Run Analysis via CLI

```bash
python3 run_analysis.py --brand "IKEA"
```

Outputs are automatically generated in `reports/`:
- **Markdown Report**: `reports/ikea_brand_optimization_report.md`
- **Styled HTML Report**: `reports/ikea_brand_optimization_report.html`

---

## 🧪 Testing & Evaluation

### Run All Tests & Evaluation Benchmarks
```bash
python3 -m unittest discover tests
python3 -m unittest discover eval
```

---

## 📜 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
