import React, { useState } from 'react';
import CakeCard from './CakeCard';
import CakeDetailModal from './CakeDetailModal';
import { Cake } from '../types/cake';

interface CakesGridProps {
  cakes: Cake[];
}

const CakesGrid: React.FC<CakesGridProps> = ({ cakes }) => {
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);

  const handleViewDetails = (cake: Cake) => {
    setSelectedCake(cake);
  };

  const handleCloseModal = () => {
    setSelectedCake(null);
  };

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cakes.map((cake) => (
          <CakeCard 
            key={cake.id} 
            cake={cake} 
            onViewDetails={handleViewDetails} 
          />
        ))}
      </div>
      
      {selectedCake && (
        <CakeDetailModal cake={selectedCake} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CakesGrid;