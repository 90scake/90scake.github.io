import React, { useEffect, useState } from 'react';
import FeaturedCake from '../components/FeaturedCake';
import CakesGrid from '../components/CakesGrid';
import { Cake } from '../types/cake';
import cakesData from '../data/cakes.json';

const HomePage: React.FC = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    // For now, we'll simulate a short loading delay
    const timer = setTimeout(() => {
      setCakes(cakesData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <FeaturedCake />
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Cake Collection
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <CakesGrid cakes={cakes} />
        )}
      </div>
    </div>
  );
};

export default HomePage;