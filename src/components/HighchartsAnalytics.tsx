import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import { Product } from '../types';

// Initialize highcharts-more for polar/spider charts (supports both ESM and CJS bundling)
const initHighchartsMore = (moreModule: unknown, hc: typeof Highcharts) => {
  if (typeof moreModule === 'function') {
    (moreModule as (h: typeof Highcharts) => void)(hc);
  } else if (
    moreModule &&
    typeof (moreModule as { default?: (h: typeof Highcharts) => void }).default === 'function'
  ) {
    (moreModule as { default: (h: typeof Highcharts) => void }).default(hc);
  }
};

initHighchartsMore(highchartsMore, Highcharts);

interface HighchartsAnalyticsProps {
  products: Product[];
  selectedProduct: Product;
}

export const HighchartsAnalytics: React.FC<HighchartsAnalyticsProps> = ({
  products,
  selectedProduct,
}) => {
  // 1. Column Chart Options: Query Recall Comparison
  const barChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      style: { fontFamily: 'Inter, sans-serif' },
      height: 320,
    },
    title: {
      text: 'Search Query Token Recall Rate (R_query)',
      align: 'left',
      style: { fontSize: '15px', fontWeight: '600', color: '#1e293b' },
    },
    subtitle: {
      text: 'Comparing Baseline Catalog (Original Titles) vs. Multi-Surface Merchandising',
      align: 'left',
      style: { color: '#64748b', fontSize: '12px' },
    },
    xAxis: {
      categories: products.map((p) => p.id),
      crosshair: true,
      labels: { style: { fontWeight: '600', color: '#334155' } },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: { text: 'Recall Rate (%)', style: { color: '#64748b' } },
      labels: { format: '{value}%' },
      gridLineColor: '#f1f5f9',
    },
    tooltip: {
      shared: true,
      valueSuffix: '%',
    },
    plotOptions: {
      column: {
        borderRadius: 4,
        pointPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Baseline Catalog',
        type: 'column',
        data: products.map((p) => p.recall.baseline),
        color: '#94a3b8',
      },
      {
        name: '4-Layer Merchandising',
        type: 'column',
        data: products.map((p) => p.recall.optimized),
        color: '#0058a3',
      },
    ],
  };

  // 2. Spider / Radar Chart Options: Attribute Coverage for Selected Product
  const attrs = selectedProduct.attributes;
  const radarChartOptions: Highcharts.Options = {
    chart: {
      polar: true,
      type: 'line',
      backgroundColor: 'transparent',
      style: { fontFamily: 'Inter, sans-serif' },
      height: 320,
    },
    title: {
      text: `${selectedProduct.name} - Attribute Coverage`,
      align: 'left',
      style: { fontSize: '15px', fontWeight: '600', color: '#1e293b' },
    },
    pane: { size: '80%' },
    xAxis: {
      categories: ['Dimensions', 'Materials', 'Color / Finish', 'Room Utility', 'Modularity'],
      tickmarkPlacement: 'on',
      lineWidth: 0,
      labels: { style: { fontSize: '11px', fontWeight: '500', color: '#475569' } },
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0,
      max: 100,
      labels: { enabled: false },
    },
    tooltip: {
      shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}%</b><br/>',
    },
    series: [
      {
        name: 'Attribute Score',
        type: 'area',
        data: [attrs.dimensions, attrs.material, attrs.color, attrs.utility, attrs.modularity],
        pointPlacement: 'on',
        color: '#ffcc00',
        fillOpacity: 0.25,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
      </div>
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <HighchartsReact highcharts={Highcharts} options={radarChartOptions} />
      </div>
    </div>
  );
};
