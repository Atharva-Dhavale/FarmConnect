import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Demand from '@/models/Demand';
import Transport from '@/models/Transport';
import User from '@/models/User';

// GET analytics data
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await connectDB();
    
    // Get counts
    const userCount = await User.countDocuments();
    const farmerCount = await User.countDocuments({ role: 'farmer' });
    const retailerCount = await User.countDocuments({ role: 'retailer' });
    const transporterCount = await User.countDocuments({ role: 'transporter' });
    
    const openDemandsCount = await Demand.countDocuments({ status: 'open' });
    const fulfilledDemandsCount = await Demand.countDocuments({ status: 'fulfilled' });
    
    const availableTransportsCount = await Transport.countDocuments({ status: 'available' });
    const completedTransportsCount = await Transport.countDocuments({ status: 'completed' });
    
    // Get recent demands
    const recentDemands = await Demand.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('productName category quantity unit minPrice maxPrice retailerName createdAt');
    
    // Get popular categories
    const demandsByCategory = await Demand.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    
    // Get price trends (simplified mock data)
    const priceTrends = [
      { product: 'Tomatoes', currentPrice: 35, previousPrice: 30, change: 16.67 },
      { product: 'Potatoes', currentPrice: 20, previousPrice: 22, change: -9.09 },
      { product: 'Onions', currentPrice: 25, previousPrice: 28, change: -10.71 },
      { product: 'Rice', currentPrice: 45, previousPrice: 40, change: 12.5 },
      { product: 'Wheat', currentPrice: 30, previousPrice: 28, change: 7.14 },
    ];
    
    // Get transport routes (simplified mock data)
    const popularRoutes = [
      { from: 'Mumbai', to: 'Pune', count: 45 },
      { from: 'Delhi', to: 'Jaipur', count: 38 },
      { from: 'Bangalore', to: 'Chennai', count: 32 },
      { from: 'Ahmedabad', to: 'Mumbai', count: 28 },
      { from: 'Kolkata', to: 'Patna', count: 25 },
    ];
    
    return NextResponse.json({
      users: {
        total: userCount,
        farmers: farmerCount,
        retailers: retailerCount,
        transporters: transporterCount,
      },
      demands: {
        open: openDemandsCount,
        fulfilled: fulfilledDemandsCount,
        recent: recentDemands,
        byCategory: demandsByCategory,
      },
      transports: {
        available: availableTransportsCount,
        completed: completedTransportsCount,
        popularRoutes,
      },
      market: {
        priceTrends,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
} 