"use client";

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { 
  Search, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import NotificationBell from '../ui/NotificationBell';

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

export default function DashboardHeader({ user }: { user: User }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Search */}
          <div className="flex-1 flex items-center">
            <div className="max-w-lg w-full lg:max-w-xs relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white sm:text-sm transition-colors"
                placeholder="Search..."
                type="search"
              />
            </div>
          </div>
          
          {/* Right section - Notifications and User menu */}
          <div className="flex items-center">
            {/* Help button */}
            <Link
              href="/dashboard/support"
              className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            >
              <span className="sr-only">Help</span>
              <HelpCircle className="h-6 w-6" />
            </Link>
            
            {/* Notifications dropdown */}
            <div className="ml-4 relative">
              <NotificationBell />
            </div>
            
            {/* User dropdown */}
            <div className="ml-4 relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 p-1"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
              </button>
              
              {userMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1 border-b border-gray-100 px-4">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </div>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </div>
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 