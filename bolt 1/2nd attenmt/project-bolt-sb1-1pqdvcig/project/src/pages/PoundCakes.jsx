import React from 'react';
import CakesGrid from '../components/CakesGrid';
import cakesData from '../data/cakes.json';

function PoundCakes() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Pound Cakes Collection
      </h1>
      
      <div className="max-w-3xl mx-auto text-center mb-8">
        <p className="text-gray-600">
          Discover our selection of traditional pound cakes, made with premium ingredients 
          and baked to perfection. Available in different sizes and flavors including 
          classic plain, morobba, and fruit variations.
        </p>
      </div>
      
      <CakesGrid cakes={cakesData.pound} />
    </div>
  );
}

export default PoundCakes;