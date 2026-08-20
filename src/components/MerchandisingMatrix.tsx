import React, { useState } from 'react';
import { Layers, CheckCircle2, Globe, Search, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface MerchandisingMatrixProps {
  product: Product;
}

export const MerchandisingMatrix: React.FC<MerchandisingMatrixProps> = ({ product }) => {
  const [activeLayer, setActiveLayer] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-ikea-blue" />
            4-Layer Multi-Surface Merchandising Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            How our AI decouples metadata to prevent keyword stuffing while maximizing search discovery.
          </p>
        </div>
        <div className="flex bg-slate-200/70 p-1 rounded-lg gap-1 text-xs font-semibold">
          <button
            onClick={() => setActiveLayer(1)}
            className={`px-3 py-1.5 rounded-md transition ${
              activeLayer === 1 ? 'bg-white text-ikea-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Layer 1: D2C UI
          </button>
          <button
            onClick={() => setActiveLayer(2)}
            className={`px-3 py-1.5 rounded-md transition ${
              activeLayer === 2 ? 'bg-white text-ikea-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Layer 2: SEO &lt;title&gt;
          </button>
          <button
            onClick={() => setActiveLayer(3)}
            className={`px-3 py-1.5 rounded-md transition ${
              activeLayer === 3 ? 'bg-white text-ikea-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Layer 3: Synonyms
          </button>
          <button
            onClick={() => setActiveLayer(4)}
            className={`px-3 py-1.5 rounded-md transition ${
              activeLayer === 4 ? 'bg-white text-ikea-blue shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Layer 4: 3P Feeds
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeLayer === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                On-Page D2C Visual Display (IKEA.com Product Card)
              </span>
              <span className="text-xs bg-blue-50 text-ikea-blue font-semibold px-2.5 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Brand Aesthetic Protected
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 max-w-lg">
              <div className="text-2xl font-bold text-slate-900">{product.layers.l1_ui.title}</div>
              <div className="text-sm font-medium text-slate-600 mt-1">{product.layers.l1_ui.subtitle}</div>
              <div className="text-lg font-extrabold text-slate-900 mt-3">{product.price}</div>
              <div className="text-xs text-slate-500 mt-2 line-clamp-2">{product.description}</div>
            </div>
            <p className="text-xs text-slate-600 italic">💡 {product.layers.l1_ui.note}</p>
          </div>
        )}

        {activeLayer === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Technical SEO HTML Title Tag (Google Search SERP Preview)
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                Rankings Optimized
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl p-5 bg-white max-w-2xl">
              <div className="text-xs text-slate-600">
                https://www.ikea.com &gt; us &gt; en &gt; products &gt; {product.id.toLowerCase()}
              </div>
              <div className="text-lg font-medium text-blue-800 hover:underline cursor-pointer mt-0.5">
                {product.layers.l2_seo.tag}
              </div>
              <div className="text-xs text-slate-600 mt-1">{product.layers.l2_seo.meta}</div>
            </div>
            <p className="text-xs text-slate-600 italic">💡 {product.layers.l2_seo.note}</p>
          </div>
        )}

        {activeLayer === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Internal Search Engine Synonyms (Algolia / Elasticsearch Query Expansion)
              </span>
              <span className="text-xs bg-purple-50 text-purple-700 font-semibold px-2.5 py-0.5 rounded border border-purple-100 flex items-center gap-1">
                <Search className="w-3.5 h-3.5" />
                Zero-Result Elimination
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.layers.l3_synonyms.map((syn, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 border border-slate-300 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  🔍 {syn}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-600 italic">
              💡 When shoppers type any of these phrases on IKEA.com, {product.name} is returned #1 without changing the visual display title.
            </p>
          </div>
        )}

        {activeLayer === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Marketplace & Shopping Feed Syndication (Google Merchant Center & Amazon)
              </span>
              <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-2.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5" />
                High Attribute Density
              </span>
            </div>
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-1">
              <div>
                <span className="text-slate-400">Title:</span> {product.layers.l4_feed.title}
              </div>
              <div>
                <span className="text-slate-400">Category:</span> {product.layers.l4_feed.category}
              </div>
              <div>
                <span className="text-slate-400">Target Channel:</span> Google Shopping, Performance Max, Wayfair, Amazon
              </div>
            </div>
            <p className="text-xs text-slate-600 italic">💡 {product.layers.l4_feed.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};
