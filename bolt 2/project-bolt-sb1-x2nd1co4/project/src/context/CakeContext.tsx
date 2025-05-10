import React, { createContext, useState, useContext, useEffect } from 'react';
import { cakeData } from '../data/cakeData';
import { Cake } from '../types';

interface CakeContextType {
  cakes: Cake[];
  loading: boolean;
  error: string | null;
}

const CakeContext = createContext<CakeContextType>({
  cakes: [],
  loading: true,
  error: null
});

export const useCakes = () => useContext(CakeContext);

export const CakeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch with a small delay
    const fetchCakes = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        setTimeout(() => {
          setCakes(cakeData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to load cakes');
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  return (
    <CakeContext.Provider value={{ cakes, loading, error }}>
      {children}
    </CakeContext.Provider>
  );
};