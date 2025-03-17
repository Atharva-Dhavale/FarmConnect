"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  Home, 
  ShoppingBag, 
  Truck, 
  BarChart2, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X,
  MessageSquare,
  HelpCircle,
  Bell
} from 'lucide-react';
import { useState } from 'react';

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
};

export default function DashboardSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Demands', href: '/dashboard/demands', icon: ShoppingBag },
    { name: 'Transport', href: '/dashboard/transport', icon: Truck },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ];
  
  const secondaryNavigation = [
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Help & Support', href: '/dashboard/support', icon: HelpCircle },
  ];
  
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };
  
  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-40 p-4">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 rounded-lg bg-white shadow-md text-gray-600 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-lg font-bold shadow-sm">
                FC
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">FarmConnect</span>
            </Link>
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* User info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <p className="text-xs text-primary-600 capitalize">{user?.role || 'User'}</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
                      active
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                    } transition-colors`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        active ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600'
                      } transition-colors`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Account
              </h3>
              <div className="mt-1 space-y-1">
                {secondaryNavigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
                        active
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                      } transition-colors`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          active ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-600'
                        } transition-colors`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
          
          {/* Logout button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full flex items-center px-2 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
} 