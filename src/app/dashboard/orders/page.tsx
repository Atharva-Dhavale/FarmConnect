import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export const metadata = {
  title: 'Orders - FarmConnect Dashboard',
  description: 'Manage your orders on FarmConnect',
};

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        <div className="flex gap-2">
          <select className="border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
            Filter
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {session.user.role === 'farmer' ? 'Buyer' : 'Seller'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sample Orders */}
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ORD-{1000 + i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {session.user.role === 'farmer' 
                      ? (i % 3 === 0 ? 'Fresh Foods Ltd.' : i % 3 === 1 ? 'Organic Market' : 'City Grocers')
                      : (i % 3 === 0 ? 'Ramesh Farms' : i % 3 === 1 ? 'Green Valley Produce' : 'Sunshine Organics')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {i % 3 === 0 ? 'Tomatoes, Potatoes' : i % 3 === 1 ? 'Apples, Oranges' : 'Rice, Wheat'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{i * 1000}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      i === 1 ? 'bg-yellow-100 text-yellow-800' : 
                      i === 2 ? 'bg-blue-100 text-blue-800' : 
                      i === 3 ? 'bg-indigo-100 text-indigo-800' : 
                      i === 4 ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {i === 1 ? 'Pending' : 
                       i === 2 ? 'Confirmed' : 
                       i === 3 ? 'Shipped' : 
                       i === 4 ? 'Delivered' : 
                       'Cancelled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/dashboard/orders/${1000 + i}`} className="text-primary-600 hover:text-primary-900 mr-3">
                      View
                    </Link>
                    {i === 1 && (
                      <button className="text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">12</span> orders
        </div>
        <div className="flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a href="#" className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="px-4 py-2 border-t border-b border-gray-300 bg-primary-50 text-primary-600 font-medium">
              1
            </a>
            <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              3
            </a>
            <a href="#" className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              Next
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
} 