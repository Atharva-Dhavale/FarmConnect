"use client";

interface Category {
  _id: string;
  count: number;
}

interface PopularCategoriesChartProps {
  categories: Category[];
}

export default function PopularCategoriesChart({ categories }: PopularCategoriesChartProps) {
  // Calculate the maximum count for scaling
  const maxCount = Math.max(...categories.map(cat => cat.count), 1);
  
  // Colors for the bars
  const colors = [
    'bg-primary-500',
    'bg-secondary-500',
    'bg-accent-500',
    'bg-green-500',
    'bg-purple-500',
  ];
  
  return (
    <div className="space-y-4">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div key={category._id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {category._id}
              </span>
              <span className="text-sm text-gray-500">{category.count}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${colors[index % colors.length]}`}
                style={{ width: `${(category.count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No category data available
        </div>
      )}
    </div>
  );
} 