'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  ShoppingBag, 
  Truck, 
  Package, 
  Users, 
  BarChart2, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  MessageSquare,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  userRole?: string;
}

export default function DashboardSidebar({ userRole = 'user' }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  // Core navigation items for all users
  const coreNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ];
  
  // Role-specific navigation items
  const roleNavItems = {
    farmer: [
      { name: 'My Products', href: '/dashboard/products', icon: Package },
      { name: 'Find Transport', href: '/transport', icon: Truck },
    ],
    retailer: [
      { name: 'Post Demands', href: '/dashboard/demands/add', icon: ShoppingBag },
      { name: 'Browse Products', href: '/dashboard/products/browse', icon: Package },
    ],
    transporter: [
      { name: 'My Vehicles', href: '/dashboard/transport', icon: Truck },
      { name: 'Available Loads', href: '/dashboard/transport/loads', icon: Package },
    ],
  };
  
  // User settings and help
  const bottomNavItems = [
    { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Help & Support', href: '/support', icon: HelpCircle },
  ];
  
  // Get role-specific nav items
  const getRoleNavItems = () => {
    if (userRole === 'farmer') return roleNavItems.farmer;
    if (userRole === 'retailer') return roleNavItems.retailer;
    if (userRole === 'transporter') return roleNavItems.transporter;
    return [];
  };
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };
  
  const renderNavItem = (item: any, idx: number) => {
    const Icon = item.icon;
    return (
      <li key={idx}>
        <Link
          href={item.href}
          className={`
            group flex items-center px-2 py-2 text-sm font-medium rounded-md 
            ${isActive(item.href) 
              ? 'bg-primary-100 text-primary-900' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }
          `}
        >
          <Icon 
            className={`
              mr-3 flex-shrink-0 h-5 w-5 
              ${isActive(item.href) ? 'text-primary-700' : 'text-gray-500 group-hover:text-gray-500'}
            `} 
            aria-hidden="true" 
          />
          <span className={`${collapsed ? 'hidden' : 'inline'}`}>
            {item.name}
          </span>
        </Link>
      </li>
    );
  };
  
  // Desktop sidebar
  const DesktopSidebar = () => (
    <div className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 md:shadow-lg ${collapsed ? 'md:w-16' : 'md:w-64'}`}>
      <div className="flex flex-col flex-grow h-full overflow-y-auto bg-white">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
          {!collapsed && (
            <span className="text-xl font-semibold ml-2 text-primary-700">FarmConnect</span>
          )}
        </div>
        <div className="flex-grow flex flex-col">
          <nav className="flex-1 px-2 pt-4 pb-4 space-y-4">
            <ul className="space-y-1">
              {coreNavItems.map(renderNavItem)}
            </ul>
            
            {getRoleNavItems().length > 0 && (
              <>
                <div className="pt-2 border-t border-gray-200">
                  <h3 className={`px-2 text-xs font-semibold uppercase tracking-wider text-gray-500 ${collapsed ? 'hidden' : 'block'}`}>
                    {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)} Tools
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {getRoleNavItems().map(renderNavItem)}
                  </ul>
                </div>
              </>
            )}
            
            <div className="pt-2 border-t border-gray-200">
              <h3 className={`px-2 text-xs font-semibold uppercase tracking-wider text-gray-500 ${collapsed ? 'hidden' : 'block'}`}>
                Settings
              </h3>
              <ul className="mt-2 space-y-1">
                {bottomNavItems.map(renderNavItem)}
              </ul>
            </div>
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button
            onClick={handleSignOut}
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 w-full"
          >
            <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
            <span className={`${collapsed ? 'hidden' : 'inline'}`}>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  // Mobile sidebar
  const MobileSidebar = () => (
    <>
      <div className="md:hidden">
        <div className="fixed inset-0 flex z-40">
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition ease-in-out duration-300 ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 mb-4">
                <span className="text-xl font-semibold text-primary-700">FarmConnect</span>
              </div>
              <nav className="mt-5 px-2 space-y-4">
                <ul className="space-y-1">
                  {coreNavItems.map(renderNavItem)}
                </ul>
                
                {getRoleNavItems().length > 0 && (
                  <>
                    <div className="pt-2 border-t border-gray-200">
                      <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)} Tools
                      </h3>
                      <ul className="mt-2 space-y-1">
                        {getRoleNavItems().map(renderNavItem)}
                      </ul>
                    </div>
                  </>
                )}
                
                <div className="pt-2 border-t border-gray-200">
                  <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Settings
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {bottomNavItems.map(renderNavItem)}
                  </ul>
                </div>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={handleSignOut}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 w-full"
              >
                <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-red-500" aria-hidden="true" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
          
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </div>
      
      {/* Mobile top bar */}
      <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white shadow">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </>
  );
  
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
} 