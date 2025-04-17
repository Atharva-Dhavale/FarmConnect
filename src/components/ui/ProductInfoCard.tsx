"use client";

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Tag, Calendar, Info, User, Star } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  category: string;
  quality: string;
  images: string[];
  isOrganic: boolean;
  isAvailable: boolean;
  harvestDate?: string;
  expiryDate?: string;
  createdAt: string;
  farmer?: {
    _id: string;
    name: string;
    location?: {
      address: string;
    };
  };
}

interface ProductInfoCardProps {
  product: Product;
  showFarmerInfo?: boolean;
  showActionButtons?: boolean;
  onActionClick?: (action: 'view' | 'edit' | 'delete', productId: string) => void;
}

export default function ProductInfoCard({
  product, 
  showFarmerInfo = true,
  showActionButtons = true,
  onActionClick
}: ProductInfoCardProps) {
  const qualityColor = {
    premium: 'bg-yellow-100 text-yellow-800',
    standard: 'bg-blue-100 text-blue-800',
    economy: 'bg-green-100 text-green-800'
  }[product.quality?.toLowerCase()] || 'bg-gray-100 text-gray-800';

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const handleAction = (action: 'view' | 'edit' | 'delete') => {
    if (onActionClick) {
      onActionClick(action, product._id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft-md overflow-hidden hover:shadow-soft-lg transition-all duration-300">
      <div className="relative h-48 w-full bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <Info className="h-10 w-10" />
          </div>
        )}
        
        {product.isOrganic && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Organic
          </div>
        )}
        
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
            <span className="text-white text-lg font-bold">Sold Out</span>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${qualityColor}`}>
            {product.quality ? product.quality.charAt(0).toUpperCase() + product.quality.slice(1) : 'Standard'}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2">{product.description || 'No description available'}</p>
        
        <div className="flex items-center text-sm text-gray-500">
          <Tag className="w-4 h-4 mr-1" />
          <span>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">
            ₹{product.price}/{product.unit}
          </div>
        </div>
        
        <div className="text-sm text-gray-500 flex items-center">
          <div className="inline-flex items-center mr-4">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(product.harvestDate)}
          </div>
          {product.quantity > 0 && (
            <div className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs">
              Available: {product.quantity} {product.unit}
            </div>
          )}
        </div>
        
        {showFarmerInfo && product.farmer && (
          <div className="text-sm text-gray-500 pt-2 border-t border-gray-100 mt-2">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span className="font-medium">{product.farmer.name}</span>
            </div>
            {product.farmer.location && (
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{product.farmer.location.address}</span>
              </div>
            )}
          </div>
        )}
        
        {showActionButtons && (
          <div className="flex space-x-2 pt-3 border-t border-gray-100 mt-2">
            <button 
              onClick={() => handleAction('view')}
              className="flex-1 py-2 bg-primary-50 hover:bg-primary-100 text-primary-700 text-sm font-medium rounded-lg transition-colors"
            >
              View Details
            </button>
            <button 
              onClick={() => handleAction('edit')}
              className="flex-1 py-2 bg-secondary-50 hover:bg-secondary-100 text-secondary-700 text-sm font-medium rounded-lg transition-colors"
            >
              Edit
            </button>
            <button 
              onClick={() => handleAction('delete')}
              className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-sm font-medium rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 