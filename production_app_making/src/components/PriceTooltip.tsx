import { useState, useRef } from 'react';
import { Price, Flavor } from '../types';

interface PriceTooltipProps {
  prices: Price[];
  flavors: Flavor[];
}

const PriceTooltip: React.FC<PriceTooltipProps> = ({ prices, flavors }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getFlavorName = (flavorId: string): string => {
    return flavors.find(flavor => flavor.id === flavorId)?.name || 'Unknown';
  };

  // Get the lowest price to display by default
  const defaultPrice = prices.reduce((lowest, current) => 
    current.price < lowest.price ? current : lowest, prices[0]);

  return (
    <div className="relative inline-block">
      <div 
        className="font-bold text-lg cursor-pointer transition-all duration-300 hover:text-pink-600"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {defaultPrice.price} BDT
      </div>
      
      {showTooltip && (
        <div 
          ref={tooltipRef}
          className="absolute z-10 left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 px-3 transform transition-all duration-200 ease-in-out"
          style={{ bottom: '100%' }}
        >
          <div className="text-sm font-semibold mb-2 pb-1 border-b border-gray-200">Available Options:</div>
          {prices.map((price, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="text-sm">
                {getFlavorName(price.flavorId)} {price.pound} pound
              </span>
              <span className="font-semibold">{price.price} BDT</span>
            </div>
          ))}
          <div className="absolute w-3 h-3 bg-white transform rotate-45 -bottom-1 left-5"></div>
        </div>
      )}
    </div>
  );
};

export default PriceTooltip;