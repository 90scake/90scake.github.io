import { useState } from 'react';
import PriceTooltip from './PriceTooltip';
import CakeModal from './CakeModal';

const CakeCard = ({ cake }) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        onClick={() => setShowModal(true)}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={cake.images[0]} 
            alt={cake.name} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{cake.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{cake.description}</p>
          
          <div className="flex justify-between items-center">
            <PriceTooltip prices={cake.prices} flavors={cake.flavors} />
            <span className="text-sm text-pink-600 font-medium">View Details</span>
          </div>
        </div>
      </div>
      
      {showModal && (
        <CakeModal cake={cake} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default CakeCard;