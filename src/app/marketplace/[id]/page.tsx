import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductDetailView from '@/components/marketplace/ProductDetailView';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailView productId={params.id} />
    </div>
  );
} 