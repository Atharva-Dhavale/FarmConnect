'use client';

import Link from 'next/link';

interface RecentActivityCardProps {
  userRole: string;
}

export default function RecentActivityCard({ userRole }: RecentActivityCardProps) {
  // Get mock activities based on user role
  const getActivities = () => {
    // Shared activities
    const baseActivities = [
      {
        id: 1,
        user: 'You',
        action: 'logged in',
        target: 'the system',
        date: '10 minutes ago',
        link: null,
      },
      {
        id: 2,
        user: 'System',
        action: 'updated',
        target: 'price trends',
        date: '2 hours ago',
        link: '/analytics',
      }
    ];
    
    // Role-specific activities
    if (userRole === 'farmer') {
      return [
        ...baseActivities,
        {
          id: 3,
          user: 'Green Grocers',
          action: 'placed an order for',
          target: 'Organic Tomatoes',
          date: 'Yesterday',
          link: '/dashboard/orders/1001',
        },
        {
          id: 4,
          user: 'Express Transport',
          action: 'confirmed pickup for',
          target: 'your shipment',
          date: 'Yesterday',
          link: '/dashboard/transport/1001',
        },
        {
          id: 5,
          user: 'You',
          action: 'updated',
          target: 'Potato inventory',
          date: '3 days ago',
          link: '/dashboard/products/1001',
        },
      ];
    }
    
    if (userRole === 'retailer') {
      return [
        ...baseActivities,
        {
          id: 3,
          user: 'You',
          action: 'posted a demand for',
          target: 'Fresh Apples',
          date: 'Yesterday',
          link: '/dashboard/demands/1001',
        },
        {
          id: 4,
          user: 'Ramesh Farms',
          action: 'fulfilled',
          target: 'your Rice order',
          date: 'Yesterday',
          link: '/dashboard/orders/1001',
        },
        {
          id: 5,
          user: 'Fast Track Transport',
          action: 'delivered',
          target: 'your Onion shipment',
          date: '2 days ago',
          link: '/dashboard/transport/1001',
        },
      ];
    }
    
    if (userRole === 'transporter') {
      return [
        ...baseActivities,
        {
          id: 3,
          user: 'You',
          action: 'completed delivery to',
          target: 'Fresh Foods Ltd.',
          date: 'Yesterday',
          link: '/dashboard/transport/deliveries/1001',
        },
        {
          id: 4,
          user: 'Green Valley Farms',
          action: 'requested',
          target: 'a new pickup',
          date: 'Yesterday',
          link: '/dashboard/transport/requests/1001',
        },
        {
          id: 5,
          user: 'You',
          action: 'updated',
          target: 'truck availability',
          date: '2 days ago',
          link: '/dashboard/transport/1001',
        },
      ];
    }
    
    return baseActivities;
  };
  
  const activities = getActivities();
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <span className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center ring-8 ring-white">
                        <span className="text-primary-700 text-sm font-medium">
                          {activity.user.charAt(0)}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{activity.user}</span>
                          {' '}
                          <span className="text-gray-500">{activity.action}</span>
                          {' '}
                          {activity.link ? (
                            <Link href={activity.link} className="font-medium text-primary-600 hover:text-primary-500">
                              {activity.target}
                            </Link>
                          ) : (
                            <span className="text-gray-900">{activity.target}</span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/dashboard/activity"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View all activity
          </Link>
        </div>
      </div>
    </div>
  );
} 