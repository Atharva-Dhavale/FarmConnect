"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface DemandFiltersProps {
  selectedCategory: string;
}

export default function DemandFilters({ selectedCategory }: DemandFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState(selectedCategory || 'all');
  
  // Categories for agricultural products
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'grains', name: 'Grains & Cereals' },
    { id: 'pulses', name: 'Pulses' },
    { id: 'dairy', name: 'Dairy Products' },
    { id: 'spices', name: 'Spices' },
    { id: 'nuts', name: 'Nuts & Seeds' },
    { id: 'other', name: 'Other Products' },
  ];
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (category && category !== 'all') {
      params.set('category', category);
    }
    
    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.push(url);
  }, [category, pathname, router]);
  
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center">
              <input
                id={`category-${cat.id}`}
                name="category"
                type="radio"
                checked={category === cat.id}
                onChange={() => setCategory(cat.id)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
              />
              <label
                htmlFor={`category-${cat.id}`}
                className="ml-3 text-sm text-gray-700 cursor-pointer"
              >
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reset Filters Button */}
      <button
        onClick={() => setCategory('all')}
        className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
} 