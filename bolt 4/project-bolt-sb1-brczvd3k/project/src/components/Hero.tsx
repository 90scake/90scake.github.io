import React from 'react';
import { Cake } from 'lucide-react';

const Hero = () => {
  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-pastel-pink/30 to-pastel-yellow/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-primary-600 leading-tight mb-4">
              Delicious Cakes with a 90s Twist
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              Handcrafted cakes that bring back the sweet nostalgia of the 90s. Perfect for birthdays, celebrations, or just treating yourself!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <a href="#gallery" className="btn-primary">
                Browse Cakes
              </a>
              <a href="#contact" className="btn bg-white text-primary-600 border border-primary-500 hover:bg-primary-50">
                Custom Orders
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-pastel-purple rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Cake className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 text-primary-500 animate-float" />
              </div>
              <div className="absolute top-0 right-0 bg-pastel-blue rounded-full w-16 h-16 animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-0 left-0 bg-pastel-yellow rounded-full w-24 h-24 animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 bg-pastel-green rounded-full w-12 h-12 animate-float" style={{ animationDelay: '3s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;