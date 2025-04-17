"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Search, Plus, Filter, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProductInfoCard from '@/components/ui/ProductInfoCard';

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

export default function ProductsPage() {
  const { data: session } = useSession();
  const router = useRouter();
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

  const handleProductAction = (action: 'view' | 'edit' | 'delete', productId: string) => {
    const product = products.find(p => p._id === productId);
    if (!product) return;
    
    if (action === 'view') {
      router.push(`/dashboard/products/${productId}`);
    } else if (action === 'edit') {
      router.push(`/dashboard/products/edit/${productId}`);
    } else if (action === 'delete') {
      // Confirmation dialog could be implemented
      if (confirm('Are you sure you want to delete this product?')) {
        // In a real app, you would call an API to delete the product
        toast.success('Product deleted successfully');
        setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
      }
    }
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
            <ProductInfoCard 
              key={product._id}
              product={product}
              showFarmerInfo={!isFarmer}
              onActionClick={handleProductAction}
            />
          ))}
        </div>
      )}
    </div>
  );
} 