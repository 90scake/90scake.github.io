import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const PriceTooltip = ({ prices }) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef(null);
  
  // Get the lowest price to display by default
  const lowestPrice = prices?.length ? Math.min(...prices.map(p => p.price)) : 0;
  
  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!prices?.length) {
    return <span className="text-lg font-bold text-pink-600">Price unavailable</span>;
  }

  return (
    <div className="relative" ref={tooltipRef}>
      <button
        className="flex items-center gap-1 font-bold text-pink-600"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{lowestPrice} BDT</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fadeIn">
          <div className="rounded-md bg-white py-1">
            <div className="border-b border-gray-100 px-4 py-2 text-xs font-medium text-gray-500 uppercase">
              Price List
            </div>
            <ul className="py-1">
              {prices.map((price, index) => (
                <li 
                  key={index}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  <div className="flex justify-between">
                    <span>
                      {price.flavor}, {price.size} pound
                    </span>
                    <span className="font-semibold text-pink-600">
                      {price.price} BDT
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceTooltip;