import React, { createContext, useContext, useEffect, useState } from 'react';

const OrderContext = createContext();

const initialOrderDetails = {
  cakeId: '',
  cakeName: '',
  flavor: '',
  pounds: 1,
  price: 0,
  customerName: '',
  contactNumber: '',
  email: '',
};

export const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState(() => {
    const savedOrder = localStorage.getItem('orderDetails');
    return savedOrder ? JSON.parse(savedOrder) : initialOrderDetails;
  });
  
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    if (isFormDirty) {
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    }
  }, [orderDetails, isFormDirty]);

  const updateOrderDetails = (details) => {
    setOrderDetails(prev => ({ ...prev, ...details }));
    setIsFormDirty(true);
  };

  const resetOrderDetails = () => {
    setOrderDetails(initialOrderDetails);
    localStorage.removeItem('orderDetails');
    setIsFormDirty(false);
  };

  return (
    <OrderContext.Provider
      value={{
        orderDetails,
        updateOrderDetails,
        resetOrderDetails,
        isFormDirty,
        setIsFormDirty,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};