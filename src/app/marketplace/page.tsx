import React from 'react';
import ProductList from '@/components/marketplace/ProductList';
import FilterSidebar from '@/components/marketplace/FilterSidebar';

export const metadata = {
  title: 'Marketplace - FarmConnect',
  description: 'Browse and purchase agricultural products from farmers across the country',
};

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Agricultural Marketplace</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <FilterSidebar />
        </div>
        
        <div className="md:w-3/4">
          <ProductList />
        </div>
      </div>
    </div>
  );
} 