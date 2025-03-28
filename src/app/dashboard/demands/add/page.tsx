"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function AddDemandPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    category: '',
    quantity: '',
    unit: '',
    priceRange: {
      min: '',
      max: '',
    },
    description: '',
    requiredBy: '',
    location: '',
    isOrganic: false,
    qualityPreference: 'any',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.product.trim()) {
      toast.error('Please enter a product name');
      return false;
    }

    if (!formData.category) {
      toast.error('Please select a category');
      return false;
    }

    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      toast.error('Please enter a valid quantity');
      return false;
    }

    if (!formData.unit) {
      toast.error('Please select a unit');
      return false;
    }

    if (!formData.priceRange.min || parseFloat(formData.priceRange.min) < 0) {
      toast.error('Please enter a valid minimum price');
      return false;
    }

    if (!formData.priceRange.max || parseFloat(formData.priceRange.max) <= 0) {
      toast.error('Please enter a valid maximum price');
      return false;
    }

    if (parseFloat(formData.priceRange.min) >= parseFloat(formData.priceRange.max)) {
      toast.error('Maximum price must be greater than minimum price');
      return false;
    }

    if (!formData.description.trim()) {
      toast.error('Please enter a description');
      return false;
    }

    if (!formData.requiredBy) {
      toast.error('Please enter a required by date');
      return false;
    }

    // Check if the required by date is in the future
    const requiredByDate = new Date(formData.requiredBy);
    if (isNaN(requiredByDate.getTime()) || requiredByDate <= new Date()) {
      toast.error('Required by date must be in the future');
      return false;
    }

    if (!formData.location.trim()) {
      toast.error('Please enter a delivery location');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format the data for submission
      const demandData = {
        ...formData,
        quantity: parseFloat(formData.quantity),
        priceRange: {
          min: parseFloat(formData.priceRange.min),
          max: parseFloat(formData.priceRange.max),
        },
        requiredBy: new Date(formData.requiredBy).toISOString(),
      };

      console.log('Submitting demand data:', demandData);

      const response = await fetch('/api/demands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demandData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create demand');
      }

      console.log('Demand created successfully:', data);
      toast.success('Demand added successfully');
      
      // Navigate after a small delay to let the toast appear
      setTimeout(() => {
        router.push('/dashboard/demands');
      }, 1000);
    } catch (error: any) {
      console.error('Error creating demand:', error);
      toast.error(error.message || 'Failed to add demand');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/dashboard/demands" className="text-primary-600 hover:text-primary-700 mr-2">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold">Create New Demand</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name*
              </label>
              <input
                type="text"
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category*
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select a category</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains & Cereals</option>
                <option value="dairy">Dairy Products</option>
                <option value="poultry">Poultry & Meat</option>
                <option value="spices">Spices & Herbs</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                Quantity Required*
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter required quantity"
                min="0"
                step="0.01"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                Unit*
              </label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select unit</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="g">Gram (g)</option>
                <option value="l">Liter (l)</option>
                <option value="ml">Milliliter (ml)</option>
                <option value="piece">Piece</option>
                <option value="dozen">Dozen</option>
                <option value="quintal">Quintal</option>
                <option value="ton">Ton</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="priceRange.min" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Price (₹)*
              </label>
              <input
                type="number"
                id="priceRange.min"
                name="priceRange.min"
                value={formData.priceRange.min}
                onChange={handleChange}
                placeholder="Enter minimum price"
                min="0"
                step="0.01"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="priceRange.max" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Price (₹)*
              </label>
              <input
                type="number"
                id="priceRange.max"
                name="priceRange.max"
                value={formData.priceRange.max}
                onChange={handleChange}
                placeholder="Enter maximum price"
                min="0"
                step="0.01"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="requiredBy" className="block text-sm font-medium text-gray-700 mb-1">
                Required By Date*
              </label>
              <input
                type="date"
                id="requiredBy"
                name="requiredBy"
                value={formData.requiredBy}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Location*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter delivery location"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="qualityPreference" className="block text-sm font-medium text-gray-700 mb-1">
                Quality Preference
              </label>
              <select
                id="qualityPreference"
                name="qualityPreference"
                value={formData.qualityPreference}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="any">Any Quality</option>
                <option value="premium">Premium</option>
                <option value="standard">Standard</option>
                <option value="economy">Economy</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="isOrganic"
                name="isOrganic"
                type="checkbox"
                checked={formData.isOrganic}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="isOrganic" className="ml-2 block text-sm text-gray-700">
                I prefer organic products
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your requirements in detail"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/demands')}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Demand...' : 'Create Demand'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 