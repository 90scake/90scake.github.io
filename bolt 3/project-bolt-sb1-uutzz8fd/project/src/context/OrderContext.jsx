import { createContext, useContext, useEffect, useState } from 'react';
import basicDesigns from '../data/basicDesigns.json';

const OrderContext = createContext(null);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

// Helper to load state from localStorage
const loadState = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading state for ${key}:`, error);
    return defaultValue;
  }
};

// Helper to save state to localStorage
const saveState = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving state for ${key}:`, error);
  }
};

export const OrderProvider = ({ children }) => {
  // Order form state
  const [orderForm, setOrderForm] = useState(() => 
    loadState('cakeOrderForm', {
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
      flavor: 'Vanilla',
      size: 1,
      designId: basicDesigns[0]?.id || '',
    })
  );
  
  // Basic order form state
  const [basicOrderForm, setBasicOrderForm] = useState(() => 
    loadState('basicCakeOrderForm', {
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
      flavor: 'Vanilla',
      size: 1,
      designId: basicDesigns[0]?.id || '',
    })
  );

  // Selected cake for ordering
  const [orderCake, setOrderCake] = useState(null);
  
  // Track order step in the modal
  const [orderStep, setOrderStep] = useState(0);

  // Save form states to localStorage whenever they change
  useEffect(() => {
    saveState('cakeOrderForm', orderForm);
  }, [orderForm]);
  
  useEffect(() => {
    saveState('basicCakeOrderForm', basicOrderForm);
  }, [basicOrderForm]);

  const updateOrderForm = (updates) => {
    setOrderForm(prev => ({ ...prev, ...updates }));
  };
  
  const updateBasicOrderForm = (updates) => {
    setBasicOrderForm(prev => ({ ...prev, ...updates }));
  };
  
  const clearOrderForm = () => {
    setOrderForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
      flavor: 'Vanilla',
      size: 1,
      designId: basicDesigns[0]?.id || '',
    });
    localStorage.removeItem('cakeOrderForm');
  };
  
  const clearBasicOrderForm = () => {
    setBasicOrderForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
      flavor: 'Vanilla',
      size: 1,
      designId: basicDesigns[0]?.id || '',
    });
    localStorage.removeItem('basicCakeOrderForm');
  };
  
  const startOrder = (cake) => {
    setOrderCake(cake);
    setOrderStep(1);
  };
  
  const resetOrder = () => {
    setOrderCake(null);
    setOrderStep(0);
  };

  // Generate WhatsApp message for cake order
  const generateWhatsAppMessage = (cake, formData) => {
    const selectedPrice = cake?.prices.find(
      p => p.flavor === formData.flavor && p.size === formData.size
    );
    
    let message = `🎂 *New Cake Order* 🎂\n\n`;
    message += `*Customer Details*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}\n\n`;
    
    message += `*Order Details*\n`;
    message += `Cake: ${cake?.name}\n`;
    message += `Flavor: ${formData.flavor}\n`;
    message += `Size: ${formData.size} pound\n`;
    message += `Price: ${selectedPrice?.price || 'N/A'} BDT\n\n`;
    
    if (formData.message) {
      message += `*Customer Message*\n${formData.message}\n\n`;
    }
    
    message += `*Product ID*: ${cake?.id}\n`;
    
    return encodeURIComponent(message);
  };
  
  // Generate WhatsApp message for basic cake order
  const generateBasicWhatsAppMessage = (formData) => {
    const design = basicDesigns.find(d => d.id === formData.designId);
    
    let message = `🎂 *New Basic Cake Order* 🎂\n\n`;
    message += `*Customer Details*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}\n\n`;
    
    message += `*Order Details*\n`;
    message += `Cake: Basic Cake\n`;
    message += `Design: ${design?.name || 'N/A'}\n`;
    message += `Flavor: ${formData.flavor}\n`;
    message += `Size: ${formData.size} pound\n`;
    message += `Price: ${formData.flavor === 'Vanilla' ? 750 : 800} BDT\n\n`;
    
    if (formData.message) {
      message += `*Customer Message*\n${formData.message}\n\n`;
    }
    
    return encodeURIComponent(message);
  };

  return (
    <OrderContext.Provider 
      value={{ 
        orderForm,
        updateOrderForm,
        clearOrderForm,
        basicOrderForm,
        updateBasicOrderForm,
        clearBasicOrderForm,
        orderCake,
        orderStep,
        startOrder,
        setOrderStep,
        resetOrder,
        generateWhatsAppMessage,
        generateBasicWhatsAppMessage,
        designs: basicDesigns
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};