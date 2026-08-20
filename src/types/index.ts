export interface ProductLayerUI {
  title: string;
  subtitle: string;
  note: string;
}

export interface ProductLayerSEO {
  tag: string;
  meta: string;
  note: string;
}

export interface ProductLayerFeed {
  title: string;
  category: string;
  note: string;
}

export interface ProductLayers {
  l1_ui: ProductLayerUI;
  l2_seo: ProductLayerSEO;
  l3_synonyms: string[];
  l4_feed: ProductLayerFeed;
}

export interface ProductRecall {
  baseline: number;
  optimized: number;
  gain: string;
}

export interface ProductAttributes {
  dimensions: number;
  material: number;
  color: number;
  utility: number;
  modularity: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  sku: string;
  dimensions: string;
  color: string;
  material: string;
  description: string;
  layers: ProductLayers;
  recall: ProductRecall;
  attributes: ProductAttributes;
}
