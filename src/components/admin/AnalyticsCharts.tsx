"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  CreditCard, 
  Users, 
  Percent, 
  Truck,
  Eye
} from "lucide-react";
import { formatBDT } from "@/lib/utils";

// 30-Day Simulated Analytics Data for AR Jishan Store
const SALES_TIMELINE_DATA = [
  { day: "Oct 04", revenue: 14200, orders: 5 },
  { day: "Oct 07", revenue: 18500, orders: 7 },
  { day: "Oct 10", revenue: 12400, orders: 4 },
  { day: "Oct 13", revenue: 26800, orders: 9 },
  { day: "Oct 16", revenue: 21900, orders: 8 },
  { day: "Oct 19", revenue: 34500, orders: 12 },
  { day: "Oct 22", revenue: 29800, orders: 10 },
  { day: "Oct 25", revenue: 42100, orders: 15 },
  { day: "Oct 28", revenue: 38400, orders: 13 },
  { day: "Oct 31", revenue: 48900, orders: 17 },
  { day: "Nov 02", revenue: 54200, orders: 19 },
];

const PAYMENT_BREAKDOWN = [
  { name: "bKash (MFS)", percent: 48, amount: 88630, color: "#E2136E", bg: "bg-[#E2136E]" },
  { name: "Cash on Delivery (COD)", percent: 32, amount: 59080, color: "#10B981", bg: "bg-[#10B981]" },
  { name: "Nagad (Post Office)", percent: 14, amount: 25850, color: "#F7941D", bg: "bg-[#F7941D]" },
  { name: "SSLCommerz / Cards", percent: 6, amount: 11090, color: "#172554", bg: "bg-[#172554]" },
];

const DIVISION_DISTRIBUTION = [
  { division: "Dhaka Division", percent: 58, orders: 39, deliveryAvg: "24 Hours" },
  { division: "Chattogram Division", percent: 20, orders: 14, deliveryAvg: "48 Hours" },
  { division: "Sylhet Division", percent: 10, orders: 7, deliveryAvg: "48 Hours" },
  { division: "Rajshahi Division", percent: 7, orders: 5, deliveryAvg: "72 Hours" },
  { division: "Other Divisions", percent: 5, orders: 3, deliveryAvg: "72 Hours" },
];

const TOP_PRODUCTS = [
  {
    name: "Wireless ANC Bluetooth Earbuds",
    sku: "ARJ-AUD-001",
    category: "Electronics",
    sold: 34,
    revenue: 84660,
    stock: 45,
    image: "/images/products/earbuds.jpg",
  },
  {
    name: "Smart Watch Ultra Pro AMOLED",
    sku: "ARJ-WCH-002",
    category: "Watches",
    sold: 26,
    revenue: 83200,
    stock: 30,
    image: "/images/products/smartwatch.jpg",
  },
  {
    name: "Over-Ear Studio Hi-Fi Headphones",
    sku: "ARJ-AUD-005",
    category: "Electronics",
    sold: 14,
    revenue: 83860,
    stock: 22,
    image: "/images/products/headphones.jpg",
  },
  {
    name: "Breathable Running Shoes",
    sku: "ARJ-SHOE-004",
    category: "Sports",
    sold: 18,
    revenue: 81000,
    stock: 50,
    image: "/images/products/shoes.jpg",
  },
  {
    name: "Urban Explorer Travel Backpack",
    sku: "ARJ-BAG-003",
    category: "Accessories",
    sold: 22,
    revenue: 40700,
    stock: 28,
    image: "/images/products/backpack.jpg",
  },
];

