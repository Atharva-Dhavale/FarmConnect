import User from "@/lib/models/User";
import Notification from "@/lib/models/Notification";
import dbConnect from "@/lib/db";

interface NotificationData {
  recipient: string;
  sender?: string;
  type: 'demand' | 'product' | 'transport' | 'order' | 'system';
  title: string;
  message: string;
  relatedId?: string;
  location?: string;
}

/**
 * Creates a notification for a single recipient
 */
export async function createNotification(data: NotificationData) {
  await dbConnect();
  
  return await Notification.create(data);
}

/**
 * Creates notifications for multiple recipients
 */
export async function createNotifications(data: Omit<NotificationData, 'recipient'>, recipientIds: string[]) {
  await dbConnect();
  
  const notifications = recipientIds.map(recipientId => ({
    ...data,
    recipient: recipientId
  }));
  
  return await Notification.insertMany(notifications);
}

/**
 * Notifies all farmers about a new demand
 */
export async function notifyFarmersOfDemand(demandId: string, retailerId: string, demandTitle: string) {
  await dbConnect();
  
  // Find all users with the role of farmer
  const farmers = await User.find({ role: 'farmer' }).select('_id');
  const farmerIds = farmers.map(farmer => farmer._id.toString());
  
  // Get retailer name
  const retailer = await User.findById(retailerId).select('name');
  const retailerName = retailer?.name || 'A retailer';
  
  // Create notification for all farmers
  await createNotifications(
    {
      sender: retailerId,
      type: 'demand',
      title: 'New Demand Posted',
      message: `${retailerName} has posted a new demand for ${demandTitle}`,
      relatedId: demandId
    },
    farmerIds
  );
}

/**
 * Notifies all retailers about a new product
 */
export async function notifyRetailersOfProduct(productId: string, farmerId: string, productName: string, location?: string) {
  await dbConnect();
  
  // Find all users with the role of retailer
  const retailers = await User.find({ role: 'retailer' }).select('_id');
  const retailerIds = retailers.map(retailer => retailer._id.toString());
  
  // Get farmer name
  const farmer = await User.findById(farmerId).select('name');
  const farmerName = farmer?.name || 'A farmer';
  
  // Create notification for all retailers
  await createNotifications(
    {
      sender: farmerId,
      type: 'product',
      title: 'New Product Listed',
      message: `${farmerName} has listed a new product: ${productName}`,
      relatedId: productId
    },
    retailerIds
  );
}

/**
 * Notifies all transporters about a new product location
 */
export async function notifyTransportersOfProductLocation(productId: string, farmerId: string, productName: string, location: string) {
  await dbConnect();
  
  // Find all users with the role of transporter
  const transporters = await User.find({ role: 'transporter' }).select('_id');
  const transporterIds = transporters.map(transporter => transporter._id.toString());
  
  // Get farmer name
  const farmer = await User.findById(farmerId).select('name');
  const farmerName = farmer?.name || 'A farmer';
  
  // Create notification for all transporters
  await createNotifications(
    {
      sender: farmerId,
      type: 'product',
      title: 'New Product Available for Transport',
      message: `${farmerName} has listed a new product: ${productName}`,
      relatedId: productId,
      location
    },
    transporterIds
  );
} 