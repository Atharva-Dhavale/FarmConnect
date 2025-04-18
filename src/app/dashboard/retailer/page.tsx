"use client";

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Farmer {
  _id: string;
  name: string;
  location: string;
}

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
  farmer: Farmer | string;
  isOrganic: boolean;
  isAvailable: boolean;
}

export default function RetailerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/products?isAvailable=true');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch products');
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setError(error.message || 'Failed to load products');
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Helper function to safely get farmer details
  const getFarmerDetails = (farmer: Farmer | string) => {
    if (!farmer) return { name: 'Unknown', location: 'Unknown' };
    
    if (typeof farmer === 'string') {
      return { name: 'Unknown', location: 'Unknown' };
    }
    
    return {
      name: farmer.name || 'Unknown',
      location: farmer.location || 'Unknown'
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Available Products</h1>
        <button 
          onClick={fetchProducts}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-48 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Categories</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
          <option value="dairy">Dairy</option>
          <option value="poultry">Poultry</option>
          <option value="spices">Spices</option>
          <option value="other">Other</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 flex flex-col items-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const farmerDetails = getFarmerDetails(product.farmer);
            
            return (
              <Card key={product._id}>
                <div className="aspect-w-16 aspect-h-9 relative">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover w-full h-48 rounded-t-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <p className="text-gray-500">No image available</p>
                    </div>
                  )}
                  {product.isOrganic && (
                    <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                      Organic
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description || 'No description available'}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-primary-600">
                      ₹{product.price}/{product.unit}
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product.quality === 'premium' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : product.quality === 'standard'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.quality ? product.quality.charAt(0).toUpperCase() + product.quality.slice(1) : 'Standard'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Available: {product.quantity} {product.unit}
                  </div>
                  <div className="text-sm text-gray-500">
                    Farmer: {farmerDetails.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Location: {farmerDetails.location}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 