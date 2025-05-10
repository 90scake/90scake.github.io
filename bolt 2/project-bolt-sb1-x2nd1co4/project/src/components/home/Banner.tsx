import React, { useState } from 'react';
import { Cake } from 'lucide-react';
import BasicOrderModal from '../modals/BasicOrderModal';

const Banner: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="bg-secondary py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Cake size={24} className="text-white mr-2" />
          <span className="font-display text-white text-lg">
            Basic Vanilla Cake Price 750 BDT
          </span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-accent text-primary font-display px-6 py-2 rounded-full hover:bg-accent-dark transition-colors transform hover:scale-105 animate-pulse"
        >
          Order Now
        </button>
      </div>
      
      <BasicOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Banner;