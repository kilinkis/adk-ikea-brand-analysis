import React, { useState } from 'react';
import { Header } from './components/Header';
import { KpiCards } from './components/KpiCards';
import { ProductSelector } from './components/ProductSelector';
import { HighchartsAnalytics } from './components/HighchartsAnalytics';
import { MerchandisingMatrix } from './components/MerchandisingMatrix';
import { SearchSimulator } from './components/SearchSimulator';
import { SchemaInspector } from './components/SchemaInspector';
import { PRODUCTS_DATA } from './data/products';
import { Product } from './types';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS_DATA[0]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6 space-y-6">
        <KpiCards />

        <ProductSelector
          products={PRODUCTS_DATA}
          selectedProduct={selectedProduct}
          onSelect={setSelectedProduct}
        />

        <HighchartsAnalytics
          products={PRODUCTS_DATA}
          selectedProduct={selectedProduct}
        />

        <MerchandisingMatrix product={selectedProduct} />

        <SearchSimulator product={selectedProduct} />

        <SchemaInspector product={selectedProduct} />
      </main>

      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
        Built with <strong>Google Agent Development Kit (ADK)</strong> &bull; <strong>Gemini 2.5 Flash</strong> &bull; React &bull; TypeScript &bull; Highcharts Full-Stack Architecture
      </footer>
    </div>
  );
};

export default App;
