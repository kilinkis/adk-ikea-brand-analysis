import React from 'react';
import { TrendingUp, ShieldCheck, Search, Database } from 'lucide-react';

export const KpiCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">Avg. Query Token Recall</span>
          <TrendingUp className="w-4 h-4 text-ikea-blue" />
        </div>
        <div className="text-3xl font-extrabold text-ikea-blue mt-2">80.9%</div>
        <div className="text-xs text-emerald-600 font-semibold mt-1">
          ↑ +59.3% uplift vs baseline (21.6%)
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">Zero-Match Search Risk</span>
          <Search className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-3xl font-extrabold text-emerald-600 mt-2">0.0%</div>
        <div className="text-xs text-slate-500 mt-1">
          Reduced from 46.7% baseline blindspots
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">D2C Brand UI Integrity</span>
          <ShieldCheck className="w-4 h-4 text-slate-700" />
        </div>
        <div className="text-3xl font-extrabold text-slate-800 mt-2">100%</div>
        <div className="text-xs text-slate-500 mt-1">
          Zero Temu-style keyword spam on-page
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow transition">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">Evaluated Benchmark Suite</span>
          <Database className="w-4 h-4 text-slate-700" />
        </div>
        <div className="text-3xl font-extrabold text-slate-800 mt-2">15 Queries</div>
        <div className="text-xs text-slate-500 mt-1">
          Across 5 core IKEA furniture categories
        </div>
      </div>
    </div>
  );
};
