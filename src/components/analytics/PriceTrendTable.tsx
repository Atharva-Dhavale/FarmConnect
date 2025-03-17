"use client";

import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceTrend {
  product: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
}

interface PriceTrendTableProps {
  priceTrends: PriceTrend[];
}

export default function PriceTrendTable({ priceTrends }: PriceTrendTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table-modern w-full">
        <thead>
          <tr>
            <th>Product</th>
            <th>Current Price (₹/kg)</th>
            <th>Previous Price (₹/kg)</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {priceTrends.map((trend, index) => (
            <tr key={index}>
              <td className="font-medium text-gray-900">{trend.product}</td>
              <td>₹{trend.currentPrice.toFixed(2)}</td>
              <td>₹{trend.previousPrice.toFixed(2)}</td>
              <td>
                <div className="flex items-center">
                  {trend.change >= 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-500">+{trend.change.toFixed(2)}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-red-500">{trend.change.toFixed(2)}%</span>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 