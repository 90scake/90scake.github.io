import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { useFormContext } from '../context/FormContext';

interface BasicDesign {
  id: string;
  name: string;
  image: string;
}

const basicDesigns: BasicDesign[] = [
  { id: 'design1', name: 'Classic Round', image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg' },
  { id: 'design2', name: 'Floral Top', image: 'https://images.pexels.com/photos/265801/pexels-photo-265801.jpeg' },
  { id: 'design3', name: 'Sprinkle Joy', image: 'https://images.pexels.com/photos/806363/pexels-photo-806363.jpeg' },
  { id: 'design4', name: 'Minimalist', image: 'https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg' },
];

const flavors = [
  { id: 'vanilla', name: 'Vanilla', price: 750 },
  { id: 'chocolate', name: 'Chocolate', price: 800 },
  { id: 'strawberry', name: 'Strawberry', price: 800 },
  { id: 'redvelvet', name: 'Red Velvet', price: 850 },
];

const sizes = [
  { id: '1lb', name: '1 Pound', multiplier: 1 },
  { id: '2lb', name: '2 Pounds', multiplier: 1.8 },
  { id: '3lb', name: '3 Pounds', multiplier: 2.6 },
];

const BasicCakeOrder: React.FC = () => {
  const { basicOrderForm, updateBasicOrderForm, clearBasicOrderForm } = useFormContext();
  
  const selectedFlavorObj = flavors.find(f => f.id === basicOrderForm.selectedFlavor) || flavors[0];
  const selectedSizeObj = sizes.find(s => s.id === basicOrderForm.selectedSize) || sizes[0];
  const selectedDesignObj = basicDesigns.find(d => d.id === basicOrderForm.selectedDesign) || basicDesigns[0];
  
  const totalPrice = Math.round(selectedFlavorObj.price * selectedSizeObj.multiplier);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderMessage = `
Hello, I would like to place an order for a basic cake:

*Order Details:*
- Name: ${basicOrderForm.name}
- Phone: ${basicOrderForm.phone}
- Design: ${selectedDesignObj.name}
- Flavor: ${selectedFlavorObj.name}
- Size: ${selectedSizeObj.name}
- Price: ${totalPrice} BDT
- Delivery Address: ${basicOrderForm.address}
${basicOrderForm.message ? `- Special Instructions: ${basicOrderForm.message}` : ''}

Thank you!
    `;
    
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(orderMessage)}`, '_blank');
    clearBasicOrderForm();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Basic Cake Order</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Create your perfect basic cake</h2>
            <p>Select your flavor, size, and design below</p>
          </div>
          <button
            onClick={clearBasicOrderForm}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full flex items-center transition-all duration-200"
          >
            <Trash2 size={18} className="mr-2" />
            Clear Form
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Details</h3>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={basicOrderForm.name}
                  onChange={(e) => updateBasicOrderForm({ name: e.target.value })}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={basicOrderForm.phone}
                  onChange={(e) => updateBasicOrderForm({ phone: e.target.value })}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  id="address"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  value={basicOrderForm.address}
                  onChange={(e) => updateBasicOrderForm({ address: e.target.value })}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">Special Instructions (Optional)</label>
                <textarea
                  id="message"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  value={basicOrderForm.message}
                  onChange={(e) => updateBasicOrderForm({ message: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Cake Options</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Flavor</label>
                <div className="grid grid-cols-2 gap-2">
                  {flavors.map((flavor) => (
                    <div
                      key={flavor.id}
                      className={`p-3 border rounded-md cursor-pointer ${
                        basicOrderForm.selectedFlavor === flavor.id 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => updateBasicOrderForm({ selectedFlavor: flavor.id })}
                    >
                      <div className="flex justify-between items-center">
                        <span>{flavor.name}</span>
                        {basicOrderForm.selectedFlavor === flavor.id && <Check size={16} className="text-teal-500" />}
                      </div>
                      <div className="text-sm text-gray-500">{flavor.price} BDT</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <div
                      key={size.id}
                      className={`p-3 border rounded-md cursor-pointer text-center ${
                        basicOrderForm.selectedSize === size.id 
                          ? 'border-teal-500 bg-teal-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => updateBasicOrderForm({ selectedSize: size.id })}
                    >
                      <div>{size.name}</div>
                      {basicOrderForm.selectedSize === size.id && <Check size={16} className="text-teal-500 mx-auto mt-1" />}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Design</label>
                <div className="grid grid-cols-2 gap-3">
                  {basicDesigns.map((design) => (
                    <div
                      key={design.id}
                      className={`border rounded-md overflow-hidden cursor-pointer ${
                        basicOrderForm.selectedDesign === design.id 
                          ? 'border-teal-500 ring-2 ring-teal-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => updateBasicOrderForm({ selectedDesign: design.id })}
                    >
                      <div className="h-24 overflow-hidden">
                        <img 
                          src={design.image} 
                          alt={design.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 text-center text-sm">
                        {design.name}
                        {basicOrderForm.selectedDesign === design.id && (
                          <Check size={14} className="text-teal-500 inline ml-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 bg-pink-50 p-4 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Flavor:</span>
                  <span>{selectedFlavorObj.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Size:</span>
                  <span>{selectedSizeObj.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Design:</span>
                  <span>{selectedDesignObj.name}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-pink-200 mt-2">
                  <span>Total Price:</span>
                  <span className="text-pink-600">{totalPrice} BDT</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-3 px-8 rounded-full font-bold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Place Order via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicCakeOrder;