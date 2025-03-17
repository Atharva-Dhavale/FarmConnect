"use client";

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../ui/LoadingSpinner';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  images: string[];
  quality: string;
  farmer: {
    _id: string;
    name: string;
    location: {
      address: string;
    };
  };
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('/api/products?isAvailable=true');
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError('An error occurred while fetching products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products available at the moment.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
} 