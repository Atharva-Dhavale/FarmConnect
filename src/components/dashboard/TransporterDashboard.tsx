"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoadingSpinner from '../ui/LoadingSpinner';

interface Transport {
  _id: string;
  vehicleType: string;
  vehicleNumber: string;
  departureLocation: {
    address: string;
  };
  destinationLocation: {
    address: string;
  };
  departureTime: string;
  estimatedArrivalTime: string;
  availableCapacity: {
    weight: number;
  };
  isAvailable: boolean;
  isCompleted: boolean;
}

interface Order {
  _id: string;
  buyer: {
    name: string;
  };
  seller: {
    name: string;
  };
  status: string;
  createdAt: string;
  pickupAddress: {
    address: string;
  };
  deliveryAddress: {
    address: string;
  };
}

export default function TransporterDashboard() {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch transports
        const transportsResponse = await fetch('/api/transport?transporter=me');
        const transportsData = await transportsResponse.json();
        
        // Fetch orders
        const ordersResponse = await fetch('/api/orders');
        const ordersData = await ordersResponse.json();
        
        if (transportsData.success && ordersData.success) {
          setTransports(transportsData.data);
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
          <h3 className="text-gray-500 text-sm mb-1">Active Transports</h3>
          <p className="text-3xl font-bold">
            {transports.filter(t => t.isAvailable && !t.isCompleted).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm mb-1">Assigned Orders</h3>
          <p className="text-3xl font-bold">
            {orders.filter(order => order.status === 'shipped').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm mb-1">Completed Deliveries</h3>
          <p className="text-3xl font-bold">
            {orders.filter(order => order.status === 'delivered').length}
          </p>
        </div>
      </div>
      
      {/* Transports Section */}
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Transport Listings</h2>
            <Link 
              href="/dashboard/transport/add" 
              className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm hover:bg-primary-700 transition-colors"
            >
              Add New Transport
            </Link>
          </div>
          
          {transports.length === 0 ? (
            <p className="text-gray-500 text-center py-4">You haven't added any transport listings yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Departure
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
                  {transports.map((transport) => (
                    <tr key={transport._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transport.vehicleType}</div>
                        <div className="text-sm text-gray-500">{transport.vehicleNumber}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{transport.departureLocation.address}</div>
                        <div className="text-sm text-gray-500">to</div>
                        <div className="text-sm text-gray-900">{transport.destinationLocation.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(transport.departureTime).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(transport.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transport.isCompleted ? 'bg-green-100 text-green-800' : 
                          transport.isAvailable ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {transport.isCompleted ? 'Completed' : transport.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {transport.availableCapacity.weight}kg available
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/dashboard/transport/${transport._id}/edit`} className="text-primary-600 hover:text-primary-900 mr-4">
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
      
      {/* Assigned Orders Section */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Assigned Orders</h2>
          
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No assigned orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.filter(order => order.status === 'shipped').slice(0, 5).map((order) => (
                <div key={order._id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <p className="font-medium">Pickup:</p>
                    <p className="text-gray-600">{order.pickupAddress.address}</p>
                  </div>
                  <div className="mt-2 text-sm">
                    <p className="font-medium">Delivery:</p>
                    <p className="text-gray-600">{order.deliveryAddress.address}</p>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div className="text-sm">
                      <span className="font-medium">From:</span> {order.seller.name}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">To:</span> {order.buyer.name}
                    </div>
                  </div>
                  <div className="mt-2">
                    <button className="w-full bg-green-600 text-white py-1 rounded-md text-sm hover:bg-green-700 transition-colors">
                      Mark as Delivered
                    </button>
                  </div>
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