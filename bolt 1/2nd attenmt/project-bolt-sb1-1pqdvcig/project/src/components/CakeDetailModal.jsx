import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { X, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

function CakeDetailModal({ cake, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState(cake.prices[0].flavor);
  const [selectedSize, setSelectedSize] = useState(cake.prices[0].size || `${cake.prices[0].pound}lb`);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    deliveryDate: ''
  });
  
  const modalRef = useRef();
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  
  const uniqueFlavors = [...new Set(cake.prices.map(p => p.flavor))];
  const uniqueSizes = [...new Set(cake.prices.map(p => p.size || `${p.pound}lb`))];
  
  const selectedPrice = cake.prices.find(
    p => p.flavor === selectedFlavor && (p.size === selectedSize || `${p.pound}lb` === selectedSize)
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
    const message = `Hello, I would like to order:

*${cake.name}*
Product ID: ${cake.productId}
Flavor: ${selectedFlavor}
Size: ${selectedSize}
Price: ${selectedPrice.price} BDT

Contact Details:
Phone: ${contactInfo.phone}
Email: ${contactInfo.email}
Delivery Date: ${contactInfo.deliveryDate}`;
    
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto"
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
        
        <div className="flex flex-col md:flex-row p-6">
          <div className="md:w-1/2 pr-6">
            <div className="relative h-64 md:h-80 bg-pink-100 rounded-md overflow-hidden">
              <img 
                src={cake.images[currentImageIndex]}
                alt={cake.name}
                className="w-full h-full object-cover"
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
          </div>
          
          <div className="md:w-1/2 mt-6 md:mt-0">
            {isPlacingOrder ? (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Delivery Date *</label>
                    <input
                      type="date"
                      value={contactInfo.deliveryDate}
                      onChange={(e) => setContactInfo({...contactInfo, deliveryDate: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div className="p-4 bg-pink-100 rounded-md mt-4">
                    <div className="flex justify-between mb-2">
                      <span>Product ID:</span>
                      <span>{cake.productId}</span>
                    </div>
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
                      <span>{selectedSize}</span>
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
                    disabled={!contactInfo.phone || !contactInfo.email || !contactInfo.deliveryDate}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Customize Your Order</h3>
                
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
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {uniqueSizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                
                <div className="p-4 bg-pink-100 rounded-md mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Product ID:</span>
                    <span>{cake.productId}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Selected Flavor:</span>
                    <span>{selectedFlavor}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Selected Size:</span>
                    <span>{selectedSize}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-pink-200">
                    <span>Price:</span>
                    <span>{selectedPrice.price} BDT</span>
                  </div>
                </div>
                
                <button
                  onClick={handleOrderClick}
                  className="w-full mt-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-bold flex items-center justify-center transition-colors duration-200"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

CakeDetailModal.propTypes = {
  cake: PropTypes.shape({
    id: PropTypes.string.isRequired,
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    prices: PropTypes.arrayOf(
      PropTypes.shape({
        flavor: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        pound: PropTypes.number,
        size: PropTypes.string
      })
    ).isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    notes: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default CakeDetailModal;