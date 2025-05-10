import React from 'react';
import FeaturedCake from '../components/FeaturedCake';
import CakesGrid from '../components/CakesGrid';
import cakesData from '../data/cakes.json';

function HomePage() {
  return (
    <div>
      <FeaturedCake />
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Cake Collection
        </h2>
        
        <CakesGrid cakes={cakesData.regular} />
      </div>
    </div>
  );
}

export default HomePage;