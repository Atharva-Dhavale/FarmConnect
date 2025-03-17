"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

interface DemandCardProps {
  demand: {
    _id: string;
    productName: string;
    category: string;
    subcategory?: string;
    quantity: number;
    unit: string;
    minPrice: number;
    maxPrice: number;
    requiredBy: string;
    deliveryAddress: string;
    retailerName: string;
    createdAt: string;
  };
}

export default function DemandCard({ demand }: DemandCardProps) {
  const { data: session } = useSession();
  const isFarmer = session?.user?.role === 'farmer';
  
  // Format dates
  const createdAtDate = new Date(demand.createdAt);
  const requiredByDate = new Date(demand.requiredBy);
  
  const timeAgo = formatDistanceToNow(createdAtDate, { addSuffix: true });
  const requiredByFormatted = format(requiredByDate, 'MMM d, yyyy');
  
  // Check if the required by date is in the past
  const isExpired = new Date() > requiredByDate;
  
  return (
    <div className="bg-white rounded-xl shadow-soft-md overflow-hidden hover:shadow-soft-lg transition-all duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{demand.productName}</h3>
            <p className="text-sm text-gray-500">Posted by {demand.retailerName} • {timeAgo}</p>
          </div>
          <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
            {demand.category}
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Tag className="h-4 w-4 mr-2 text-gray-400" />
            <span>
              {demand.quantity} {demand.unit} • ₹{demand.minPrice} - ₹{demand.maxPrice} per {demand.unit}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className={isExpired ? 'text-red-500' : ''}>
              Required by {requiredByFormatted} {isExpired && '(Expired)'}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="truncate">{demand.deliveryAddress}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <Link 
            href={`/demands/${demand._id}`} 
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          
          {isFarmer && !isExpired && (
            <Link
              href={`/dashboard/offers/create?demandId=${demand._id}`}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              Make Offer
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 