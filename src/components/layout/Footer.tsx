'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xl font-bold shadow-md">
                FC
              </div>
              <span className="ml-2 text-xl font-bold text-white">FarmConnect</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting farmers, retailers, and transporters for a more efficient agricultural supply chain.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/demands" className="text-gray-300 hover:text-white transition-colors">
                  Demands
                </Link>
              </li>
              <li>
                <Link href="/transport" className="text-gray-300 hover:text-white transition-colors">
                  Transport
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-gray-300 hover:text-white transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register?role=farmer" className="text-gray-300 hover:text-white transition-colors">
                  Farmers
                </Link>
              </li>
              <li>
                <Link href="/register?role=retailer" className="text-gray-300 hover:text-white transition-colors">
                  Retailers
                </Link>
              </li>
              <li>
                <Link href="/register?role=transporter" className="text-gray-300 hover:text-white transition-colors">
                  Transporters
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Agriculture Road, Farmville, India 400001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">info@farmconnect.com</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-white">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-700 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 flex-grow"
                />
                <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-4 py-2 rounded-r-lg transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} FarmConnect. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 