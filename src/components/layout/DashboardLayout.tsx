"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
  User,
  Bell,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: '/dashboard/products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { href: '/dashboard/demands', label: 'Demands', icon: <ShoppingCart className="w-5 h-5" /> },
    { href: '/dashboard/analytics', label: 'Analytics', icon: <BarChart className="w-5 h-5" /> },
    { href: '/dashboard/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-light flex flex-col animate-fade-in">
      {/* Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl font-bold shadow-md">
                  FC
                </div>
                <span className="ml-3 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                  FarmConnect
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center text-sm font-medium transition-colors hover:text-primary-600 ${
                      isActive ? 'text-primary-600' : 'text-gray-700'
                    } group transform hover:translate-y-[-2px] transition-all duration-200`}
                  >
                    <span className={`mr-2 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'} transition-colors duration-200`}>
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-100 transition-colors duration-200">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 text-gray-700 transition-all duration-200"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </div>
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-slide-up">
                    <div className="py-2 border-b border-gray-100 px-4">
                      <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors duration-150"
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
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
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

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block animate-slide-up' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 ${
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:text-primary-600'
                  } transition-colors duration-150`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className={`mr-3 ${isActive ? 'text-primary-600' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8 bg-gradient-light">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
} 