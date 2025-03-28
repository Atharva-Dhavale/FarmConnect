"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { User, Bell, Shield, Lock, Eye, EyeOff, Camera, Sparkles } from 'lucide-react';

// Define extended user type to include the custom properties
interface ExtendedUser {
  id: string;
  role: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  phone?: string | null;
  location?: string | null;
}

// Define form errors type
interface FormErrors {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    location: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    avatar: '',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });
  
  // Load user data when session is available
  useEffect(() => {
    if (session?.user) {
      const user = session.user as ExtendedUser;
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        role: user.role || '',
        avatar: user.image || '',
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        security: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }
      });
      
      if (user.image) {
        setAvatarPreview(user.image);
      }
    }
  }, [session]);

  const validateProfileForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      location: '',
      currentPassword: formErrors.currentPassword,
      newPassword: formErrors.newPassword,
      confirmPassword: formErrors.confirmPassword,
    };
    
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    if (formData.phone && !/^(\+\d{1,3})?\s?\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }
    
    setFormErrors(newErrors);
    return isValid;
  };
  
  const validateSecurityForm = () => {
    const newErrors = {
      name: formErrors.name,
      email: formErrors.email,
      phone: formErrors.phone,
      location: formErrors.location,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    
    let isValid = true;
    
    if (!formData.security.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      isValid = false;
    }
    
    if (!formData.security.newPassword) {
      newErrors.newPassword = 'New password is required';
      isValid = false;
    } else if (formData.security.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    if (formData.security.newPassword !== formData.security.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setFormErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Clear the error when user types
    if (name in formErrors) {
      const updatedErrors = { ...formErrors };
      updatedErrors[name as keyof FormErrors] = '';
      setFormErrors(updatedErrors);
    }
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: (type === 'checkbox' ? (e.target as HTMLInputElement).checked : value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // In a real app, you would upload this to your server
      toast.success('Profile picture will be updated when you save changes');
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make an actual API call to update user profile
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: formData.name,
      //     email: formData.email,
      //     phone: formData.phone,
      //     location: formData.location,
      //   }),
      // });
      
      // Update the session with new data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          image: avatarPreview,
        }
      });
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleNotificationsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make an actual API call to update notification preferences
      
      toast.success('Notification preferences updated!');
    } catch (error) {
      console.error('Error updating notifications:', error);
      toast.error('Failed to update notification preferences');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSecurityForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make an actual API call to update password
      // const response = await fetch('/api/user/password', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     currentPassword: formData.security.currentPassword,
      //     newPassword: formData.security.newPassword,
      //   }),
      // });
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        security: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }
      }));
      
      toast.success('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password. Please ensure your current password is correct.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-soft-md border border-primary-100 animate-fade-in">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">Sign in Required</h3>
          <p className="text-gray-700">
            Please sign in to access your account settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="relative rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 shadow-lg p-6 mb-10 overflow-hidden">
        {/* Abstract shapes for background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-white"></div>
          <div className="absolute top-[20%] right-[5%] w-[25%] h-[25%] rounded-full bg-white"></div>
          <div className="absolute bottom-[5%] left-[30%] w-[20%] h-[20%] rounded-full bg-white"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-block mb-2 px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <Sparkles className="h-4 w-4 inline-block mr-1" /> Account
              </div>
              <h1 className="text-3xl font-bold text-white">Account Settings</h1>
              <p className="mt-2 text-primary-100">
                Manage your profile information and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 border-b overflow-x-auto mb-6">
        <button
          className={`flex items-center px-4 py-3 border-b-2 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          } transition-colors duration-200`}
          onClick={() => setActiveTab('profile')}
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </button>
        <button
          className={`flex items-center px-4 py-3 border-b-2 whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          } transition-colors duration-200`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell className="w-4 h-4 mr-2" />
          Notifications
        </button>
        <button
          className={`flex items-center px-4 py-3 border-b-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          } transition-colors duration-200`}
          onClick={() => setActiveTab('security')}
        >
          <Shield className="w-4 h-4 mr-2" />
          Security
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="card-gradient rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
          <form className="p-6 space-y-6" onSubmit={handleProfileSubmit}>
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="h-28 w-28 rounded-full overflow-hidden bg-gray-200 shadow-md">
                  {avatarPreview ? (
                    <img 
                      src={avatarPreview} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600 text-white">
                      <User size={40} />
                    </div>
                  )}
                </div>
                <label htmlFor="avatar" className="absolute bottom-0 right-0 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-2 rounded-full cursor-pointer hover:from-primary-700 hover:to-primary-800 transition-all shadow-md">
                  <Camera size={16} />
                  <input 
                    type="file" 
                    id="avatar" 
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-all ${
                    formErrors.name ? 'border-red-500' : ''
                  }`}
                  required
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-all ${
                    formErrors.email ? 'border-red-500' : ''
                  }`}
                  required
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className={`w-full border-gray-300 rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-all ${
                    formErrors.phone ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className={`w-full border-gray-300 rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-all ${
                    formErrors.location ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.location && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="flex items-center px-4 py-2.5 bg-gradient-to-r from-primary-50 to-white rounded-xl border border-primary-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-sm mr-3">
                    {formData.role.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</div>
                    <div className="text-xs text-gray-500">Account type cannot be changed</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all"
              >
                {isSubmitting ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="card-gradient rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
          <form className="p-6 space-y-6" onSubmit={handleNotificationsSubmit}>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary-50 to-white border border-primary-100 hover:shadow-sm transition-all">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive updates about your orders and products</p>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="email-notifications"
                    name="notifications.email"
                    checked={formData.notifications.email}
                    onChange={handleChange}
                    className="opacity-0 absolute h-5 w-5"
                  />
                  <div className={`toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                    formData.notifications.email ? 'bg-primary-600 border-primary-600' : ''
                  }`}></div>
                  <div className={`toggle-dot absolute left-0 top-0 bg-white w-5 h-5 rounded-full transition duration-200 ease-in-out ${
                    formData.notifications.email ? 'transform translate-x-6' : 'transform translate-x-1'
                  }`}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary-50 to-white border border-primary-100 hover:shadow-sm transition-all">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Get real-time updates in your browser</p>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="push-notifications"
                    name="notifications.push"
                    checked={formData.notifications.push}
                    onChange={handleChange}
                    className="opacity-0 absolute h-5 w-5"
                  />
                  <div className={`toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                    formData.notifications.push ? 'bg-primary-600 border-primary-600' : ''
                  }`}></div>
                  <div className={`toggle-dot absolute left-0 top-0 bg-white w-5 h-5 rounded-full transition duration-200 ease-in-out ${
                    formData.notifications.push ? 'transform translate-x-6' : 'transform translate-x-1'
                  }`}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary-50 to-white border border-primary-100 hover:shadow-sm transition-all">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">Receive updates via text message</p>
                </div>
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="sms-notifications"
                    name="notifications.sms"
                    checked={formData.notifications.sms}
                    onChange={handleChange}
                    className="opacity-0 absolute h-5 w-5"
                  />
                  <div className={`toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full transition-colors duration-200 ease-in-out ${
                    formData.notifications.sms ? 'bg-primary-600 border-primary-600' : ''
                  }`}></div>
                  <div className={`toggle-dot absolute left-0 top-0 bg-white w-5 h-5 rounded-full transition duration-200 ease-in-out ${
                    formData.notifications.sms ? 'transform translate-x-6' : 'transform translate-x-1'
                  }`}></div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all"
              >
                {isSubmitting ? 'Updating...' : 'Save Preferences'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="card-gradient rounded-xl shadow-soft-md hover:shadow-soft-xl transition-all duration-300">
          <form className="p-6 space-y-6" onSubmit={handleSecuritySubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="currentPassword"
                    name="security.currentPassword"
                    value={formData.security.currentPassword}
                    onChange={handleChange}
                    className={`w-full border-gray-300 rounded-xl shadow-sm pr-10 focus:ring-primary-500 focus:border-primary-500 transition-all ${
                      formErrors.currentPassword ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formErrors.currentPassword && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.currentPassword}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password*
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="security.newPassword"
                  value={formData.security.newPassword}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-all ${
                    formErrors.newPassword ? 'border-red-500' : ''
                  }`}
                  required
                />
                {formErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.newPassword}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password*
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="security.confirmPassword"
                  value={formData.security.confirmPassword}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-xl shadow-sm focus:ring-primary-500 focus:border-primary-500 transition-all ${
                    formErrors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  required
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
                )}
              </div>
              
              <div className="p-5 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <Lock className="h-5 w-5 text-primary-600 mr-2" /> 
                  Password Security Tips
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-gray-600">Use at least 8 characters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-gray-600">Include uppercase and lowercase letters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-gray-600">Include at least one number</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-5 h-5 bg-primary-100 text-primary-700 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-gray-600">Avoid using easily guessable information</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button 
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all"
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 