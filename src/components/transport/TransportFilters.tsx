"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface TransportFiltersProps {
  initialDeparture: string;
  initialDestination: string;
}

export default function TransportFilters({ 
  initialDeparture = '', 
  initialDestination = '' 
}: TransportFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [departure, setDeparture] = useState(initialDeparture);
  const [destination, setDestination] = useState(initialDestination);
  const [isSearching, setIsSearching] = useState(false);
  
  // Update URL when filters change
  useEffect(() => {
    if (!isSearching) return;
    
    const params = new URLSearchParams();
    
    if (departure) {
      params.set('departure', departure);
    }
    
    if (destination) {
      params.set('destination', destination);
    }
    
    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.push(url);
    setIsSearching(false);
  }, [isSearching, departure, destination, pathname, router]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
  };
  
  const handleReset = () => {
    setDeparture('');
    setDestination('');
    router.push(pathname);
  };
  
  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch}>
        {/* Departure Location */}
        <div className="mb-4">
          <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">
            Departure Location
          </label>
          <div className="relative rounded-lg shadow-sm">
            <input
              id="departure"
              name="departure"
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              placeholder="e.g. Mumbai"
              className="block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200"
            />
          </div>
        </div>
        
        {/* Destination Location */}
        <div className="mb-4">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination Location
          </label>
          <div className="relative rounded-lg shadow-sm">
            <input
              id="destination"
              name="destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Delhi"
              className="block w-full px-3 py-2 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-200"
            />
          </div>
        </div>
        
        {/* Search Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Transport
        </button>
      </form>
      
      {/* Reset Filters Button */}
      {(departure || destination) && (
        <button
          onClick={handleReset}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Reset Filters
        </button>
      )}
      
      {/* Additional Information */}
      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <h4 className="font-medium text-gray-900 mb-2">Transport Tips</h4>
        <ul className="space-y-2 list-disc pl-5">
          <li>Book transport well in advance for better rates</li>
          <li>Check transporter ratings and reviews</li>
          <li>Ensure your goods are properly packaged</li>
          <li>Verify insurance coverage before booking</li>
        </ul>
      </div>
    </div>
  );
} 