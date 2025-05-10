import React, { createContext, useContext, useEffect, useState } from 'react';
import { OrderDetails, Flavor, Size } from '../types';

interface OrderContextType {
  orderDetails: OrderDetails;
  updateOrderDetails: (details: Partial<OrderDetails>) => void;
  resetOrderDetails: () => void;
  clearLocalStorage: () => void;
  selectedCakeId: string | null;
  setSelectedCakeId: (id: string | null) => void;
  isBasicOrder: boolean;
  setIsBasicOrder: (value: boolean) => void;
}

const initialOrderDetails: OrderDetails = {
  name: '',
  phone: '',
  address: '',
  deliveryDate: '',
  selectedFlavor: '',
  selectedSize: '',
  selectedDesign: null,
  specialInstructions: '',
};

const OrderContext = createContext<OrderContextType>({
  orderDetails: initialOrderDetails,
  updateOrderDetails: () => {},
  resetOrderDetails: () => {},
  clearLocalStorage: () => {},
  selectedCakeId: null,
  setSelectedCakeId: () => {},
  isBasicOrder: false,
  setIsBasicOrder: () => {},
});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>(initialOrderDetails);
  const [selectedCakeId, setSelectedCakeId] = useState<string | null>(null);
  const [isBasicOrder, setIsBasicOrder] = useState(false);

  // Load order details from localStorage on initial render
  useEffect(() => {
    const savedOrderDetails = localStorage.getItem('orderDetails');
    if (savedOrderDetails) {
      setOrderDetails(JSON.parse(savedOrderDetails));
    }
    
    const savedCakeId = localStorage.getItem('selectedCakeId');
    if (savedCakeId) {
      setSelectedCakeId(savedCakeId);
    }
    
    const savedIsBasicOrder = localStorage.getItem('isBasicOrder');
    if (savedIsBasicOrder) {
      setIsBasicOrder(JSON.parse(savedIsBasicOrder));
    }
  }, []);

  // Save order details to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  }, [orderDetails]);

  // Save selectedCakeId to localStorage whenever it changes
  useEffect(() => {
    if (selectedCakeId) {
      localStorage.setItem('selectedCakeId', selectedCakeId);
    } else {
      localStorage.removeItem('selectedCakeId');
    }
  }, [selectedCakeId]);

  // Save isBasicOrder to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isBasicOrder', JSON.stringify(isBasicOrder));
  }, [isBasicOrder]);

  const updateOrderDetails = (details: Partial<OrderDetails>) => {
    setOrderDetails(prev => ({ ...prev, ...details }));
  };

  const resetOrderDetails = () => {
    setOrderDetails(initialOrderDetails);
    setSelectedCakeId(null);
    setIsBasicOrder(false);
    localStorage.removeItem('orderDetails');
    localStorage.removeItem('selectedCakeId');
    localStorage.removeItem('isBasicOrder');
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('orderDetails');
    localStorage.removeItem('selectedCakeId');
    localStorage.removeItem('isBasicOrder');
    setOrderDetails(initialOrderDetails);
    setSelectedCakeId(null);
    setIsBasicOrder(false);
  };

  return (
    <OrderContext.Provider
      value={{
        orderDetails,
        updateOrderDetails,
        resetOrderDetails,
        clearLocalStorage,
        selectedCakeId,
        setSelectedCakeId,
        isBasicOrder,
        setIsBasicOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};