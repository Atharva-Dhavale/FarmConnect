"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useRouter } from 'next/navigation';

interface ProductDetailViewProps {
  productId: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  images: string[];
  quality: string;
  category: string;
  subcategory?: string;
  harvestDate?: string;
  expiryDate?: string;
  isOrganic: boolean;
  farmer: {
    _id: string;
    name: string;
    location: {
      address: string;
    };
    phone: string;
  };
}

export default function ProductDetailView({ productId }: ProductDetailViewProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        
        if (data.success) {
          setProduct(data.data);
        } else {
          setError(data.message || 'Failed to fetch product');
        }
      } catch (err) {
        setError('An error occurred while fetching the product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [productId]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && product && value <= product.quantity) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    // In a real app, this would add the product to a cart
    alert(`Added ${quantity} ${product?.unit} of ${product?.name} to cart`);
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error || !product) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'Product not found'}</p>
        <Link href="/marketplace" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to Marketplace
        </Link>
      </div>
    );
  }
  
  const qualityColor = {
    premium: 'bg-yellow-100 text-yellow-800',
    standard: 'bg-blue-100 text-blue-800',
    economy: 'bg-green-100 text-green-800',
  }[product.quality] || 'bg-gray-100 text-gray-800';
  
  return (
    <div>
      <Link href="/marketplace" className="text-primary-600 hover:underline mb-6 inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Marketplace
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="relative h-[400px] w-full">
            <Image
              src={product.images[0] || '/images/product-placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <span className={`text-sm px-2 py-1 rounded-full ${qualityColor}`}>
                {product.quality}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="flex items-center mb-4">
              <div className="font-bold text-2xl text-primary-600">
                ₹{product.price} <span className="text-sm font-normal text-gray-500">/ {product.unit}</span>
              </div>
              <div className="ml-4 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Available: {product.quantity} {product.unit}
              </div>
            </div>
            
            {product.isOrganic && (
              <div className="mb-4 inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Organic
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p>{product.category} {product.subcategory ? `/ ${product.subcategory}` : ''}</p>
              </div>
              {product.harvestDate && (
                <div>
                  <p className="text-sm text-gray-500">Harvest Date</p>
                  <p>{new Date(product.harvestDate).toLocaleDateString()}</p>
                </div>
              )}
              {product.expiryDate && (
                <div>
                  <p className="text-sm text-gray-500">Best Before</p>
                  <p>{new Date(product.expiryDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
            
            <div className="border-t border-b py-4 mb-6">
              <h3 className="font-semibold mb-2">Farmer Details</h3>
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                  <span className="text-gray-600 font-semibold">{product.farmer.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">{product.farmer.name}</p>
                  <p className="text-sm text-gray-500">{product.farmer.location.address}</p>
                </div>
                <Link 
                  href={`/farmers/${product.farmer._id}`}
                  className="ml-auto text-primary-600 hover:underline"
                >
                  View Profile
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-1/3">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 