import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';

const OrderModal = ({ isOpen, onClose, isFeatured = false }) => {
  const { orderDetails, updateOrderDetails, resetOrderDetails } = useOrder();
  const [step, setStep] = useState(1);
  const [formValid, setFormValid] = useState(false);
  const [designs, setDesigns] = useState([
    "/images/design1.jpg",
    "/images/design2.jpg",
    "/images/design3.jpg",
    "/images/design4.jpg"
  ]);
  
  useEffect(() => {
    if (step === 1) {
      // Check if flavor and pounds are selected
      setFormValid(!!orderDetails.flavor && !!orderDetails.pounds);
    } else if (step === 2) {
      // Check if customer details are filled
      setFormValid(
        !!orderDetails.customerName && 
        !!orderDetails.contactNumber && 
        !!orderDetails.email
      );
    }
  }, [orderDetails, step]);
  
  const handleFlavorChange = (e) => {
    const selectedFlavor = e.target.value;
    // Find the price for the selected flavor and current pounds
    const cakeData = isFeatured 
      ? { prices: [{ flavor: 'vanilla', pound: 1, amount: 750 }, { flavor: 'chocolate', pound: 1, amount: 800 }] }
      : { prices: [{ flavor: selectedFlavor, pound: orderDetails.pounds, amount: selectedFlavor === 'vanilla' ? 750 : 800 }] };
    
    const priceObj = cakeData.prices.find(
      p => p.flavor === selectedFlavor && p.pound === orderDetails.pounds
    ) || cakeData.prices[0];
    
    updateOrderDetails({
      flavor: selectedFlavor,
      price: priceObj?.amount || 750
    });
  };
  
  const handlePoundsChange = (e) => {
    const selectedPounds = Number(e.target.value);
    // Adjust price based on pounds (basic calculation)
    const basePrice = orderDetails.flavor === 'vanilla' ? 750 : 800;
    const newPrice = basePrice * selectedPounds;
    
    updateOrderDetails({
      pounds: selectedPounds,
      price: newPrice
    });
  };
  
  const handleDesignSelect = (designUrl) => {
    updateOrderDetails({ design: designUrl });
  };
  
  const handleInputChange = (e) => {
    updateOrderDetails({ [e.target.name]: e.target.value });
  };
  
  const handleSubmit = () => {
    // Format WhatsApp message
    const message = encodeURIComponent(`
🍰 *New Cake Order* 🍰

*Product:* ${orderDetails.cakeName}
*Flavor:* ${orderDetails.flavor}
*Size:* ${orderDetails.pounds} pound(s)
*Price:* ${orderDetails.price} BDT

*Customer Details*
*Name:* ${orderDetails.customerName}
*Phone:* ${orderDetails.contactNumber}
*Email:* ${orderDetails.email}
${orderDetails.message ? `*Message:* ${orderDetails.message}` : ''}

${orderDetails.design ? '*Selected Design:* ' + orderDetails.design : ''}
${orderDetails.images ? '*Product Images:* ' + orderDetails.images.join(', ') : ''}
    `);
    
    // WhatsApp number - replace with actual number
    const whatsappNumber = '8801700000000';
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    // Reset form and close modal
    resetOrderDetails();
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 modal-overlay"
        onClick={onClose}
      ></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-xl max-w-2xl w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-pacifico text-primary-600">
                {step === 1 ? 'Customize Your Order' : 'Your Details'}
              </h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Step 1: Cake Options */}
            {step === 1 && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    You're ordering: {orderDetails.cakeName}
                  </h3>
                  
                  {orderDetails.images && orderDetails.images[0] && (
                    <div className="mb-4">
                      <img 
                        src={orderDetails.images[0]} 
                        alt={orderDetails.cakeName}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Flavor
                      </label>
                      <select
                        value={orderDetails.flavor}
                        onChange={handleFlavorChange}
                        className="input"
                      >
                        <option value="">Select a flavor</option>
                        <option value="vanilla">Vanilla</option>
                        <option value="chocolate">Chocolate</option>
                        <option value="strawberry">Strawberry</option>
                        <option value="butterscotch">Butterscotch</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Size (pounds)
                      </label>
                      <select
                        value={orderDetails.pounds}
                        onChange={handlePoundsChange}
                        className="input"
                      >
                        <option value="1">1 pound</option>
                        <option value="2">2 pounds</option>
                        <option value="3">3 pounds</option>
                        <option value="4">4 pounds</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {isFeatured && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Choose a Design
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {designs.map((design, idx) => (
                        <div 
                          key={idx}
                          className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                            orderDetails.design === design 
                              ? 'border-primary-500 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleDesignSelect(design)}
                        >
                          <div className="h-24">
                            <img 
                              src="https://images.pexels.com/photos/1120970/pexels-photo-1120970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                              alt={`Design ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="bg-pastel-yellow/30 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {orderDetails.price} BDT
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Customer Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={orderDetails.customerName}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number*
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={orderDetails.contactNumber}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={orderDetails.email}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (optional)
                  </label>
                  <textarea
                    name="message"
                    value={orderDetails.message || ''}
                    onChange={handleInputChange}
                    className="input h-24 resize-none"
                    placeholder="Any special requests or notes for your order"
                  />
                </div>
                
                <div className="bg-pastel-yellow/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Order Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Product:</span>
                      <span>{orderDetails.cakeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flavor:</span>
                      <span>{orderDetails.flavor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{orderDetails.pounds} pound(s)</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>{orderDetails.price} BDT</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-8">
              {step === 1 ? (
                <>
                  <button 
                    className="btn bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary flex items-center"
                    onClick={() => setStep(2)}
                    disabled={!formValid}
                  >
                    Next <ArrowRight size={18} className="ml-2" />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="btn bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={18} className="mr-2" /> Back
                  </button>
                  <button 
                    className="btn-primary flex items-center"
                    onClick={handleSubmit}
                    disabled={!formValid}
                  >
                    Complete Order <Send size={18} className="ml-2" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;