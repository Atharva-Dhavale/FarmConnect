import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  Truck, 
  Users,
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';
import AnalyticsOverviewCard from '@/components/analytics/AnalyticsOverviewCard';
import PriceTrendTable from '@/components/analytics/PriceTrendTable';
import PopularCategoriesChart from '@/components/analytics/PopularCategoriesChart';
import RecentDemandsTable from '@/components/analytics/RecentDemandsTable';
import PopularRoutesMap from '@/components/analytics/PopularRoutesMap';

export const metadata = {
  title: 'Analytics - FarmConnect',
  description: 'Data-driven insights for agricultural market trends',
};

async function getAnalyticsData() {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/analytics`, {
      cache: 'no-store',
      headers: {
        Cookie: `next-auth.session-token=${process.env.MOCK_SESSION_TOKEN || ''}`,
      },
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return {
      users: { total: 0, farmers: 0, retailers: 0, transporters: 0 },
      demands: { open: 0, fulfilled: 0, recent: [], byCategory: [] },
      transports: { available: 0, completed: 0, popularRoutes: [] },
      market: { priceTrends: [] },
    };
  }
}

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  const analyticsData = await getAnalyticsData();
  
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Market Analytics</h1>
          <p className="mt-2 text-lg text-gray-600">
            Data-driven insights to help you make informed decisions for your agricultural business.
          </p>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsOverviewCard
            title="Total Users"
            value={analyticsData.users.total}
            icon={Users}
            change={5.2}
            iconBg="bg-purple-100 text-purple-800"
          />
          <AnalyticsOverviewCard
            title="Open Demands"
            value={analyticsData.demands.open}
            icon={ShoppingBag}
            change={8.1}
            iconBg="bg-blue-100 text-blue-800"
          />
          <AnalyticsOverviewCard
            title="Available Transport"
            value={analyticsData.transports.available}
            icon={Truck}
            change={-2.3}
            iconBg="bg-yellow-100 text-yellow-800"
          />
          <AnalyticsOverviewCard
            title="Fulfilled Demands"
            value={analyticsData.demands.fulfilled}
            icon={TrendingUp}
            change={12.5}
            iconBg="bg-green-100 text-green-800"
          />
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Price Trends */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-soft-md p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Price Trends</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors">
                    Weekly
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Monthly
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Yearly
                  </button>
                </div>
              </div>
              
              <PriceTrendTable priceTrends={analyticsData.market.priceTrends} />
            </div>
          </div>
          
          {/* Popular Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft-md p-6 border border-gray-100 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Popular Categories</h2>
                <Link href="/demands" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                  View all
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <PopularCategoriesChart categories={analyticsData.demands.byCategory} />
            </div>
          </div>
        </div>
        
        {/* Recent Demands */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-soft-md p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Demands</h2>
              <Link href="/demands" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View all demands
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <RecentDemandsTable demands={analyticsData.demands.recent} />
          </div>
        </div>
        
        {/* Popular Routes */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-soft-md p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Popular Transport Routes</h2>
              <Link href="/transport" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View all transport
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <PopularRoutesMap routes={analyticsData.transports.popularRoutes} />
          </div>
        </div>
        
        {/* Market Insights */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-soft-md p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Market Insights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center mr-3">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium text-gray-900">Trending Products</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Tomatoes and rice are showing strong price increases. Consider focusing on these crops for better returns.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mr-3">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium text-gray-900">Seasonal Forecast</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Upcoming monsoon season will likely increase demand for grains and pulses. Plan your inventory accordingly.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center mr-3">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium text-gray-900">Price Alerts</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Potato and onion prices are trending downward. Consider diversifying your product mix if these are your main crops.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="h-8 w-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center mr-3">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium text-gray-900">Regional Opportunities</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Mumbai-Pune and Delhi-Jaipur routes show high transport demand. Transporters should focus on these corridors.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
} 