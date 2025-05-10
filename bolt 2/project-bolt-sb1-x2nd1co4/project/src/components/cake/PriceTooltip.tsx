import React, { useEffect, useState } from 'react';
import { Price } from '../../types';

interface PriceTooltipProps {
  prices: Price[];
  show: boolean;
  parentRef: React.RefObject<HTMLElement>;
}

const PriceTooltip: React.FC<PriceTooltipProps> = ({ prices, show, parentRef }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    if (parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setPosition({
        top: -180, // Position above the element
        left: -50, // Center the tooltip
      });
    }
  }, [parentRef, show]);
  
  if (!show) return null;
  
  return (
    <div 
      className="absolute z-10 bg-white p-3 rounded-xl shadow-lg w-44 transform transition-all duration-200"
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`,
        opacity: show ? 1 : 0,
      }}
    >
      <h4 className="font-display text-sm text-primary-dark mb-2 text-center">Price List</h4>
      <div className="space-y-1 max-h-36 overflow-y-auto text-xs">
        {prices.map((price, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700">{price.size}, {price.flavor}</span>
            <span className="font-semibold">{price.amount} BDT</span>
          </div>
        ))}
      </div>
      <div className="w-3 h-3 bg-white absolute -bottom-1 left-1/2 transform -translate-x-1/2 rotate-45"></div>
    </div>
  );
};

export default PriceTooltip;