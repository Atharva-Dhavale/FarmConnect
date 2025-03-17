import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Filter, ArrowRight } from 'lucide-react';
import TransportCard from '@/components/transport/TransportCard';
import TransportFilters from '@/components/transport/TransportFilters';

export const metadata = {
  title: 'Transport - FarmConnect',
  description: 'Find transport services for your agricultural products',
};

async function getTransportData(searchParams: { [key: string]: string | string[] | undefined }) {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Build query string from search params
    const params = new URLSearchParams();
    
    if (typeof searchParams.departure === 'string') {
      params.set('departure', searchParams.departure);
    }
    
    if (typeof searchParams.destination === 'string') {
      params.set('destination', searchParams.destination);
    }
    
    const queryString = params.toString();
    const url = queryString ? `${baseUrl}/api/transport?${queryString}` : `${baseUrl}/api/transport`;
    
    const res = await fetch(url, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch transport listings');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching transport listings:', error);
    return [];
  }
}

export default async function TransportPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const transportListings = await getTransportData(searchParams);
  
  const departure = typeof searchParams.departure === 'string' ? searchParams.departure : '';
  const destination = typeof searchParams.destination === 'string' ? searchParams.destination : '';
  
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Transport Services</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with transporters to move your agricultural products efficiently and reliably.
            {!session && (
              <span className="block mt-2">
                <Link href="/register?role=transporter" className="text-primary-600 hover:text-primary-700 font-medium">
                  Register as a transporter
                </Link>{' '}
                to list your services.
              </span>
            )}
          </p>
        </div>
        
        {/* Filters and Transport Listings */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-soft-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <Filter className="h-5 w-5 text-gray-500" />
              </div>
              <TransportFilters 
                initialDeparture={departure} 
                initialDestination={destination} 
              />
            </div>
          </div>
          
          {/* Transport Listings Grid */}
          <div className="lg:w-3/4">
            {transportListings.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {transportListings.map((transport: any) => (
                  <TransportCard key={transport._id} transport={transport} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-soft-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No transport services found</h3>
                <p className="text-gray-600 mb-6">
                  {departure || destination 
                    ? `There are currently no transport services matching your search criteria.` 
                    : 'There are currently no available transport services.'}
                </p>
                {session?.user.role === 'transporter' && (
                  <Link 
                    href="/dashboard/transport/add" 
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    List your transport service
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
            
            {/* Call to Action */}
            {session?.user.role === 'transporter' && (
              <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Have transport capacity available?</h3>
                <p className="mb-4">List your transport service and connect with farmers and retailers.</p>
                <Link 
                  href="/dashboard/transport/add" 
                  className="inline-flex items-center bg-white text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                >
                  Add Transport Listing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
            
            {!session && (
              <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Are you a transporter looking for business?</h3>
                <p className="mb-4">Join FarmConnect to list your transport services and connect with farmers and retailers.</p>
                <Link 
                  href="/register?role=transporter" 
                  className="inline-flex items-center bg-white text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                >
                  Register as Transporter
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