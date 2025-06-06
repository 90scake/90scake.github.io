import React from 'react';
import CakeGrid from '../components/cake/CakeGrid';

const CakesPage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Cake Collection</h1>
        <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
          Browse our selection of delicious, handcrafted cakes
        </p>
      </div>
      
      {/* 90s-style decorative elements */}
      <div className="relative">
        <div className="absolute -right-4 -top-10 h-16 w-16 rotate-45 bg-pink-200 opacity-20"></div>
        <div className="absolute -left-8 top-40 h-20 w-20 rounded-full bg-purple-200 opacity-20"></div>
        <div className="absolute right-20 top-80 h-12 w-12 rounded-lg bg-teal-200 opacity-20"></div>
        
        <CakeGrid />
      </div>
    </div>
  );
};

export default CakesPage;