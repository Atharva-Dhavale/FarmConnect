import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export const metadata = {
  title: 'Profile - FarmConnect',
  description: 'Manage your FarmConnect profile and account settings',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-50 p-8">
            <div className="text-center">
              <div className="h-32 w-32 rounded-full bg-primary-100 mx-auto flex items-center justify-center text-primary-700 text-4xl font-bold">
                {session.user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <h2 className="mt-4 text-xl font-semibold">{session.user.name}</h2>
              <p className="text-gray-600">{session.user.role?.charAt(0).toUpperCase() + session.user.role?.slice(1)}</p>
              <p className="text-gray-500 text-sm mt-1">{session.user.email}</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Account Navigation</h3>
              <nav className="space-y-2">
                <a href="#personal-info" className="block px-3 py-2 rounded-md bg-primary-50 text-primary-700 font-medium">
                  Personal Information
                </a>
                <a href="#security" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                  Security
                </a>
                <a href="#notifications" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                  Notifications
                </a>
                <a href="#payment" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                  Payment Methods
                </a>
              </nav>
            </div>
          </div>
          
          <div className="md:w-2/3 p-8">
            <section id="personal-info" className="mb-12">
              <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={session.user.name || ''}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={session.user.email || ''}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter your phone number"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      defaultValue={session.user.role?.charAt(0).toUpperCase() + session.user.role?.slice(1) || ''}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      disabled
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    placeholder="Enter your full address"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    placeholder="Tell others about yourself or your business"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </section>
            
            <section id="security" className="mb-12">
              <h3 className="text-xl font-semibold mb-6">Security</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </section>
            
            <section id="notifications" className="mb-12">
              <h3 className="text-xl font-semibold mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-notifications" className="font-medium text-gray-700">Email Notifications</label>
                    <p className="text-gray-500">Receive email notifications for new orders, messages, and updates.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sms-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sms-notifications" className="font-medium text-gray-700">SMS Notifications</label>
                    <p className="text-gray-500">Receive text messages for important updates and alerts.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing-emails"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing-emails" className="font-medium text-gray-700">Marketing Emails</label>
                    <p className="text-gray-500">Receive promotional emails, newsletters, and special offers.</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 