'use client';

import { useState, useEffect } from 'react';

interface WelcomeCardProps {
  name: string;
  role: string;
}

export default function DashboardWelcomeCard({ name, role }: WelcomeCardProps) {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 17) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
    
    // Format current time
    const now = new Date();
    setCurrentTime(new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(now));
    
    // Update time every minute
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(now));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get personalized tip based on role
  const getTip = () => {
    if (role === 'farmer') {
      return 'Tip: Keep your inventory updated to attract more buyers.';
    }
    if (role === 'retailer') {
      return 'Tip: Specify clear quality requirements when posting demands.';
    }
    if (role === 'transporter') {
      return 'Tip: Regularly update your vehicle availability to get more jobs.';
    }
    return 'Tip: Complete your profile to get a personalized experience.';
  };
  
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
              {greeting}, {name}!
            </h2>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-primary-100">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {currentTime}
              </div>
              <div className="mt-2 flex items-center text-sm text-primary-100">
                <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-primary-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </div>
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <span className="shadow-sm rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:shadow-outline-primary focus:border-primary-300 active:bg-primary-100 active:text-primary-800 transition ease-in-out duration-150"
              >
                View Profile
              </button>
            </span>
          </div>
        </div>
        <div className="mt-4 bg-primary-500 bg-opacity-20 p-4 rounded-md text-white">
          <p className="text-sm">{getTip()}</p>
        </div>
      </div>
    </div>
  );
} 