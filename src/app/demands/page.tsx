import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Filter, ArrowRight } from 'lucide-react';
import DemandCard from '@/components/demands/DemandCard';
import DemandFilters from '@/components/demands/DemandFilters';

export const metadata = {
  title: 'Demands - FarmConnect',
  description: 'Browse retailer demands for agricultural products',
};

async function getDemandsData() {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/demands`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch demands');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching demands:', error);
    return [];
  }
}

export default async function DemandsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const demands = await getDemandsData();
  
  // Get category from search params or default to 'all'
  const category = typeof searchParams.category === 'string' ? searchParams.category : 'all';
  
  // Filter demands by category if needed
  const filteredDemands = category === 'all' 
    ? demands 
    : demands.filter((demand: any) => demand.category === category);
  
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Retailer Demands</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore current demands from retailers looking for quality agricultural products.
            {!session && (
              <span className="block mt-2">
                <Link href="/register?role=farmer" className="text-primary-600 hover:text-primary-700 font-medium">
                  Register as a farmer
                </Link>{' '}
                to respond to these demands.
              </span>
            )}
          </p>
        </div>
        
        {/* Filters and Demands */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-soft-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <Filter className="h-5 w-5 text-gray-500" />
              </div>
              <DemandFilters selectedCategory={category} />
            </div>
          </div>
          
          {/* Demands Grid */}
          <div className="lg:w-3/4">
            {filteredDemands.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDemands.map((demand: any) => (
                  <DemandCard key={demand._id} demand={demand} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-soft-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No demands found</h3>
                <p className="text-gray-600 mb-6">
                  {category !== 'all' 
                    ? `There are currently no demands in the ${category} category.` 
                    : 'There are currently no open demands.'}
                </p>
                {session?.user.role === 'retailer' && (
                  <Link 
                    href="/dashboard/demands/add" 
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Post a new demand
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
            
            {/* Call to Action */}
            {session?.user.role === 'retailer' && (
              <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Need specific agricultural products?</h3>
                <p className="mb-4">Post your requirements and connect with farmers directly.</p>
                <Link 
                  href="/dashboard/demands/add" 
                  className="inline-flex items-center bg-white text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                >
                  Post a Demand
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
            
            {!session && (
              <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Are you a retailer looking for quality produce?</h3>
                <p className="mb-4">Join FarmConnect to post your demands and connect with farmers directly.</p>
                <Link 
                  href="/register?role=retailer" 
                  className="inline-flex items-center bg-white text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                >
                  Register as Retailer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 