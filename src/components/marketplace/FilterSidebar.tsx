"use client";

import { useState } from 'react';

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  
  const categories = [
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains & Cereals' },
    { id: 'dairy', name: 'Dairy Products' },
    { id: 'poultry', name: 'Poultry & Meat' },
    { id: 'spices', name: 'Spices & Herbs' },
  ];
  
  const qualities = [
    { id: 'premium', name: 'Premium' },
    { id: 'standard', name: 'Standard' },
    { id: 'economy', name: 'Economy' },
  ];
  
  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  const handleQualityChange = (qualityId: string) => {
    if (selectedQualities.includes(qualityId)) {
      setSelectedQualities(selectedQualities.filter(id => id !== qualityId));
    } else {
      setSelectedQualities([...selectedQualities, qualityId]);
    }
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newPriceRange = [...priceRange];
    newPriceRange[index] = newValue;
    setPriceRange(newPriceRange);
  };
  
  const handleApplyFilters = () => {
    // In a real app, this would update the URL or trigger a state change in the parent
    console.log({
      priceRange,
      selectedCategories,
      selectedQualities
    });
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full border rounded-md px-2 py-1"
            min="0"
          />
          <span>to</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full border rounded-md px-2 py-1"
            min="0"
          />
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="mr-2"
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>
      
      {/* Quality */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Quality</h3>
        <div className="space-y-2">
          {qualities.map((quality) => (
            <label key={quality.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedQualities.includes(quality.id)}
                onChange={() => handleQualityChange(quality.id)}
                className="mr-2"
              />
              {quality.name}
            </label>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleApplyFilters}
        className="w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
} 