"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Tag, Calendar, Info, User, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Button from '@/components/ui/Button';

interface ProductPageProps {
  params: {
    id: string;
  };
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

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const isFarmer = session?.user?.role === 'farmer';
  
  useEffect(() => {
    fetchProduct();
  }, [params.id]);
  
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${params.id}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProduct(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch product');
      }
    } catch (error: any) {
      console.error('Error fetching product:', error);
      setError(error.message || 'Failed to load product');
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = () => {
    router.push(`/dashboard/products/edit/${params.id}`);
  };
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      // In a real app, you would call an API to delete the product
      toast.success('Product deleted successfully');
      router.push('/dashboard/products');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  
  const qualityColor = product?.quality ? {
    premium: 'bg-yellow-100 text-yellow-800',
    standard: 'bg-blue-100 text-blue-800',
    economy: 'bg-green-100 text-green-800'
  }[product.quality.toLowerCase()] || 'bg-gray-100 text-gray-800' : '';
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        <p className="mt-4 text-gray-500">Loading product details...</p>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error || 'Product not found'}</p>
        <Button className="mt-4" onClick={() => router.push('/dashboard/products')}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/products')}
          className="mr-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Product Details</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-soft-md hover:shadow-soft-lg transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="p-6">
            <div className="relative h-[400px] w-full bg-gray-100 rounded-xl overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Info className="h-16 w-16" />
                </div>
              )}
              
              {product.isOrganic && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                  Organic
                </div>
              )}
              
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  product.isAvailable 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
            
            {/* Additional images can be added in a row below */}
            <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
              {product.images && product.images.map((image, index) => (
                <div key={index} className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                  <Image
                    src={image}
                    alt={`${product.name} - image ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                <div className="flex items-center mt-1">
                  <Tag className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-600">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                  <span className={`ml-3 px-2 py-0.5 text-xs font-semibold rounded-full ${qualityColor}`}>
                    {product.quality.charAt(0).toUpperCase() + product.quality.slice(1)}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-600">
                ₹{product.price}/{product.unit}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description || 'No description available'}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Quantity Available</p>
                <p className="font-semibold">{product.quantity} {product.unit}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Quality</p>
                <p className="font-semibold">{product.quality}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Harvest Date</p>
                <p className="font-semibold">{formatDate(product.harvestDate)}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="font-semibold">{formatDate(product.expiryDate)}</p>
              </div>
            </div>
            
            {product.farmer && !isFarmer && (
              <div className="mb-6 border-t border-gray-100 pt-4">
                <h3 className="text-lg font-medium mb-2">Farmer Information</h3>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                    {product.farmer.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{product.farmer.name}</p>
                    {product.farmer.location && (
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {product.farmer.location.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {isFarmer && (
              <div className="flex space-x-3 mt-6 pt-4 border-t border-gray-100">
                <Button 
                  onClick={handleEdit}
                  className="flex-1"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Product
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex-1"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 