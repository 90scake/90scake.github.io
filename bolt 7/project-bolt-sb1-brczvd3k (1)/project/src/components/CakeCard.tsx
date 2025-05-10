import React, { useState } from 'react';

interface Price {
  flavor: string;
  pound: number;
  amount: number;
}

interface Cake {
  id: string;
  name: string;
  description: string;
  images: string[];
  prices: Price[];
}

interface CakeCardProps {
  cake: Cake;
  onClick: () => void;
}

const CakeCard: React.FC<CakeCardProps> = ({ cake, onClick }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  // Get the base price (first price in the array)
  const basePrice = cake.prices[0];
  
  return (
    <div 
      className="card hover-float cursor-pointer"
      onClick={onClick}
    >
      <div className="h-60 overflow-hidden">
        <img 
          src={cake.images[0]} 
          alt={cake.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-pacifico text-primary-600 mb-2">{cake.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {cake.description}
        </p>
        <div className="flex justify-between items-center">
          <div 
            className="tooltip-container relative"
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
          >
            <span className="text-lg font-bold text-primary-600">
              {basePrice.amount} BDT
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({basePrice.flavor}, {basePrice.pound} lb)
            </span>
            
            {/* Tooltip */}
            <div 
              className={`tooltip bg-white shadow-lg rounded-lg p-3 min-w-48 bottom-full left-0 mb-2 ${
                isTooltipVisible ? 'visible opacity-100' : ''
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm font-semibold text-gray-700 mb-2">Available Options:</p>
              <ul className="space-y-1">
                {cake.prices.map((price, index) => (
                  <li key={index} className="text-xs flex justify-between">
                    <span>{price.flavor}, {price.pound} lb</span>
                    <span className="font-semibold">{price.amount} BDT</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-semibold">
            {cake.prices.length} options
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;