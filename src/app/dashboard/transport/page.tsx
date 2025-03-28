"use client";

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Truck, Calendar, MapPin } from 'lucide-react';

export default function TransportPage() {
  const [view, setView] = useState('active');

  // Enhanced mock data for demonstration
  const allShipments = {
    active: [
      {
        id: 1,
        status: 'in-transit',
        from: 'Mumbai, Maharashtra',
        to: 'Pune, Maharashtra',
        date: '2024-03-20',
        items: '200kg Vegetables',
        vehicle: 'MH-12-AB-1234',
      },
      {
        id: 2,
        status: 'pending',
        from: 'Nashik, Maharashtra',
        to: 'Mumbai, Maharashtra',
        date: '2024-03-22',
        items: '150kg Fruits',
        vehicle: 'MH-15-CD-5678',
      },
      {
        id: 3,
        status: 'in-transit',
        from: 'Kolhapur, Maharashtra',
        to: 'Nagpur, Maharashtra',
        date: '2024-03-19',
        items: '300kg Grains',
        vehicle: 'MH-09-EF-9012',
      }
    ],
    completed: [
      {
        id: 4,
        status: 'delivered',
        from: 'Satara, Maharashtra',
        to: 'Aurangabad, Maharashtra',
        date: '2024-03-15',
        items: '250kg Mixed Produce',
        vehicle: 'MH-11-GH-3456',
      },
      {
        id: 5,
        status: 'delivered',
        from: 'Pune, Maharashtra',
        to: 'Mumbai, Maharashtra',
        date: '2024-03-12',
        items: '180kg Dairy Products',
        vehicle: 'MH-12-IJ-7890',
      }
    ]
  };

  const shipments = allShipments[view === 'active' ? 'active' : 'completed'];

  // Function to handle new shipment creation
  const handleNewShipment = () => {
    alert("New shipment form would open here");
    // In a real app, you would show a modal or navigate to a form
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transport</h1>
        <Button onClick={handleNewShipment}>
          <Truck className="w-4 h-4 mr-2" />
          New Shipment
        </Button>
      </div>

      <div className="flex space-x-4 border-b">
        <button
          className={`px-4 py-2 border-b-2 ${
            view === 'active'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setView('active')}
        >
          Active Shipments
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            view === 'completed'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setView('completed')}
        >
          Completed
        </button>
      </div>

      <div className="space-y-4">
        {shipments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No shipments found</p>
          </div>
        ) : (
          shipments.map((shipment) => (
            <Card key={shipment.id}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      shipment.status === 'in-transit' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : shipment.status === 'pending'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {shipment.status === 'in-transit' 
                        ? 'In Transit' 
                        : shipment.status === 'pending'
                          ? 'Pending'
                          : 'Delivered'}
                    </span>
                    <span className="text-gray-500">#{shipment.id}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    {view === 'active' ? 'Track Shipment' : 'View Details'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">From</div>
                      <div className="font-medium">{shipment.from}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">To</div>
                      <div className="font-medium">{shipment.to}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-medium">{shipment.date}</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Items</div>
                    <div className="font-medium">{shipment.items}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Vehicle Number</div>
                    <div className="font-medium">{shipment.vehicle}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 