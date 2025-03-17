"use client";

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Truck, Calendar, MapPin, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface TransportCardProps {
  transport: {
    _id: string;
    vehicleType: string;
    vehicleNumber: string;
    capacity: {
      weight: number;
      volume?: number;
    };
    departureAddress: string;
    destinationAddress: string;
    departureTime: string;
    estimatedArrivalTime: string;
    pricePerKm: number;
    pricePerKg: number;
    routeDescription: string;
    transporterName: string;
  };
}

export default function TransportCard({ transport }: TransportCardProps) {
  const { data: session } = useSession();
  const isFarmerOrRetailer = session?.user?.role === 'farmer' || session?.user?.role === 'retailer';
  
  // Format dates
  const departureDate = new Date(transport.departureTime);
  const arrivalDate = new Date(transport.estimatedArrivalTime);
  
  const departureDateFormatted = format(departureDate, 'MMM d, yyyy');
  const departureTimeFormatted = format(departureDate, 'h:mm a');
  const arrivalDateFormatted = format(arrivalDate, 'MMM d, yyyy');
  const arrivalTimeFormatted = format(arrivalDate, 'h:mm a');
  
  // Check if the departure date is in the past
  const isDeparted = new Date() > departureDate;
  
  return (
    <div className="bg-white rounded-xl shadow-soft-md overflow-hidden hover:shadow-soft-lg transition-all duration-300 border border-gray-100">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center mr-3">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{transport.vehicleType}</h3>
                <p className="text-sm text-gray-500">
                  {transport.vehicleNumber} • {transport.transporterName}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-2 md:mt-0 flex items-center">
            <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
              {transport.capacity.weight} kg capacity
            </div>
            {transport.capacity.volume && (
              <div className="ml-2 bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full text-xs font-medium">
                {transport.capacity.volume} m³ volume
              </div>
            )}
          </div>
        </div>
        
        {/* Route information */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
            <div className="flex items-start sm:items-center mb-2 sm:mb-0">
              <MapPin className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">From</p>
                <p className="text-sm font-medium">{transport.departureAddress}</p>
              </div>
            </div>
            <div className="hidden sm:block w-10 border-t border-dashed border-gray-300"></div>
            <div className="flex items-start sm:items-center">
              <MapPin className="h-5 w-5 text-secondary-600 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">To</p>
                <p className="text-sm font-medium">{transport.destinationAddress}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-start sm:items-center mb-2 sm:mb-0">
              <Calendar className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Departure</p>
                <p className={`text-sm font-medium ${isDeparted ? 'text-red-500' : ''}`}>
                  {departureDateFormatted}, {departureTimeFormatted}
                </p>
              </div>
            </div>
            <div className="hidden sm:block w-10 border-t border-dashed border-gray-300"></div>
            <div className="flex items-start sm:items-center">
              <Clock className="h-5 w-5 text-secondary-600 mr-2 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500">Estimated Arrival</p>
                <p className="text-sm font-medium">
                  {arrivalDateFormatted}, {arrivalTimeFormatted}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pricing and details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Price per km</p>
              <p className="text-sm font-medium">₹{transport.pricePerKm.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Price per kg</p>
              <p className="text-sm font-medium">₹{transport.pricePerKg.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <Link 
            href={`/transport/${transport._id}`} 
            className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          
          {isFarmerOrRetailer && !isDeparted && (
            <Link
              href={`/dashboard/bookings/create?transportId=${transport._id}`}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              Book Transport
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 