'use client';

import Link from 'next/link';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'indigo';
  link?: string;
}

export default function DashboardMetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  color = 'blue',
  link 
}: MetricCardProps) {
  
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      icon: 'text-blue-500'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      icon: 'text-green-500'
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-600',
      icon: 'text-yellow-500'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      icon: 'text-purple-500'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      icon: 'text-red-500'
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      icon: 'text-indigo-500'
    },
  };
  
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  
  const Content = () => (
    <>
      <div className="flex items-center">
        {Icon && (
          <div className={`p-3 rounded-md ${colorClasses[color].bg}`}>
            <Icon className={`h-6 w-6 ${colorClasses[color].icon}`} aria-hidden="true" />
          </div>
        )}
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        {trend === 'up' ? (
          <ArrowUpRight className="mr-1 flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
        ) : trend === 'down' ? (
          <ArrowDownRight className="mr-1 flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
        ) : null}
        <span className={`text-sm ${trendColor}`}>{change}</span>
        <span className="text-sm text-gray-500 ml-1">from last month</span>
      </div>
    </>
  );
  
  if (link) {
    return (
      <Link href={link} className="bg-white overflow-hidden shadow rounded-lg p-5 hover:shadow-md transition-shadow">
        <Content />
      </Link>
    );
  }
  
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
      <Content />
    </div>
  );
} 