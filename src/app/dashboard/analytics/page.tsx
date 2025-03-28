"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Card from '@/components/ui/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, Package, Users, DollarSign, Calendar, ArrowRight } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const { data: session } = useSession();
  const [timeRange, setTimeRange] = useState('month');
  const isRetailer = session?.user?.role === 'retailer';
  const isFarmer = session?.user?.role === 'farmer';

  // Sample data for line charts (Sales/Revenue trend)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const recentMonths = months.slice(Math.max(0, currentMonth - 5), currentMonth + 1);

  // Farmer data
  const farmerRevenue = [45000, 52000, 49000, 60000, 62000, 58000];
  const productsSold = [120, 145, 135, 160, 170, 155];
  
  const farmerLineChartData = {
    labels: recentMonths,
    datasets: [
      {
        label: 'Revenue (₹)',
        data: farmerRevenue,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  const farmerProductsChartData = {
    labels: recentMonths,
    datasets: [
      {
        label: 'Products Sold',
        data: productsSold,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
      },
    ],
  };
  
  const farmerCategoryData = {
    labels: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Poultry', 'Spices'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [30, 22, 18, 15, 10, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const farmerQualityDistribution = {
    labels: ['Premium', 'Standard', 'Economy'],
    datasets: [
      {
        label: 'Products by Quality',
        data: [40, 45, 15],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Retailer data
  const retailerSpending = [38000, 42000, 40000, 52000, 48000, 54000];
  const ordersPlaced = [25, 32, 28, 36, 30, 38];
  
  const retailerLineChartData = {
    labels: recentMonths,
    datasets: [
      {
        label: 'Spending (₹)',
        data: retailerSpending,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.3,
      },
    ],
  };
  
  const retailerOrdersChartData = {
    labels: recentMonths,
    datasets: [
      {
        label: 'Orders Placed',
        data: ordersPlaced,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
      },
    ],
  };
  
  const retailerDemandStatusData = {
    labels: ['Open', 'Fulfilled', 'Expired', 'Cancelled'],
    datasets: [
      {
        label: 'Demand Status',
        data: [42, 35, 15, 8],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const retailerCategoryPreference = {
    labels: ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Poultry', 'Spices'],
    datasets: [
      {
        label: 'Orders by Category',
        data: [35, 25, 15, 12, 8, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 shadow-lg p-6 mb-10 overflow-hidden">
        {/* Abstract shapes for background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-white"></div>
          <div className="absolute top-[20%] right-[5%] w-[25%] h-[25%] rounded-full bg-white"></div>
          <div className="absolute bottom-[5%] left-[30%] w-[20%] h-[20%] rounded-full bg-white"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-block mb-2 px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {isFarmer ? 'Farmer Insights' : isRetailer ? 'Retailer Insights' : 'Analytics'}
              </div>
              <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
              <p className="mt-2 text-primary-100">
                {isFarmer 
                  ? 'Track your sales performance and product insights'
                  : isRetailer 
                    ? 'Monitor your purchasing activity and demands'
                    : 'Welcome to your analytics center'}
              </p>
            </div>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white/20 text-white backdrop-blur-sm border-0 rounded-xl py-2 px-4 focus:ring-2 focus:ring-white/50 focus:border-0"
            >
              <option value="week" className="text-gray-800">Last Week</option>
              <option value="month" className="text-gray-800">Last Month</option>
              <option value="quarter" className="text-gray-800">Last Quarter</option>
              <option value="year" className="text-gray-800">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats-card group">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {isFarmer ? 'Total Revenue' : 'Total Spending'}
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  ₹{isFarmer ? '325,678' : '254,000'}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                {isFarmer ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${isFarmer ? 'text-green-600' : 'text-green-600'}`}>
                  +{isFarmer ? '12.5' : '8.3'}%
                </span>
                <span className="ml-2 text-xs text-gray-500">vs last period</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {isFarmer ? 'Products Sold' : 'Orders Placed'}
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {isFarmer ? '885' : '189'}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600 group-hover:bg-secondary-600 group-hover:text-white transition-colors duration-300">
                <Package className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +{isFarmer ? '9.7' : '15.2'}%
                </span>
                <span className="ml-2 text-xs text-gray-500">vs last period</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {isFarmer ? 'Average Order Value' : 'Average Purchase Value'}
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  ₹{isFarmer ? '368.00' : '1,344.00'}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors duration-300">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                {isFarmer ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${isFarmer ? 'text-green-600' : 'text-red-500'}`}>
                  {isFarmer ? '+2.5' : '-4.1'}%
                </span>
                <span className="ml-2 text-xs text-gray-500">vs last period</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {isFarmer ? 'Active Products' : 'Active Demands'}
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {isFarmer ? '32' : '14'}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                {isFarmer ? (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${isFarmer ? 'text-red-500' : 'text-green-600'}`}>
                  {isFarmer ? '-5.8' : '+12.0'}%
                </span>
                <span className="ml-2 text-xs text-gray-500">vs last period</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Analytics */}
      {isFarmer && (
        <>
          <div className="flex items-center mt-12 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Farmer Performance</h2>
            <div className="ml-3 h-px flex-grow bg-gradient-to-r from-primary-200 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-gradient p-6 rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
              <div className="mt-2 h-80">
                <Line options={lineOptions} data={farmerLineChartData} />
              </div>
              <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-700">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  Your revenue has increased by 29% compared to the beginning of the year.
                </p>
              </div>
            </div>

            <div className="card-gradient p-6 rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Products Sold</h3>
              <div className="mt-2 h-80">
                <Bar options={barOptions} data={farmerProductsChartData} />
              </div>
              <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-700">
                  <Package className="h-4 w-4 inline mr-1" />
                  You've sold 885 products in total this year, with an average of 147.5 products per month.
                </p>
              </div>
            </div>

            <div className="card-gradient p-6 rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h3>
              <div className="mt-2 h-80">
                <Pie options={pieOptions} data={farmerCategoryData} />
              </div>
              <div className="mt-4 p-4 bg-accent-50 rounded-lg">
                <p className="text-sm text-accent-700">
                  Vegetables make up 30% of your sales, followed by fruits at 22%.
                </p>
              </div>
            </div>

            <div className="card-gradient p-6 rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Quality Distribution</h3>
              <div className="mt-2 h-80">
                <Doughnut options={pieOptions} data={farmerQualityDistribution} />
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  45% of your products are standard quality, with 40% being premium quality.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-soft-md border border-primary-100">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">Summary Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span><span className="font-medium">Top performing product:</span> Organic Tomatoes - ₹38,500 revenue</span>
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span><span className="font-medium">Most profitable category:</span> Vegetables - 32% profit margin</span>
                  </p>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span><span className="font-medium">Growth rate:</span> Your business has grown by 18.5% compared to last year</span>
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span><span className="font-medium">Recommendation:</span> Consider increasing production of premium quality vegetables as they have the highest demand and profit margin.</span>
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <a href="#" className="text-primary-600 font-medium hover:text-primary-700 flex items-center group">
                  View detailed report
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Retailer Analytics */}
      {isRetailer && (
        <>
          <div className="flex items-center mt-12 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Retailer Performance</h2>
            <div className="ml-3 h-px flex-grow bg-gradient-to-r from-secondary-200 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-gradient p-6 rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Spending Trend</h3>
              <div className="mt-2 h-80">
                <Line options={lineOptions} data={retailerLineChartData} />
              </div>
              <div className="mt-4 p-4 bg-secondary-50 rounded-lg">
                <p className="text-sm text-secondary-700">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  Your spending has increased by 42% compared to the beginning of the year.
                </p>
              </div>
            </div>

            <div className="card-gradient p-6 rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Orders Placed</h3>
              <div className="mt-2 h-80">
                <Bar options={barOptions} data={retailerOrdersChartData} />
              </div>
              <div className="mt-4 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-700">
                  <Package className="h-4 w-4 inline mr-1" />
                  You've placed 189 orders in total this year, with an average of 31.5 orders per month.
                </p>
              </div>
            </div>

            <div className="card-gradient p-6 rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Demand Status</h3>
              <div className="mt-2 h-80">
                <Pie options={pieOptions} data={retailerDemandStatusData} />
              </div>
              <div className="mt-4 p-4 bg-accent-50 rounded-lg">
                <p className="text-sm text-accent-700">
                  42% of your demands are currently open, with 35% already fulfilled.
                </p>
              </div>
            </div>

            <div className="card-gradient p-6 rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Category Preference</h3>
              <div className="mt-2 h-80">
                <Doughnut options={pieOptions} data={retailerCategoryPreference} />
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  35% of your orders are for vegetables, followed by fruits at 25%.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="p-6 bg-gradient-to-br from-secondary-50 to-white rounded-xl shadow-soft-md border border-secondary-100">
              <h3 className="text-xl font-semibold text-secondary-800 mb-4">Summary Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-secondary-100 text-secondary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span><span className="font-medium">Most purchased product:</span> Organic Tomatoes - ₹28,450 spent</span>
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-secondary-100 text-secondary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span><span className="font-medium">Best value category:</span> Grains - 18% below market average</span>
                  </p>
                </div>
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-secondary-100 text-secondary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span><span className="font-medium">Demand fulfillment rate:</span> 78% of your demands were fulfilled within the requested timeframe</span>
                  </p>
                  <p className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-secondary-100 text-secondary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span><span className="font-medium">Recommendation:</span> Consider placing larger orders for vegetables to benefit from bulk pricing and reduce overall costs.</span>
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <a href="#" className="text-secondary-600 font-medium hover:text-secondary-700 flex items-center group">
                  View detailed report
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Default view if role is not defined */}
      {!isFarmer && !isRetailer && (
        <div className="mt-8">
          <div className="p-8 bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-soft-md border border-primary-100">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">Welcome to Analytics</h3>
              <p className="text-gray-700 max-w-lg mx-auto">
                Your role-specific analytics will appear here. Please contact support if you believe you're seeing this message in error.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 