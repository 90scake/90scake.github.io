import React, { useState, useEffect } from 'react';
import { Cake } from '../../types';
import { useOrder } from '../../context/OrderContext';
import { sendWhatsAppMessage } from '../../utils/whatsappHelper';
import { basicCakeDesigns } from '../../data/cakeData';

interface OrderFormProps {
  cakeInfo?: Cake;
  selectedFlavor: string;
  selectedSize: string;
  totalPrice: number;
  isBasicOrder?: boolean;
  selectedDesign?: number;
  onBack: () => void;
  onOrderComplete: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({
  cakeInfo,
  selectedFlavor,
  selectedSize,
  totalPrice,
  isBasicOrder = false,
  selectedDesign,
  onBack,
  onOrderComplete,
}) => {
  const { orderDetails, updateOrderDetails, resetOrderDetails } = useOrder();
  
  const [formState, setFormState] = useState({
    name: orderDetails.name || '',
    phone: orderDetails.phone || '',
    address: orderDetails.address || '',
    deliveryDate: orderDetails.deliveryDate || '',
    specialInstructions: orderDetails.specialInstructions || '',
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: '',
  });
  
  useEffect(() => {
    updateOrderDetails({
      selectedFlavor,
      selectedSize,
    });
  }, [selectedFlavor, selectedSize, updateOrderDetails]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    updateOrderDetails({ [name]: value });
  };
  
  const validateForm = () => {
    let valid = true;
    const errors = {
      name: '',
      phone: '',
      address: '',
      deliveryDate: '',
    };
    
    if (!formState.name.trim()) {
      errors.name = 'Name is required';
      valid = false;
    }
    
    if (!formState.phone.trim()) {
      errors.phone = 'Phone number is required';
      valid = false;
    }
    
    if (!formState.address.trim()) {
      errors.address = 'Address is required';
      valid = false;
    }
    
    if (!formState.deliveryDate.trim()) {
      errors.deliveryDate = 'Delivery date is required';
      valid = false;
    }
    
    setFormErrors(errors);
    return valid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Send data to WhatsApp
      sendWhatsAppMessage(
        {
          ...orderDetails,
          name: formState.name,
          phone: formState.phone,
          address: formState.address,
          deliveryDate: formState.deliveryDate,
          specialInstructions: formState.specialInstructions,
          selectedFlavor,
          selectedSize,
          selectedDesign: isBasicOrder ? selectedDesign || null : null,
        },
        cakeInfo,
        totalPrice
      );
      
      // Reset form data and close the modal
      resetOrderDetails();
      onOrderComplete();
    }
  };
  
  const handleClearForm = () => {
    setFormState({
      name: '',
      phone: '',
      address: '',
      deliveryDate: '',
      specialInstructions: '',
    });
    updateOrderDetails({
      name: '',
      phone: '',
      address: '',
      deliveryDate: '',
      specialInstructions: '',
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isBasicOrder && selectedDesign && (
        <div className="mb-6">
          <h3 className="font-display text-lg text-secondary-dark mb-2">Selected Design</h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img 
              src={basicCakeDesigns.find(d => d.id === selectedDesign)?.image} 
              alt="Selected Design" 
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <p className="font-semibold">{basicCakeDesigns.find(d => d.id === selectedDesign)?.name}</p>
              <p>Flavor: {selectedFlavor}</p>
              <p>Price: {totalPrice} BDT</p>
            </div>
          </div>
        </div>
      )}
      
      <div>
        <label className="block text-gray-700 mb-1">Name*</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          className={`border ${formErrors.name ? 'border-error' : 'border-gray-300'} rounded-lg px-3 py-2 w-full`}
          placeholder="Your Name"
        />
        {formErrors.name && <p className="text-error text-sm mt-1">{formErrors.name}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Phone Number*</label>
        <input
          type="tel"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          className={`border ${formErrors.phone ? 'border-error' : 'border-gray-300'} rounded-lg px-3 py-2 w-full`}
          placeholder="Your Phone Number"
        />
        {formErrors.phone && <p className="text-error text-sm mt-1">{formErrors.phone}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Delivery Address*</label>
        <input
          type="text"
          name="address"
          value={formState.address}
          onChange={handleChange}
          className={`border ${formErrors.address ? 'border-error' : 'border-gray-300'} rounded-lg px-3 py-2 w-full`}
          placeholder="Your Address"
        />
        {formErrors.address && <p className="text-error text-sm mt-1">{formErrors.address}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Delivery Date*</label>
        <input
          type="date"
          name="deliveryDate"
          value={formState.deliveryDate}
          onChange={handleChange}
          className={`border ${formErrors.deliveryDate ? 'border-error' : 'border-gray-300'} rounded-lg px-3 py-2 w-full`}
        />
        {formErrors.deliveryDate && <p className="text-error text-sm mt-1">{formErrors.deliveryDate}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1">Special Instructions</label>
        <textarea
          name="specialInstructions"
          value={formState.specialInstructions}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          rows={3}
          placeholder="Any special requests or notes"
        ></textarea>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleClearForm}
            className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            Clear Form
          </button>
        </div>
        <button
          type="submit"
          className="bg-primary text-white font-bold px-6 py-2 rounded-full hover:bg-primary-dark transition-colors"
        >
          Complete Order
        </button>
      </div>
    </form>
  );
};

export default OrderForm;