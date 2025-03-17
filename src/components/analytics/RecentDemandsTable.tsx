"use client";

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowRight } from 'lucide-react';

interface Demand {
  _id: string;
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  minPrice: number;
  maxPrice: number;
  retailerName: string;
  createdAt: string;
}

interface RecentDemandsTableProps {
  demands: Demand[];
}

export default function RecentDemandsTable({ demands }: RecentDemandsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table-modern w-full">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price Range</th>
            <th>Retailer</th>
            <th>Posted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {demands.length > 0 ? (
            demands.map((demand) => (
              <tr key={demand._id}>
                <td className="font-medium text-gray-900">{demand.productName}</td>
                <td>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                    {demand.category}
                  </span>
                </td>
                <td>{demand.quantity} {demand.unit}</td>
                <td>₹{demand.minPrice} - ₹{demand.maxPrice}</td>
                <td>{demand.retailerName}</td>
                <td>{formatDistanceToNow(new Date(demand.createdAt), { addSuffix: true })}</td>
                <td>
                  <Link 
                    href={`/demands/${demand._id}`} 
                    className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                  >
                    View
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                No recent demands available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 