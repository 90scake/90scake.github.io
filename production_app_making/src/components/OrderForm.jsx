import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const OrderForm = ({ onBack, onSubmit, cakeName, flavorName, pound, price }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    deliveryDate: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.deliveryDate.trim()) {
      newErrors.deliveryDate = 'Delivery date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  // Get tomorrow's date for minimum delivery date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div>
      <button 
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors duration-200"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to details
      </button>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-gray-600">Cake:</span>
          <span className="font-medium">{cakeName}</span>
          
          <span className="text-gray-600">Flavor:</span>
          <span className="font-medium">{flavorName}</span>
          
          <span className="text-gray-600">Size:</span>
          <span className="font-medium">{pound} pound</span>
          
          <span className="text-gray-600">Price:</span>
          <span className="font-bold text-pink-600">{price} BDT</span>
        </div>
      </div>
      
      <h3 className="font-semibold text-lg mb-4">Delivery Information</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
              errors.customerName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., 01712345678"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Date *
          </label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            min={getTomorrowDate()}
            className={`w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
              errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.deliveryDate && (
            <p className="mt-1 text-sm text-red-600">{errors.deliveryDate}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition-colors duration-200 mt-6"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;