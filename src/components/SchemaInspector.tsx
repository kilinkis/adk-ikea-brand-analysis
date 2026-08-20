import React, { useState } from 'react';
import { Code, Copy, Check } from 'lucide-react';
import { Product } from '../types';

interface SchemaInspectorProps {
  product: Product;
}

export const SchemaInspector: React.FC<SchemaInspectorProps> = ({ product }) => {
  const [copied, setCopied] = useState(false);

  const jsonLdCode = JSON.stringify(
    {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.layers.l2_seo.tag,
      sku: product.sku,
      brand: { '@type': 'Brand', name: 'IKEA' },
      description: product.description,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: product.price.replace('$', ''),
        availability: 'https://schema.org/InStock',
      },
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Color', value: product.color },
        { '@type': 'PropertyValue', name: 'Dimensions', value: product.dimensions },
      ],
      keywords: product.layers.l3_synonyms.join(', '),
    },
    null,
    2
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonLdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-6 shadow-md space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            Schema.org/Product JSON-LD (Google Rich Snippet Generator)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compliant structured data ready for Next.js / frontend &lt;head&gt; injection.
          </p>
        </div>
        <button
          onClick={copyToClipboard}
          className="px-3 py-1.5 bg-ikea-blue hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy JSON-LD
            </>
          )}
        </button>
      </div>
      <pre className="bg-slate-950 p-4 rounded-lg text-xs font-mono text-emerald-400 overflow-x-auto max-h-60 border border-slate-800">
        {jsonLdCode}
      </pre>
    </div>
  );
};
