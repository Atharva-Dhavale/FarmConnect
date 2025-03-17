"use client";

interface Route {
  from: string;
  to: string;
  count: number;
}

interface PopularRoutesMapProps {
  routes: Route[];
}

export default function PopularRoutesMap({ routes }: PopularRoutesMapProps) {
  // In a real implementation, this would be a map visualization
  // For now, we'll display a table with the routes
  
  return (
    <div>
      {/* Placeholder for map visualization */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
        <p className="text-gray-500 mb-2">Map visualization would be displayed here</p>
        <p className="text-xs text-gray-400">In a real implementation, this would be an interactive map showing popular routes</p>
      </div>
      
      {/* Routes table */}
      <div className="overflow-x-auto">
        <table className="table-modern w-full">
          <thead>
            <tr>
              <th>Departure</th>
              <th>Destination</th>
              <th>Frequency</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {routes.length > 0 ? (
              routes.map((route, index) => (
                <tr key={index}>
                  <td className="font-medium text-gray-900">{route.from}</td>
                  <td className="font-medium text-gray-900">{route.to}</td>
                  <td>{route.count} trips</td>
                  <td>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full bg-primary-500"
                        style={{ width: `${(route.count / 50) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">
                  No route data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 