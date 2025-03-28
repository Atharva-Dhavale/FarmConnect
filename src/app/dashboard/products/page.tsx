"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Search, Plus, Filter, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

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
}

export default function ProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const isFarmer = session?.user?.role === 'farmer';

  useEffect(() => {
    fetchProducts();
  }, [availabilityFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      let url = '/api/products';
      const params = new URLSearchParams();
      
      if (availabilityFilter !== 'all') {
        params.append('isAvailable', availabilityFilter === 'available' ? 'true' : 'false');
      }
      
      if (session?.user?.id && isFarmer) {
        params.append('farmer', session.user.id);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      
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

  // Handle product status toggle
  const toggleProductAvailability = async (productId: string, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      
      // In a real app, you would call an API to update the product status
      toast.success(`Product ${newStatus ? 'marked as available' : 'marked as unavailable'}`);
      
      // Update local state for immediate UI feedback
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product._id === productId 
            ? {...product, isAvailable: newStatus} 
            : product
        )
      );
    } catch (error) {
      toast.error('Failed to update product status');
    }
  };

  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Products</h1>
        <div className="flex space-x-2">
          <Button
            onClick={fetchProducts}
            variant="outline"
          >
            Refresh
          </Button>
          {isFarmer && (
            <Link href="/dashboard/products/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          )}
        </div>
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
        
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="w-full md:w-40 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
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
          {isFarmer && (
            <Link href="/dashboard/products/add">
              <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Add New Product
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
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
                <div className="absolute top-2 right-2 flex space-x-2">
                  {product.isOrganic && (
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                      Organic
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    product.isAvailable 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description || 'No description available'}</p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Filter className="w-4 h-4 mr-1" />
                  <span>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                </div>
                
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
                
                {product.harvestDate && (
                  <div className="text-sm text-gray-500">
                    Harvest Date: {formatDate(product.harvestDate)}
                  </div>
                )}
                
                {product.expiryDate && (
                  <div className="text-sm text-gray-500">
                    Expiry Date: {formatDate(product.expiryDate)}
                  </div>
                )}
                
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => toggleProductAvailability(product._id, product.isAvailable)}
                  >
                    {product.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                  </Button>
                  <Link href={`/dashboard/products/edit/${product._id}`}>
                    <Button 
                      variant="outline"
                      className="flex-1"
                    >
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 