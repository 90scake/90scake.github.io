import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Cake } from '../types/cake';

interface CakeDetailModalProps {
  cake: Cake;
  onClose: () => void;
}

const CakeDetailModal: React.FC<CakeDetailModalProps> = ({ cake, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(cake.prices[0].flavor);
  const [selectedPound, setSelectedPound] = useState(cake.prices[0].pound);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Get unique flavors and pounds
  const uniqueFlavors = [...new Set(cake.prices.map(p => p.flavor))];
  const uniquePounds = [...new Set(cake.prices.map(p => p.pound))];
  
  // Get the selected price
  const selectedPrice = cake.prices.find(
    p => p.flavor === selectedFlavor && p.pound === selectedPound
  ) || cake.prices[0];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % cake.images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + cake.images.length) % cake.images.length);
  };
  
  const handleOrderClick = () => {
    setIsPlacingOrder(true);
  };
  
  const handlePlaceOrder = () => {
    const message = `Hello, I would like to order:\n\n*${cake.name}*\nFlavor: ${selectedFlavor}\nSize: ${selectedPound}lb\nPrice: ${selectedPrice.price} BDT\n\nProduct ID: ${cake.id}`;
    
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70" onClick={onClose}>
      <div 
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 bg-pink-50 flex justify-between items-center border-b border-pink-200">
          <h2 className="text-2xl font-bold text-gray-800">{cake.name}</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row overflow-auto">
          <div className="md:w-1/2 p-4">
            <div className="relative h-64 md:h-80 bg-pink-100 rounded-md overflow-hidden">
              <img 
                src={cake.images[currentImageIndex]}
                alt={cake.name}
                className="w-full h-full object-contain"
              />
              
              {cake.images.length > 1 && (
                <>
                  <button 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition-all duration-200"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 hover:bg-opacity-100 transition-all duration-200"
                    onClick={nextImage}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                {cake.images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full ${
                      currentImageIndex === idx ? 'bg-pink-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Description:</h3>
              <p className="text-gray-600">{cake.description}</p>
            </div>
            
            {cake.ingredients && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Ingredients:</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {cake.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {cake.notes && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Notes:</h3>
                <p className="text-gray-600">{cake.notes}</p>
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-4 bg-pink-50">
            {!isPlacingOrder ? (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Price Options</h3>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-pink-100">
                        <th className="text-left py-2">Flavor</th>
                        <th className="text-left py-2">Size</th>
                        <th className="text-right py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cake.prices.map((price, idx) => (
                        <tr key={idx} className="border-b border-pink-50">
                          <td className="py-2">{price.flavor}</td>
                          <td className="py-2">{price.pound} lb</td>
                          <td className="text-right py-2 font-medium">{price.price} BDT</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <button
                  className="mt-6 w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-bold flex items-center justify-center transition-colors duration-200"
                  onClick={handleOrderClick}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Place Order
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Place Your Order</h3>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Flavor:</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedFlavor}
                      onChange={(e) => setSelectedFlavor(e.target.value)}
                    >
                      {uniqueFlavors.map((flavor) => (
                        <option key={flavor} value={flavor}>{flavor}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Select Size:</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedPound}
                      onChange={(e) => setSelectedPound(Number(e.target.value))}
                    >
                      {uniquePounds.map((pound) => (
                        <option key={pound} value={pound}>{pound} lb</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="p-4 bg-pink-100 rounded-md mt-4">
                    <div className="flex justify-between mb-2">
                      <span>Cake:</span>
                      <span>{cake.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Flavor:</span>
                      <span>{selectedFlavor}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Size:</span>
                      <span>{selectedPound} lb</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-pink-200">
                      <span>Total:</span>
                      <span>{selectedPrice.price} BDT</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button
                    className="flex-1 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-bold transition-colors duration-200"
                    onClick={() => setIsPlacingOrder(false)}
                  >
                    Back
                  </button>
                  <button
                    className="flex-1 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-bold flex items-center justify-center transition-colors duration-200"
                    onClick={handlePlaceOrder}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeDetailModal;