import React, { useState, useEffect } from 'react';
import CakeCard from './CakeCard';
import CakeModal from './CakeModal';
import { cakes } from '../data/cakes';

const CakeGallery = () => {
  const [selectedCake, setSelectedCake] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCakeClick = (cake) => {
    setSelectedCake(cake);
    setIsModalOpen(true);
  };

  return (
    <section id="gallery" className="py-16 bg-pastel-blue/10">
      <div className="container-custom">
        <h2 className="title-section text-center">Our Delicious Cakes</h2>
        <p className="subtitle-section text-center max-w-3xl mx-auto">
          Discover our handcrafted cakes made with love and premium ingredients. 
          Each cake is uniquely designed and available in multiple flavors.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {cakes.map((cake) => (
            <CakeCard 
              key={cake.id} 
              cake={cake} 
              onClick={() => handleCakeClick(cake)} 
            />
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

export default CakeGallery;