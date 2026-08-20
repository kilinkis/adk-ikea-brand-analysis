import React from 'react';
import { Product } from '../types';

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product;
  onSelect: (product: Product) => void;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  selectedProduct,
  onSelect,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-slate-700 whitespace-nowrap">Selected Product:</span>
        <div className="flex flex-wrap gap-2">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedProduct.id === p.id
                  ? 'bg-ikea-blue text-white shadow-sm ring-2 ring-ikea-blue/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
      <div className="text-xs text-slate-500 flex items-center gap-2">
        <span>SKU: <strong className="font-mono text-slate-700">{selectedProduct.sku}</strong></span>
        <span>&bull;</span>
        <span>Price: <strong className="text-slate-900">{selectedProduct.price}</strong></span>
      </div>
    </div>
  );
};
