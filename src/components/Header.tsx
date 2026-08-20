import React from 'react';
import { FileText } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-ikea-blue text-white border-b border-ikea-darkBlue px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-ikea-yellow text-black font-extrabold px-3 py-1 rounded text-xl tracking-tighter shadow-sm">
            IKEA
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Brand Search Optimization Multi-Agent Dashboard</h1>
            <p className="text-xs text-blue-200">Google Agent Development Kit (ADK) &bull; Gemini 2.5 Flash &bull; React &bull; TypeScript &bull; Highcharts</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ADK Agents Active (Critic Satisfied)
          </span>
          <a
            href="https://github.com/kilinkis/adk-ikea-brand-analysis"
            target="_blank"
            rel="noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded transition border border-white/20 font-medium flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            GitHub Repo
          </a>
        </div>
      </div>
    </header>
  );
};
