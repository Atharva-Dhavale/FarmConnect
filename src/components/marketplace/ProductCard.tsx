import Image from 'next/image';
import Link from 'next/link';

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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const qualityColor = {
    premium: 'bg-yellow-100 text-yellow-800',
    standard: 'bg-blue-100 text-blue-800',
    economy: 'bg-green-100 text-green-800',
  }[product.quality] || 'bg-gray-100 text-gray-800';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={product.images[0] || '/images/product-placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className={`text-sm px-2 py-1 rounded-full ${qualityColor}`}>
            {product.quality}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-lg text-primary-600">
            ₹{product.price} <span className="text-sm font-normal text-gray-500">/ {product.unit}</span>
          </div>
          <div className="text-sm text-gray-500">
            Available: {product.quantity} {product.unit}
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{product.farmer.location.address}</span>
        </div>
        
        <div className="flex justify-between">
          <Link 
            href={`/farmers/${product.farmer._id}`}
            className="text-sm text-primary-600 hover:underline"
          >
            By: {product.farmer.name}
          </Link>
          
          <Link 
            href={`/marketplace/${product._id}`}
            className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm hover:bg-primary-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
} 