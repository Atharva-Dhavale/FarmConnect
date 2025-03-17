"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoadingSpinner from '../ui/LoadingSpinner';

interface Demand {
  _id: string;
  productName: string;
  quantity: number;
  unit: string;
  priceRange: {
    min: number;
    max: number;
  };
  isActive: boolean;
  isFulfilled: boolean;
}

interface Order {
  _id: string;
  seller: {
    name: string;
  };
  products: {
    product: {
      name: string;
    };
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export default function RetailerDashboard() {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch demands
        const demandsResponse = await fetch('/api/demands?retailer=me');
        const demandsData = await demandsResponse.json();
        
        // Fetch orders
        const ordersResponse = await fetch('/api/orders');
        const ordersData = await ordersResponse.json();
        
        if (demandsData.success && ordersData.success) {
          setDemands(demandsData.data);
          setOrders(ordersData.data);
        } else {
          setError('Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('An error occurred while fetching dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Quick Stats */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm mb-1">Active Demands</h3>
          <p className="text-3xl font-bold">
            {demands.filter(demand => demand.isActive && !demand.isFulfilled).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm mb-1">Pending Orders</h3>
          <p className="text-3xl font-bold">
            {orders.filter(order => order.status !== 'delivered' && order.status !== 'cancelled').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm mb-1">Total Spent</h3>
          <p className="text-3xl font-bold">
            ₹{orders
              .filter(order => order.status === 'delivered')
              .reduce((sum, order) => sum + order.totalAmount, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>
      
      {/* Demands Section */}
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Demands</h2>
            <Link 
              href="/dashboard/demands/add" 
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-700 transition-colors"
            >
              Post New Demand
            </Link>
          </div>
          
          {demands.length === 0 ? (
            <p className="text-gray-500 text-center py-4">You haven't posted any demands yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price Range
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {demands.map((demand) => (
                    <tr key={demand._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{demand.productName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{demand.priceRange.min} - ₹{demand.priceRange.max}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{demand.quantity} {demand.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          demand.isFulfilled ? 'bg-green-100 text-green-800' : 
                          demand.isActive ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {demand.isFulfilled ? 'Fulfilled' : demand.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/dashboard/demands/${demand._id}/edit`} className="text-primary-600 hover:text-primary-900 mr-4">
                          Edit
                        </Link>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Orders Section */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order._id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">From: {order.seller.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    {order.products.map(p => p.product.name).join(', ')}
                  </p>
                  <p className="font-medium mt-1">₹{order.totalAmount.toLocaleString()}</p>
                </div>
              ))}
              
              <Link href="/dashboard/orders" className="text-primary-600 hover:underline text-sm block text-center mt-4">
                View All Orders
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 