import React, { useState, useRef } from 'react';
import { Cake as CakeType } from '../../types';
import PriceTooltip from './PriceTooltip';
import CakeModal from '../modals/CakeModal';

interface CakeCardProps {
  cake: CakeType;
}

const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  // Get the base price (1 pound vanilla usually)
  const basePrice = cake.prices.find(p => p.size === '1 pound' && p.flavor === 'vanilla')?.amount || 
                    cake.prices[0]?.amount;
  
  return (
    <>
      <div 
        className="cake-card h-full flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative overflow-hidden" style={{ height: '200px' }}>
          <img 
            src={cake.images[0]} 
            alt={cake.name} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-display text-xl text-primary-dark mb-2">{cake.name}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{cake.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="relative">
              <span 
                className="font-display text-lg text-secondary-dark cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                ref={tooltipRef}
              >
                {basePrice} BDT
              </span>
              
              <PriceTooltip 
                prices={cake.prices} 
                show={showTooltip} 
                parentRef={tooltipRef}
              />
            </div>
            
            <button className="bg-primary text-white rounded-full px-4 py-1 text-sm font-bold hover:bg-primary-dark transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
      
      <CakeModal 
        cake={cake} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default CakeCard;