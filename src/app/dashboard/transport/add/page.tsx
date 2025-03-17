import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Add Transport - FarmConnect Dashboard',
  description: 'List your transport vehicle on FarmConnect',
};

export default async function AddTransportPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  if (session.user.role !== 'transporter') {
    redirect('/dashboard');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/dashboard" className="text-primary-600 hover:text-primary-700 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Link>
        <h1 className="text-3xl font-bold">Add Transport Vehicle</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Type*
                </label>
                <select
                  id="vehicleType"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select vehicle type</option>
                  <option value="truck">Truck</option>
                  <option value="pickup">Pickup Truck</option>
                  <option value="van">Van</option>
                  <option value="mini-truck">Mini Truck</option>
                  <option value="refrigerated">Refrigerated Truck</option>
                  <option value="tempo">Tempo</option>
                  <option value="tractor">Tractor with Trailer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Number*
                </label>
                <input
                  type="text"
                  id="vehicleNumber"
                  placeholder="Enter vehicle registration number"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="capacityWeight" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity (Weight in kg)*
                </label>
                <input
                  type="number"
                  id="capacityWeight"
                  placeholder="Enter maximum weight capacity"
                  min="0"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="capacityVolume" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity (Volume in cubic ft)
                </label>
                <input
                  type="number"
                  id="capacityVolume"
                  placeholder="Enter volume capacity"
                  min="0"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label htmlFor="departureAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Address*
                </label>
                <textarea
                  id="departureAddress"
                  rows={2}
                  placeholder="Enter departure location"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="destinationAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Destination Address
                </label>
                <textarea
                  id="destinationAddress"
                  rows={2}
                  placeholder="Enter destination location (optional)"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Date & Time*
                </label>
                <input
                  type="datetime-local"
                  id="departureTime"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Estimated Arrival Date & Time*
                </label>
                <input
                  type="datetime-local"
                  id="arrivalTime"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="pricePerKm" className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Kilometer (₹)*
                </label>
                <input
                  type="number"
                  id="pricePerKm"
                  placeholder="Enter price per km"
                  min="0"
                  step="0.01"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="pricePerKg" className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Kilogram (₹)*
                </label>
                <input
                  type="number"
                  id="pricePerKg"
                  placeholder="Enter price per kg"
                  min="0"
                  step="0.01"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="routeDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Route Description
                </label>
                <textarea
                  id="routeDescription"
                  rows={3}
                  placeholder="Describe the route, stops, or special conditions"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  id="available"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  defaultChecked
                />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                  Mark as available immediately
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Images
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload images</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Add Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 