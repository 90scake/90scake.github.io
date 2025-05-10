import { useState } from 'react';
import { useOrder } from '../../context/OrderContext';
import ImageSlider from '../ui/ImageSlider';

const BasicCakeForm = () => {
  const { 
    basicOrderForm, 
    updateBasicOrderForm, 
    clearBasicOrderForm, 
    designs, 
    generateBasicWhatsAppMessage 
  } = useOrder();
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate message and open WhatsApp
    const message = generateBasicWhatsAppMessage(basicOrderForm);
    window.open(`https://wa.me/+8801712345678?text=${message}`, '_blank');
    
    // Clear the form
    clearBasicOrderForm();
  };
  
  // Calculate price based on flavor
  const calculatePrice = () => {
    return basicOrderForm.flavor === 'Vanilla' ? 750 : 800;
  };
  
  // Get the selected design
  const selectedDesign = designs.find(d => d.id === basicOrderForm.designId);
  
  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Order Basic Cake</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Design selection */}
        <div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">Select Design</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {designs.map(design => (
              <div 
                key={design.id}
                className={`cursor-pointer rounded-lg border-2 p-2 transition ${
                  basicOrderForm.designId === design.id 
                    ? 'border-pink-500 bg-pink-50' 
                    : 'border-gray-200 hover:border-pink-200'
                }`}
                onClick={() => updateBasicOrderForm({ designId: design.id })}
              >
                <div className="aspect-square overflow-hidden rounded">
                  <img 
                    src={`/${design.image}`}
                    alt={design.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                    }}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium text-gray-900">
                  {design.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Selected design preview */}
        {selectedDesign && (
          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-2 text-lg font-medium text-gray-900">Selected Design</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <img
                  src={`/${selectedDesign.image}`}
                  alt={selectedDesign.name}
                  className="h-48 w-full rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                  }}
                />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">{selectedDesign.name}</p>
                <p className="text-gray-600">{selectedDesign.description}</p>
                <div className="mt-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <label htmlFor="flavor" className="block text-sm font-medium text-gray-700">
                        Flavor
                      </label>
                      <select
                        id="flavor"
                        value={basicOrderForm.flavor}
                        onChange={(e) => updateBasicOrderForm({ flavor: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                      >
                        <option value="Vanilla">Vanilla</option>
                        <option value="Chocolate">Chocolate</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                        Size (pounds)
                      </label>
                      <select
                        id="size"
                        value={basicOrderForm.size}
                        onChange={(e) => updateBasicOrderForm({ size: Number(e.target.value) })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                      >
                        <option value={1}>1 pound</option>
                        <option value={2}>2 pounds</option>
                        <option value={3}>3 pounds</option>
                      </select>
                    </div>
                  </div>
                  <p className="mt-4 text-lg font-bold text-pink-600">
                    Price: {calculatePrice()} BDT
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Customer information */}
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Your Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={basicOrderForm.name}
                onChange={(e) => updateBasicOrderForm({ name: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={basicOrderForm.phone}
                onChange={(e) => updateBasicOrderForm({ phone: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={basicOrderForm.email}
                onChange={(e) => updateBasicOrderForm({ email: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <input
                type="text"
                id="address"
                value={basicOrderForm.address}
                onChange={(e) => updateBasicOrderForm({ address: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                required
              />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Special Instructions
          </label>
          <textarea
            id="message"
            value={basicOrderForm.message}
            onChange={(e) => updateBasicOrderForm({ message: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
          />
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={clearBasicOrderForm}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Clear Form
          </button>
          
          <button
            type="submit"
            className="rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-700"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicCakeForm;