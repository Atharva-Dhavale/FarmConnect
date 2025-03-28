"use client";

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Search, Filter } from 'lucide-react';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  // Enhanced mock data for demonstration
  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      seller: 'Green Farms',
      price: 40,
      unit: 'kg',
      category: 'vegetables',
      available: 100,
      image: '/images/placeholder.jpg',
    },
    {
      id: 2,
      name: 'Organic Apples',
      seller: 'Highland Orchards',
      price: 120,
      unit: 'kg',
      category: 'fruits',
      available: 75,
      image: '/images/placeholder.jpg',
    },
    {
      id: 3,
      name: 'Basmati Rice',
      seller: 'Golden Grains',
      price: 80,
      unit: 'kg',
      category: 'grains',
      available: 500,
      image: '/images/placeholder.jpg',
    },
    {
      id: 4,
      name: 'Farm Fresh Milk',
      seller: 'Dairy Delight',
      price: 60,
      unit: 'l',
      category: 'dairy',
      available: 50,
      image: '/images/placeholder.jpg',
    },
    {
      id: 5,
      name: 'Organic Potatoes',
      seller: 'Earth Harvests',
      price: 30,
      unit: 'kg',
      category: 'vegetables',
      available: 200,
      image: '/images/placeholder.jpg',
    },
    {
      id: 6,
      name: 'Fresh Mangoes',
      seller: 'Tropical Farms',
      price: 150,
      unit: 'kg',
      category: 'fruits',
      available: 80,
      image: '/images/placeholder.jpg',
    }
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Marketplace</h1>
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-48 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="all">All Categories</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains & Cereals</option>
          <option value="dairy">Dairy Products</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found matching your criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <div className="text-sm text-gray-500">Seller: {product.seller}</div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary-600">
                    ₹{product.price}/{product.unit}
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
                <div className="text-sm text-gray-500">
                  Available: {product.available} {product.unit}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 