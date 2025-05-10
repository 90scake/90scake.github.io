import React, { useState } from 'react';
import { poundCakes } from '../data/poundCakes';
import CakeModal from './CakeModal';

const PoundCakes = () => {
  const [selectedCake, setSelectedCake] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCakeClick = (cake) => {
    setSelectedCake(cake);
    setIsModalOpen(true);
  };

  return (
    <section id="pound-cakes" className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="title-section text-center">Premium Pound Cakes</h2>
        <p className="subtitle-section text-center max-w-3xl mx-auto">
          Our pound cakes are dense, rich, and buttery. Perfect for tea time or as a thoughtful gift.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {poundCakes.map((cake) => (
            <div 
              key={cake.id}
              className="bg-pastel-green/10 rounded-xl overflow-hidden shadow-soft hover:shadow-hover cursor-pointer transition-all hover:-translate-y-1"
              onClick={() => handleCakeClick(cake)}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-2/5">
                  <img 
                    src={cake.images[0]} 
                    alt={cake.name} 
                    className="w-full h-48 sm:h-full object-cover"
                  />
                </div>
                <div className="w-full sm:w-3/5 p-5">
                  <h3 className="text-xl font-pacifico text-primary-600 mb-2">{cake.name}</h3>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {cake.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-600">
                      {cake.prices[0].amount} BDT
                    </span>
                    <div className="bg-pastel-green px-3 py-1 rounded-full text-xs font-semibold text-green-800">
                      Pound Cake
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {isModalOpen && selectedCake && (
        <CakeModal 
          cake={selectedCake}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default PoundCakes;