"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User, LogOut, Settings } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Check if current page is homepage
  const isHomePage = pathname === '/';

  // Handle scroll effect for navbar
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || !isHomePage ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl font-bold shadow-md">
                FC
              </div>
              <span className={`ml-2 text-xl font-bold ${scrolled || !isHomePage ? 'text-primary-700' : 'text-white'}`}>
                FarmConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              href="/about" 
              className={`text-sm font-medium hover:text-primary-600 transition-colors ${
                scrolled || !isHomePage ? 'text-gray-700' : 'text-white'
              }`}
            >
              About
            </Link>
            <Link 
              href="/demands" 
              className={`text-sm font-medium hover:text-primary-600 transition-colors ${
                scrolled || !isHomePage ? 'text-gray-700' : 'text-white'
              }`}
            >
              Demands
            </Link>
            <Link 
              href="/transport" 
              className={`text-sm font-medium hover:text-primary-600 transition-colors ${
                scrolled || !isHomePage ? 'text-gray-700' : 'text-white'
              }`}
            >
              Transport
            </Link>
            <Link 
              href="/analytics" 
              className={`text-sm font-medium hover:text-primary-600 transition-colors ${
                scrolled || !isHomePage ? 'text-gray-700' : 'text-white'
              }`}
            >
              Analytics
            </Link>
            
            {status === 'loading' ? (
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                    scrolled || !isHomePage ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1 border-b border-gray-100 px-4">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Profile
                        </div>
                      </Link>
                      <Link
                        href="/settings"
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
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`text-sm font-medium hover:text-primary-600 transition-colors ${
                    scrolled || !isHomePage ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                scrolled || !isHomePage ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500`}
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
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-xl">
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/demands"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Demands
          </Link>
          <Link
            href="/transport"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Transport
          </Link>
          <Link
            href="/analytics"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            Analytics
          </Link>
          
          {status === 'loading' ? (
            <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
          ) : session ? (
            <>
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-md">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{session.user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{session.user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="pt-4 flex flex-col space-y-3">
              <Link
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="mx-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-base font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 