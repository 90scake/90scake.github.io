import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";

const FeaturedCake: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-pink-200 to-purple-200 py-12 px-4 mb-12 overflow-hidden">
      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            Basic Vanilla Cake
          </h2>
          <p className="text-purple-800 mb-6 max-w-md">
            Start with our delicious basic vanilla cake for only 750 BDT.
            Perfect for birthdays, celebrations, or just because you deserve
            something sweet!
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-pink-600">750 BDT</span>
            <Link
              to="/basic-order"
              className="inline-flex items-center bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-full font-bold transition-colors duration-200"
            >
              Order Now
              <ArrowRightCircle size={20} className="ml-2" />
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.pexels.com/photos/1027811/pexels-photo-1027811.jpeg"
            alt="Basic Vanilla Cake"
            className="h-64 md:h-80 object-cover rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Decorative elements for 90s feel */}
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-yellow-300 rounded-full opacity-50"></div>
      <div className="absolute top-8 right-10 w-12 h-12 bg-teal-300 rounded-full opacity-50"></div>
      <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-pink-400 rounded-full opacity-40"></div>
    </div>
  );
};

export default FeaturedCake;
