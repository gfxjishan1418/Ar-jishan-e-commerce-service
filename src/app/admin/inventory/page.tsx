import React from "react";
import { dataService } from "@/lib/dataService";
import { formatBDT } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Package } from "lucide-react";

export default async function AdminInventoryPage() {
  const { products } = await dataService.getProducts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#172554]">Inventory & Stock Control</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time stock auditing and low inventory alerts for warehouse fulfillment
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#F97316]" />
            <h2 className="font-bold text-sm text-[#172554]">Inventory Levels ({products.length})</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Stock In Hand</th>
                <th className="py-3 px-4">Inventory Status</th>
                <th className="py-3 px-4">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {products.map((p) => {
                const isLow = p.stock_quantity < 10;
                const isOut = p.stock_quantity <= 0;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-slate-800">{p.name}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{p.sku}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{p.stock_quantity} units</td>
                    <td className="py-3 px-4">
                      {isOut ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                          Low Stock Warning
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Adequate Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#F97316]">
                      {formatBDT(p.sale_price || p.regular_price)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
