import React from 'react';
import Banner from '../components/home/Banner';
import CakeCard from '../components/cake/CakeCard';
import { useCakes } from '../context/CakeContext';
import { openCustomOrderWhatsApp } from '../utils/whatsappHelper';

const Home: React.FC = () => {
  const { cakes, loading, error } = useCakes();

  return (
    <div>
      <Banner />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-dark mb-4">
            Delicious 90s-Inspired Cakes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handcrafted cakes with premium ingredients for all your special occasions.
            Choose from our signature flavors or customize to your taste!
          </p>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="text-center text-error bg-error-light/20 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cakes.map((cake) => (
              <CakeCard key={cake.id} cake={cake} />
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <h2 className="font-display text-2xl text-secondary-dark mb-4">
            Want Something Custom?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Dream up your perfect cake and we'll make it a reality! Contact us for
            custom flavors, designs, and special requests.
          </p>
          <button
            onClick={openCustomOrderWhatsApp}
            className="bg-secondary text-white font-display text-lg px-8 py-3 rounded-full hover:bg-secondary-dark transition-colors transform hover:scale-105"
          >
            Contact Us for Custom Cakes
          </button>
        </div>
        
        <div className="mt-16 pt-16 border-t border-pink-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-2xl text-primary-dark mb-4">
                Why Choose 90sCake?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-accent rounded-full p-1 mr-3 mt-1"></span>
                  <div>
                    <h3 className="font-display text-lg text-secondary-dark">Premium Ingredients</h3>
                    <p className="text-gray-600">We use only the finest ingredients to ensure delicious taste in every bite.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-accent rounded-full p-1 mr-3 mt-1"></span>
                  <div>
                    <h3 className="font-display text-lg text-secondary-dark">Custom Designs</h3>
                    <p className="text-gray-600">From classic to creative, we craft cakes that look as good as they taste.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-accent rounded-full p-1 mr-3 mt-1"></span>
                  <div>
                    <h3 className="font-display text-lg text-secondary-dark">90s Nostalgia</h3>
                    <p className="text-gray-600">Experience the joy and vibrant flavors of the 90s in every cake we make.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-2xl">
              <h2 className="font-display text-2xl text-primary-dark mb-4">
                Testimonials
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <p className="text-gray-600 italic">"The cake was absolutely delicious and looked amazing! Everyone at the party loved it."</p>
                  <p className="font-semibold mt-2">- Sarah K.</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <p className="text-gray-600 italic">"I ordered a custom design for my daughter's birthday and it exceeded all expectations. Will definitely order again!"</p>
                  <p className="font-semibold mt-2">- Michael T.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;