import React, { useState } from 'react';
import { Search, RefreshCw, Check, X } from 'lucide-react';
import { Product } from '../types';

interface SearchSimulatorProps {
  product: Product;
}

export const SearchSimulator: React.FC<SearchSimulatorProps> = ({ product }) => {
  const [searchQuery, setSearchQuery] = useState(
    '79 inch tall white bookshelf with adjustable shelves'
  );

  const calculateSimulatedMatch = () => {
    const stopWords = new Set([
      'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'for', 'with', 'of', 'to', 'is', 'unit',
    ]);
    const queryTokens = searchQuery
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 1 && !stopWords.has(t));

    if (queryTokens.length === 0) return { score: 0, matched: [], missing: [] };

    const allMetaText = (
      product.name +
      ' ' +
      product.layers.l2_seo.tag +
      ' ' +
      product.layers.l3_synonyms.join(' ') +
      ' ' +
      product.layers.l4_feed.title +
      ' ' +
      product.dimensions +
      ' ' +
      product.color
    ).toLowerCase();

    const matched = queryTokens.filter((t) => allMetaText.includes(t));
    const missing = queryTokens.filter((t) => !allMetaText.includes(t));
    const score = Math.round((matched.length / queryTokens.length) * 100);

    return { score, matched, missing };
  };

  const simResults = calculateSimulatedMatch();

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Search className="w-4 h-4 text-ikea-blue" />
            Live Search Engine Simulator & Token Recall Checker
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Test any search phrase against the active product metadata to see real-time token recall scoring.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-slate-500">Match Score: </span>
          <span
            className={`text-lg font-black ${
              simResults.score >= 70 ? 'text-emerald-600' : 'text-amber-600'
            }`}
          >
            {simResults.score}%
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type a shopper search phrase (e.g. 79 inch white bookcase)..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-ikea-blue focus:border-transparent font-medium"
        />
        <button
          onClick={() => setSearchQuery('79 inch tall white bookshelf with adjustable shelves')}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Example
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
          <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Matched Tokens ({simResults.matched.length}):
          </div>
          <div className="flex flex-wrap gap-1">
            {simResults.matched.length > 0 ? (
              simResults.matched.map((t, idx) => (
                <span
                  key={idx}
                  className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-mono font-semibold"
                >
                  {t}
                </span>
              ))
            ) : (
              <span className="text-emerald-600 italic">No tokens matched yet.</span>
            )}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
          <div className="font-bold text-slate-600 mb-1 flex items-center gap-1">
            <X className="w-3.5 h-3.5 text-slate-400" />
            Missing Tokens ({simResults.missing.length}):
          </div>
          <div className="flex flex-wrap gap-1">
            {simResults.missing.length > 0 ? (
              simResults.missing.map((t, idx) => (
                <span key={idx} className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                  {t}
                </span>
              ))
            ) : (
              <span className="text-slate-500 italic">None (100% token coverage).</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
