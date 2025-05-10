import React, { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';
import OrderModal from './OrderModal';

const FeaturedCake = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateOrderDetails } = useOrder();

  const handleOrderClick = () => {
    updateOrderDetails({
      cakeId: 'basic-vanilla',
      cakeName: 'Basic Vanilla Cake',
      flavor: 'vanilla',
      pounds: 1,
      price: 750,
      images: ['/images/featured-cake.jpg']
    });
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center bg-pastel-blue/20 rounded-2xl overflow-hidden shadow-soft">
          <div className="w-full lg:w-1/2">
            <img 
              src="https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Basic Vanilla Cake" 
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12">
            <h2 className="text-3xl md:text-4xl text-primary-600 mb-3">Basic Vanilla Cake</h2>
            <div className="w-16 h-1 bg-primary-500 mb-6"></div>
            <p className="text-gray-700 mb-6">
              Our signature vanilla cake is a crowd-pleaser with its light, fluffy texture and delicate vanilla flavor. Made with premium ingredients and topped with creamy vanilla frosting.
            </p>
            <div className="flex items-center mb-8">
              <span className="text-2xl font-bold text-primary-600 mr-2">750 BDT</span>
              <span className="text-sm text-gray-500">per cake</span>
            </div>
            <button 
              onClick={handleOrderClick} 
              className="btn-primary"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
      
      {isModalOpen && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isFeatured={true}
        />
      )}
    </section>
  );
};

export default FeaturedCake;