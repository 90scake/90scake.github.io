import { createContext, useContext, useEffect, useState } from 'react';
import cakesData from '../data/cakes.json';

const CakeContext = createContext(null);

export const useCakes = () => {
  const context = useContext(CakeContext);
  if (!context) {
    throw new Error('useCakes must be used within a CakeProvider');
  }
  return context;
};

export const CakeProvider = ({ children }) => {
  const [cakes, setCakes] = useState(cakesData);
  const [selectedCake, setSelectedCake] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openCakeModal = (cakeId) => {
    const cake = cakes.find(cake => cake.id === cakeId);
    setSelectedCake(cake);
    setIsModalOpen(true);
  };
  
  const closeCakeModal = () => {
    setIsModalOpen(false);
    // Keep the selected cake for a moment for smooth transition
    setTimeout(() => setSelectedCake(null), 300);
  };

  return (
    <CakeContext.Provider 
      value={{ 
        cakes, 
        selectedCake, 
        isModalOpen, 
        openCakeModal, 
        closeCakeModal 
      }}
    >
      {children}
    </CakeContext.Provider>
  );
};