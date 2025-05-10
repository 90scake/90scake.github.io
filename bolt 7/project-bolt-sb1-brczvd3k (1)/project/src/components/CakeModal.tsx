import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';
import OrderModal from './OrderModal';

const CakeModal = ({ cake, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { updateOrderDetails } = useOrder();
  
  if (!isOpen) return null;

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === cake.images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? cake.images.length - 1 : prev - 1));
  };

  const handleOrderClick = () => {
    updateOrderDetails({
      cakeId: cake.id,
      cakeName: cake.name,
      flavor: cake.prices[0].flavor,
      pounds: cake.prices[0].pound,
      price: cake.prices[0].amount,
      images: cake.images
    });
    setIsOrderModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 modal-overlay"
        onClick={onClose}
      ></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          
          <div className="flex flex-col lg:flex-row">
            {/* Image Carousel */}
            <div className="w-full lg:w-1/2 relative">
              <div className="h-64 sm:h-80 lg:h-full relative">
                <img 
                  src={cake.images[currentSlide]} 
                  alt={`${cake.name} - view ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {cake.images.length > 1 && (
                  <>
                    <button 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1"
                      onClick={prevSlide}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1"
                      onClick={nextSlide}
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                      {cake.images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full ${
                            idx === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide(idx);
                          }}
                        ></div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Details */}
            <div className="w-full lg:w-1/2 p-6">
              <h2 className="text-2xl sm:text-3xl font-pacifico text-primary-600 mb-2">
                {cake.name}
              </h2>
              <div className="w-16 h-1 bg-primary-500 mb-4"></div>
              
              <div className="mb-6">
                <p className="text-gray-700">{cake.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Ingredients</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {cake.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Available Flavors</h3>
                <div className="grid grid-cols-2 gap-2">
                  {cake.prices.map((price, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between bg-pastel-yellow/40 rounded-lg p-2"
                    >
                      <span className="text-sm">{price.flavor}, {price.pound} lb</span>
                      <span className="font-bold text-primary-600">{price.amount} BDT</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {cake.notes && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Notes</h3>
                  <p className="text-gray-700">{cake.notes}</p>
                </div>
              )}
              
              <button 
                className="btn-primary w-full"
                onClick={handleOrderClick}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isOrderModalOpen && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CakeModal;