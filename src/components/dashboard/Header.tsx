'use client';

import { useState } from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

export default function DashboardHeader({ user }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };
  
  return (
    <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <div className="max-w-lg w-full lg:max-w-xs relative">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          {/* Notifications dropdown */}
          <div className="relative">
            <button
              type="button"
              className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>
            
            {/* Red dot for notifications */}
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            
            {/* Notifications dropdown */}
            {notificationsOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-4 py-3 hover:bg-gray-50 transition ease-in-out duration-150"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                            {item === 1 ? 'TP' : item === 2 ? 'FM' : 'RT'}
                          </div>
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {item === 1 ? 'Transport Confirmed' : item === 2 ? 'New Order' : 'Payment Received'}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {item === 1 
                              ? 'Your shipment of tomatoes has been picked up.' 
                              : item === 2 
                              ? 'You have received a new order for 200kg potatoes.' 
                              : 'Payment of ₹15,000 has been credited to your account.'}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {item === 1 ? '1 hour ago' : item === 2 ? '3 hours ago' : 'Yesterday'}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="border-t border-gray-100 p-2">
                  <Link
                    href="/dashboard/notifications"
                    className="block px-4 py-2 text-sm text-center text-primary-600 hover:text-primary-800"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* User dropdown */}
          <div className="ml-3 relative">
            <div>
              <button
                type="button"
                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                id="user-menu-button"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <span className="sr-only">Open user menu</span>
                
                {user.image ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.image}
                    alt={user.name || ''}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                
                <span className="hidden md:flex md:items-center ml-2">
                  <span className="text-sm font-medium text-gray-700 mr-1">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                </span>
              </button>
            </div>
            
            {userMenuOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex={-1}
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-700 font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-0"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-1"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 