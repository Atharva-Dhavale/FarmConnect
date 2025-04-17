"use client";

import { useState, useEffect, useRef } from 'react';
import { Bell, Check, MoreVertical, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'demand' | 'product' | 'transport' | 'order' | 'system';
  isRead: boolean;
  createdAt: string;
  sender?: {
    name: string;
    role: string;
  };
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Close the dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Load notifications initially
    fetchNotifications();

    // Set up polling for notifications every 30 seconds
    const intervalId = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications?limit=5');
      const data = await response.json();
      
      if (data.success) {
        setNotifications(data.data);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });
      
      if (response.ok) {
        // Update local state
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => 
            notification._id === id ? { ...notification, isRead: true } : notification
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/notifications/read-all', {
        method: 'PATCH',
      });
      
      if (response.ok) {
        // Update local state
        setNotifications(prevNotifications => 
          prevNotifications.map(notification => ({ ...notification, isRead: true }))
        );
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    
    // Navigate based on notification type
    if (notification.type === 'demand') {
      router.push('/dashboard/demands');
    } else if (notification.type === 'product') {
      router.push('/dashboard/products');
    } else if (notification.type === 'transport') {
      router.push('/dashboard/transport');
    } else if (notification.type === 'order') {
      router.push('/dashboard/orders');
    }
    
    setIsOpen(false);
  };

  const getNotificationIcon = (type: string) => {
    const iconMap: {[key: string]: JSX.Element} = {
      demand: <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">D</div>,
      product: <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600">P</div>,
      transport: <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center text-accent-600">T</div>,
      order: <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">O</div>,
      system: <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">S</div>,
    };
    
    return iconMap[type] || iconMap.system;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      >
        <span className="sr-only">Notifications</span>
        <div className="relative">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-2 border-b border-gray-100 px-4 flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center"
                onClick={markAllAsRead}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Check className="h-3 w-3 mr-1" />}
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-gray-500">
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 cursor-pointer ${
                    !notification.isRead ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-start">
                        <p className={`text-sm font-medium ${!notification.isRead ? 'text-primary-900' : 'text-gray-900'}`}>
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <span className="ml-2 h-2 w-2 rounded-full bg-primary-500"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="py-2 border-t border-gray-100 px-4 text-center">
            <a href="/dashboard/notifications" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 