export function AnalyticsCharts() {
  const [metricMode, setMetricMode] = useState<"revenue" | "orders">("revenue");
  const [hoveredPoint, setHoveredPoint] = useState<typeof SALES_TIMELINE_DATA[0] | null>(null);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  // Chart coordinates calculation
  const maxRevenue = Math.max(...SALES_TIMELINE_DATA.map((d) => d.revenue));
  const maxOrders = Math.max(...SALES_TIMELINE_DATA.map((d) => d.orders));
  const chartHeight = 220;
  const chartWidth = 720;
  const paddingX = 40;
  const paddingY = 25;

  const points = SALES_TIMELINE_DATA.map((item, index) => {
    const x = paddingX + (index / (SALES_TIMELINE_DATA.length - 1)) * (chartWidth - paddingX * 2);
    const value = metricMode === "revenue" ? item.revenue : item.orders;
    const max = metricMode === "revenue" ? maxRevenue : maxOrders;
    const y = chartHeight - paddingY - (value / max) * (chartHeight - paddingY * 2);
    return { x, y, item };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  return (
    <div className="space-y-8">
      {/* 4 Enhanced Financial KPI Cards with Visual Sparks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1: Gross Sales */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Sales</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#172554]">৳ 1,84,650</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-bold">
              <ArrowUpRight className="w-4 h-4" />
              <span>+18.4%</span>
              <span className="text-slate-400 font-normal">vs last month</span>
            </div>
          </div>
          {/* Subtle Sparkline Bar */}
          <div className="mt-4 flex items-end gap-1 h-6">
            {[40, 60, 45, 75, 65, 90, 85, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-200 group-hover:bg-emerald-500 rounded-t-xs transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#172554] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#172554]">68 Orders</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-bold">
              <ArrowUpRight className="w-4 h-4" />
              <span>+12.8%</span>
              <span className="text-slate-400 font-normal">fulfilled nationwide</span>
            </div>
          </div>
          {/* Sparkline Bar */}
          <div className="mt-4 flex items-end gap-1 h-6">
            {[30, 50, 40, 70, 60, 80, 75, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-200 group-hover:bg-[#172554] rounded-t-xs transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* KPI 3: Average Order Value */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Order Value</span>
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#F97316] flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#172554]">৳ 2,715</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-bold">
              <ArrowUpRight className="w-4 h-4" />
              <span>+৳ 185</span>
              <span className="text-slate-400 font-normal">basket size growth</span>
            </div>
          </div>
          {/* Sparkline Bar */}
          <div className="mt-4 flex items-end gap-1 h-6">
            {[55, 65, 60, 70, 75, 80, 85, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-orange-200 group-hover:bg-[#F97316] rounded-t-xs transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* KPI 4: Conversion Rate */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-orange-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Store Conversion</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-[#172554]">3.85%</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-bold">
              <ArrowUpRight className="w-4 h-4" />
              <span>+0.6%</span>
              <span className="text-slate-400 font-normal">checkout efficiency</span>
            </div>
          </div>
          {/* Sparkline Bar */}
          <div className="mt-4 flex items-end gap-1 h-6">
            {[35, 45, 50, 55, 60, 70, 75, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-purple-200 group-hover:bg-purple-600 rounded-t-xs transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Primary Graphical Sales & Revenue Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#F97316]" />
              <h2 className="text-lg font-bold text-[#172554]">
                Revenue & Sales Trajectory
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Interactive timeline with daily order and gross sales distribution
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Metric Mode Toggle */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-bold text-slate-600">
              <button
                onClick={() => setMetricMode("revenue")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  metricMode === "revenue" ? "bg-white text-[#F97316] shadow-2xs" : "hover:text-slate-900"
                }`}
              >
                Revenue (৳)
              </button>
              <button
                onClick={() => setMetricMode("orders")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  metricMode === "orders" ? "bg-white text-[#172554] shadow-2xs" : "hover:text-slate-900"
                }`}
              >
                Order Volume
              </button>
            </div>

            {/* Timeframe */}
            <div className="hidden sm:flex bg-slate-50 border border-slate-200 p-1 rounded-xl text-xs font-semibold text-slate-600">
              <span className="px-2.5 py-1 text-[#F97316] font-bold">Last 30 Days</span>
            </div>
          </div>
        </div>

        {/* Dynamic Vector SVG Graphical Chart */}
        <div className="relative w-full overflow-x-auto">
          <div className="min-w-[680px]">
            {/* Tooltip display */}
            {hoveredPoint && (
              <div
                className="absolute z-20 -top-2 bg-[#172554] text-white p-2.5 rounded-xl shadow-xl border border-blue-800 text-xs pointer-events-none transform -translate-x-1/2 -translate-y-full animate-in fade-in duration-150"
                style={{
                  left: `${(hoveredPoint.day === "Nov 02" ? 90 : 50)}%`,
                  top: "20%",
                }}
              >
                <div className="font-bold text-orange-400">{hoveredPoint.day}, 2026</div>
                <div className="font-extrabold text-sm">{formatBDT(hoveredPoint.revenue)}</div>
                <div className="text-[11px] text-slate-300">{hoveredPoint.orders} completed shipments</div>
              </div>
            )}

            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-56 sm:h-64 overflow-visible"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#172554" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#172554" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal grid lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                const y = paddingY + ratio * (chartHeight - paddingY * 2);
                return (
                  <line
                    key={ratio}
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Filled Area */}
              <path
                d={areaD}
                fill={metricMode === "revenue" ? "url(#chartGradient)" : "url(#orderGradient)"}
              />

              {/* Solid Stroke Line */}
              <path
                d={pathD}
                fill="none"
                stroke={metricMode === "revenue" ? "#F97316" : "#172554"}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Data Points */}
              {points.map((pt, idx) => (
                <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(pt.item)}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="5"
                    className={`${metricMode === "revenue" ? "fill-[#F97316]" : "fill-[#172554]"} stroke-white stroke-2 transition-transform duration-200 hover:scale-150`}
                  />
                  {/* Bottom Date labels */}
                  <text
                    x={pt.x}
                    y={chartHeight - 4}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 font-medium"
                  >
                    {pt.item.day}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Monthly Revenue High: <strong>৳ 54,200</strong> on Nov 02</span>
          <span>Average Daily Run-rate: <strong>৳ 31,500 / day</strong></span>
        </div>
      </div>

      {/* Two Columns: Payment Gateways Breakdown & Bangladesh Geographic Fulfillment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Payment Gateways Breakdown (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-[#172554]">Payment Gateway Distribution</h3>
              <p className="text-xs text-slate-400">Share of volume processed by channel</p>
            </div>
            <CreditCard className="w-5 h-5 text-[#F97316]" />
          </div>

          {/* Visual Donut representation bar */}
          <div className="h-4 rounded-full overflow-hidden flex shadow-2xs">
            {PAYMENT_BREAKDOWN.map((p) => (
              <div
                key={p.name}
                style={{ width: `${p.percent}%`, backgroundColor: p.color }}
                title={`${p.name}: ${p.percent}%`}
                className="h-full hover:opacity-90 transition-opacity"
              />
            ))}
          </div>

          {/* Breakdown Items */}
          <div className="space-y-3 pt-2">
            {PAYMENT_BREAKDOWN.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="font-semibold text-slate-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900">{formatBDT(item.amount)}</span>
                  <span className="text-slate-400 ml-2 font-medium">({item.percent}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bangladesh Geographic Fulfillment (6 cols) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-[#172554]">Division Fulfillment Share</h3>
              <p className="text-xs text-slate-400">Nationwide courier delivery volume</p>
            </div>
            <Truck className="w-5 h-5 text-[#F97316]" />
          </div>

          <div className="space-y-3.5">
            {DIVISION_DISTRIBUTION.map((item) => (
              <div key={item.division} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.division}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-normal">Avg: {item.deliveryAvg}</span>
                    <span className="font-bold text-[#172554]">{item.percent}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-[#F97316] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Selling Products Leaderboard */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[#172554]">Best Selling Products Leaderboard</h3>
            <p className="text-xs text-slate-400">Ranked by revenue generation and units dispatched</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-5">Rank & Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Units Sold</th>
                <th className="py-3 px-4">Gross Revenue</th>
                <th className="py-3 px-4">Inventory In Hand</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {TOP_PRODUCTS.map((prod, idx) => (
                <tr key={prod.sku} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        #{idx + 1}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-slate-100 relative overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 line-clamp-1">{prod.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">SKU: {prod.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-semibold">
                      {prod.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    {prod.sold} units
                  </td>
                  <td className="py-3 px-4 font-black text-[#F97316]">
                    {formatBDT(prod.revenue)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      prod.stock < 25 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {prod.stock} units available
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
