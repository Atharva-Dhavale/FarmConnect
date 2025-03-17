import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Post Demand - FarmConnect Dashboard',
  description: 'Post a new demand for agricultural products',
};

export default async function AddDemandPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  if (session.user.role !== 'retailer') {
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
        <h1 className="text-3xl font-bold">Post New Demand</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name*
                </label>
                <input
                  type="text"
                  id="productName"
                  placeholder="Enter product name"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  id="category"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains & Cereals</option>
                  <option value="dairy">Dairy Products</option>
                  <option value="poultry">Poultry & Meat</option>
                  <option value="spices">Spices & Herbs</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  id="subcategory"
                  placeholder="Enter subcategory (optional)"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label htmlFor="qualityPreference" className="block text-sm font-medium text-gray-700 mb-1">
                  Quality Preference
                </label>
                <select
                  id="qualityPreference"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Any Quality</option>
                  <option value="premium">Premium</option>
                  <option value="standard">Standard</option>
                  <option value="economy">Economy</option>
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity Required*
                </label>
                <input
                  type="number"
                  id="quantity"
                  placeholder="Enter required quantity"
                  min="1"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit*
                </label>
                <select
                  id="unit"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select unit</option>
                  <option value="kg">Kilogram (kg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="l">Liter (l)</option>
                  <option value="ml">Milliliter (ml)</option>
                  <option value="piece">Piece</option>
                  <option value="dozen">Dozen</option>
                  <option value="quintal">Quintal</option>
                  <option value="ton">Ton</option>
                </select>
              </div>
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Price (₹)*
                </label>
                <input
                  type="number"
                  id="minPrice"
                  placeholder="Enter minimum price"
                  min="0"
                  step="0.01"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Price (₹)*
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  placeholder="Enter maximum price"
                  min="0"
                  step="0.01"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="requiredBy" className="block text-sm font-medium text-gray-700 mb-1">
                  Required By*
                </label>
                <input
                  type="date"
                  id="requiredBy"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe your requirements in detail"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address*
              </label>
              <textarea
                id="deliveryAddress"
                rows={3}
                placeholder="Enter delivery address"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              ></textarea>
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
                Post Demand
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 