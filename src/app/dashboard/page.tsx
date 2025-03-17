import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  ShoppingBag, 
  Truck, 
  Users,
  Calendar,
  Clock,
  Plus
} from 'lucide-react';

export const metadata = {
  title: 'Dashboard - FarmConnect',
  description: 'Manage your agricultural business with FarmConnect',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role || 'user';
  
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {session?.user?.name}! Here's what's happening with your account.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          {userRole === 'farmer' && (
            <Link
              href="/dashboard/products/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:translate-y-[-1px]"
            >
              <Plus className="-ml-1 mr-2 h-4 w-4" />
              Add Product
            </Link>
          )}
          {userRole === 'retailer' && (
            <Link
              href="/dashboard/demands/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:translate-y-[-1px]"
            >
              <Plus className="-ml-1 mr-2 h-4 w-4" />
              Post Demand
            </Link>
          )}
          {userRole === 'transporter' && (
            <Link
              href="/dashboard/transport/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:translate-y-[-1px]"
            >
              <Plus className="-ml-1 mr-2 h-4 w-4" />
              Add Transport
            </Link>
          )}
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold">₹24,500</p>
            </div>
            <div className="bg-green-100 text-green-800 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              8.2%
            </span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {userRole === 'farmer' ? 'Active Listings' : 
                 userRole === 'retailer' ? 'Active Demands' : 
                 'Active Transports'}
              </p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="bg-blue-100 text-blue-800 p-2 rounded-lg">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              4.1%
            </span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">Completed Orders</p>
              <p className="text-2xl font-bold">36</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-2 rounded-lg">
              <Truck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-500 font-medium flex items-center">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              2.3%
            </span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">New Connections</p>
              <p className="text-2xl font-bold">9</p>
            </div>
            <div className="bg-purple-100 text-purple-800 p-2 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              12.5%
            </span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-soft-md p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
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
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Revenue chart will be displayed here</p>
                <p className="text-xs text-gray-400">In a real implementation, you would use a charting library</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-soft-md p-6 border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Link href="/dashboard/activity" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-5">
              {[
                { 
                  title: 'New order received', 
                  description: 'Order #1234 for 50kg tomatoes', 
                  time: '2 hours ago',
                  icon: ShoppingBag,
                  iconBg: 'bg-green-100 text-green-800'
                },
                { 
                  title: 'Transport scheduled', 
                  description: 'Delivery from Mumbai to Pune', 
                  time: '5 hours ago',
                  icon: Truck,
                  iconBg: 'bg-blue-100 text-blue-800'
                },
                { 
                  title: 'Payment received', 
                  description: '₹12,500 from Retailer XYZ', 
                  time: '1 day ago',
                  icon: TrendingUp,
                  iconBg: 'bg-yellow-100 text-yellow-800'
                },
                { 
                  title: 'New connection', 
                  description: 'Farmer ABC wants to connect', 
                  time: '2 days ago',
                  icon: Users,
                  iconBg: 'bg-purple-100 text-purple-800'
                },
              ].map((item, i) => (
                <div key={i} className="flex">
                  <div className="flex-shrink-0">
                    <div className={`h-10 w-10 rounded-lg ${item.iconBg} flex items-center justify-center`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.time}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming section */}
      <div className="bg-white rounded-xl shadow-soft-md p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Schedule</h2>
          <Link href="/dashboard/calendar" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            View calendar
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Order Delivery',
              date: 'Today, 2:00 PM',
              description: 'Delivery of 100kg potatoes to Retailer XYZ',
              icon: Truck
            },
            {
              title: 'Payment Due',
              date: 'Tomorrow, 10:00 AM',
              description: 'Payment of ₹15,000 from Retailer ABC',
              icon: Calendar
            },
            {
              title: 'Product Listing Expiry',
              date: 'In 2 days',
              description: 'Your listing for organic tomatoes will expire',
              icon: ShoppingBag
            },
          ].map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="h-8 w-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center mr-3">
                  <item.icon className="h-4 w-4" />
                </div>
                <h3 className="font-medium text-gray-900">{item.title}</h3>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                {item.date}
              </div>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 