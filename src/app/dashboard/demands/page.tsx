"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Search, Plus, Filter, Calendar, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface Retailer {
  _id: string;
  name: string;
  email: string;
  location: string;
}

interface Demand {
  _id: string;
  product: string;
  category: string;
  quantity: number;
  unit: string;
  priceRange: {
    min: number;
    max: number;
  };
  description: string;
  requiredBy: string;
  location: string;
  status: 'open' | 'fulfilled' | 'expired' | 'cancelled';
  isOrganic: boolean;
  qualityPreference: string;
  retailer: Retailer | string;
  createdAt: string;
}

export default function DemandsPage() {
  const { data: session } = useSession();
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const isRetailer = session?.user?.role === 'retailer';

  useEffect(() => {
    fetchDemands();
  }, [statusFilter]);

  const fetchDemands = async () => {
    try {
      setLoading(true);
      setError('');
      
      let url = '/api/demands';
      if (statusFilter !== 'all') {
        url += `?status=${statusFilter}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setDemands(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch demands');
      }
    } catch (error: any) {
      console.error('Error fetching demands:', error);
      setError(error.message || 'Failed to load demands');
      toast.error('Failed to load demands');
    } finally {
      setLoading(false);
    }
  };

  const filteredDemands = demands.filter(demand => {
    const matchesSearch = demand.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (demand.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || demand.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Helper function to safely get retailer details
  const getRetailerDetails = (retailer: Retailer | string) => {
    if (!retailer) return { name: 'Unknown', location: 'Unknown' };
    
    if (typeof retailer === 'string') {
      return { name: 'Unknown', location: 'Unknown' };
    }
    
    return {
      name: retailer.name || 'Unknown',
      location: retailer.location || 'Unknown'
    };
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
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
        <h1 className="text-3xl font-bold">Demands</h1>
        <div className="flex space-x-2">
          <Button
            onClick={fetchDemands}
            variant="outline"
          >
            Refresh
          </Button>
          {isRetailer && (
            <Link href="/dashboard/demands/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post New Demand
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search demands..."
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-40 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="expired">Expired</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading demands...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 flex flex-col items-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchDemands}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      ) : filteredDemands.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No demands found</p>
          {isRetailer && (
            <Link href="/dashboard/demands/add">
              <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Post New Demand
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDemands.map((demand) => {
            const retailerDetails = getRetailerDetails(demand.retailer);
            
            return (
              <Card key={demand._id}>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{demand.product}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      demand.status === 'open'
                        ? 'bg-green-100 text-green-800'
                        : demand.status === 'fulfilled'
                        ? 'bg-blue-100 text-blue-800'
                        : demand.status === 'expired'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {demand.status.charAt(0).toUpperCase() + demand.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 line-clamp-2">{demand.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Filter className="w-4 h-4 mr-1" />
                    <span>{demand.category.charAt(0).toUpperCase() + demand.category.slice(1)}</span>
                    {demand.isOrganic && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                        Organic
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span>Qty: {demand.quantity} {demand.unit}</span>
                    </div>
                    <div className="text-md font-bold text-primary-600">
                      ₹{demand.priceRange.min} - ₹{demand.priceRange.max}/{demand.unit}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Required by: {formatDate(demand.requiredBy)}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="text-sm text-gray-500">
                      <span>Posted by: {retailerDetails.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span>Location: {demand.location}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      <span>Posted on: {formatDate(demand.createdAt)}</span>
                    </div>
                  </div>
                  
                  {!isRetailer && demand.status === 'open' && (
                    <Button
                      className="w-full"
                      onClick={() => {
                        toast.success(`You can contact ${retailerDetails.name} to fulfill this demand`);
                      }}
                    >
                      Respond to Demand
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 