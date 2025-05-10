import React, { useState } from 'react';
import { Cake as CakeType } from '../types/cake';

interface CakeCardProps {
  cake: CakeType;
  onViewDetails: (cake: CakeType) => void;
}

const CakeCard: React.FC<CakeCardProps> = ({ cake, onViewDetails }) => {
  const [showPriceTooltip, setShowPriceTooltip] = useState(false);
  
  // Get the cheapest option for initial display
  const cheapestOption = cake.prices.reduce((prev, curr) => 
    prev.price < curr.price ? prev : curr, cake.prices[0]);
  
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      onClick={() => onViewDetails(cake)}
    >
      <div className="h-60 overflow-hidden relative">
        <img 
          src={cake.images[0]}
          alt={cake.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-0 right-0 bg-pink-500 text-white px-2 py-1 rounded-bl-lg font-bold">
          {cake.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{cake.name}</h3>
        <p className="text-gray-600 text-sm h-12 overflow-hidden">{cake.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <div 
            className="relative"
            onMouseEnter={() => setShowPriceTooltip(true)}
            onMouseLeave={() => setShowPriceTooltip(false)}
          >
            <span className="text-lg font-bold text-pink-600">
              {cheapestOption.price} BDT
            </span>
            
            {showPriceTooltip && cake.prices.length > 1 && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white shadow-lg rounded-md p-2 z-10">
                <div className="text-sm font-semibold mb-1 text-gray-700">Price Options:</div>
                <ul className="space-y-1">
                  {cake.prices.map((priceOption, index) => (
                    <li key={index} className="text-sm flex justify-between">
                      <span>{priceOption.flavor}, {priceOption.pound}lb</span>
                      <span className="font-medium">{priceOption.price} BDT</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
              </div>
            )}
          </div>
          
          <button 
            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(cake);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;