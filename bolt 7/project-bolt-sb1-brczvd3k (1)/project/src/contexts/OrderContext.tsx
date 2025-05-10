import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface OrderContextType {
  orderDetails: OrderDetails;
  updateOrderDetails: (details: Partial<OrderDetails>) => void;
  resetOrderDetails: () => void;
  isFormDirty: boolean;
  setIsFormDirty: (isDirty: boolean) => void;
}

interface OrderDetails {
  cakeId: string;
  cakeName: string;
  flavor: string;
  pounds: number;
  price: number;
  design?: string;
  customerName: string;
  contactNumber: string;
  email: string;
  message?: string;
  images?: string[];
}

const initialOrderDetails: OrderDetails = {
  cakeId: '',
  cakeName: '',
  flavor: '',
  pounds: 1,
  price: 0,
  customerName: '',
  contactNumber: '',
  email: '',
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>(() => {
    const savedOrder = localStorage.getItem('orderDetails');
    return savedOrder ? JSON.parse(savedOrder) : initialOrderDetails;
  });
  
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  useEffect(() => {
    if (isFormDirty) {
      localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    }
  }, [orderDetails, isFormDirty]);

  const updateOrderDetails = (details: Partial<OrderDetails>) => {
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

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};