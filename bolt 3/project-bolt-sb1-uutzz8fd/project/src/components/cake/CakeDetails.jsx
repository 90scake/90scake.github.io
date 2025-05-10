import { useState } from 'react';
import { useCakes } from '../../context/CakeContext';
import { useOrder } from '../../context/OrderContext';
import ImageSlider from '../ui/ImageSlider';
import Modal from '../ui/Modal';

const CakeDetails = () => {
  const { selectedCake, isModalOpen, closeCakeModal } = useCakes();
  const { orderStep, setOrderStep, startOrder, resetOrder, orderCake, orderForm, updateOrderForm, clearOrderForm, generateWhatsAppMessage } = useOrder();
  
  // State for selected flavor and size in the order form
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [selectedSize, setSelectedSize] = useState(1);
  
  // Calculate the price based on selected flavor and size
  const calculatePrice = () => {
    if (!orderCake) return null;
    
    const priceItem = orderCake.prices.find(
      p => p.flavor === orderForm.flavor && p.size === orderForm.size
    );
    
    return priceItem?.price || null;
  };
  
  // Generate the WhatsApp link for ordering
  const getWhatsAppLink = () => {
    const message = generateWhatsAppMessage(orderCake, orderForm);
    return `https://wa.me/+8801712345678?text=${message}`;
  };
  
  // Handle placing the order
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // In a real app, you might validate the form here
    // and maybe save the order to a database
    
    // Open WhatsApp with the order message
    window.open(getWhatsAppLink(), '_blank');
    
    // Reset the form and modal state
    clearOrderForm();
    resetOrder();
    closeCakeModal();
  };
  
  if (!isModalOpen || !selectedCake) return null;
  
  // If we're in the order flow, show the order form
  if (orderStep > 0 && orderCake) {
    return (
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          resetOrder();
          closeCakeModal();
        }} 
        title={`Order ${orderCake.name}`}
        size="md"
      >
        <div className="flex flex-col gap-4">
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={orderForm.name}
                  onChange={(e) => updateOrderForm({ name: e.target.value })}
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
                  value={orderForm.phone}
                  onChange={(e) => updateOrderForm({ phone: e.target.value })}
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
                  value={orderForm.email}
                  onChange={(e) => updateOrderForm({ email: e.target.value })}
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
                  value={orderForm.address}
                  onChange={(e) => updateOrderForm({ address: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="flavor" className="block text-sm font-medium text-gray-700">
                  Flavor
                </label>
                <select
                  id="flavor"
                  value={orderForm.flavor}
                  onChange={(e) => updateOrderForm({ flavor: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                  required
                >
                  {orderCake.prices.map((price, index) => {
                    // Only add unique flavors to the dropdown
                    const flavors = orderCake.prices.map(p => p.flavor);
                    if (flavors.indexOf(price.flavor) === index) {
                      return (
                        <option key={index} value={price.flavor}>
                          {price.flavor}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>
              </div>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Size (pounds)
                </label>
                <select
                  id="size"
                  value={orderForm.size}
                  onChange={(e) => updateOrderForm({ size: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
                  required
                >
                  {orderCake.prices.filter(p => p.flavor === orderForm.flavor).map((price, index) => (
                    <option key={index} value={price.size}>
                      {price.size} pound
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Special Instructions
              </label>
              <textarea
                id="message"
                value={orderForm.message}
                onChange={(e) => updateOrderForm({ message: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
              />
            </div>
            
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm text-gray-700">Selected Cake: <span className="font-medium">{orderCake.name}</span></p>
                <p className="text-sm text-gray-700">
                  Flavor: <span className="font-medium">{orderForm.flavor}</span>,
                  Size: <span className="font-medium">{orderForm.size} pound</span>
                </p>
                <p className="mt-1 text-lg font-bold text-pink-600">
                  Total: {calculatePrice()} BDT
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetOrder();
                    closeCakeModal();
                  }}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                <button
                  type="button"
                  onClick={() => clearOrderForm()}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300"
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
            </div>
          </form>
        </div>
      </Modal>
    );
  }
  
  // Default view showing cake details
  return (
    <Modal 
      isOpen={isModalOpen} 
      onClose={closeCakeModal} 
      title={selectedCake.name}
      size="md"
    >
      <div className="flex flex-col gap-6">
        <ImageSlider images={selectedCake.images} alt={selectedCake.name} />
        
        <div>
          <h3 className="mb-2 text-lg font-bold text-gray-900">Description</h3>
          <p className="text-gray-700">{selectedCake.description}</p>
        </div>
        
        <div>
          <h3 className="mb-2 text-lg font-bold text-gray-900">Ingredients</h3>
          <ul className="list-inside list-disc text-gray-700">
            {selectedCake.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        {selectedCake.notes && (
          <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">Notes</h3>
            <p className="text-gray-700">{selectedCake.notes}</p>
          </div>
        )}
        
        <div>
          <h3 className="mb-2 text-lg font-bold text-gray-900">Price List</h3>
          <div className="rounded-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Flavor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Size (pound)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price (BDT)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {selectedCake.prices.map((price, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {price.flavor}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {price.size}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-pink-600">
                      {price.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => startOrder(selectedCake)}
            className="rounded-md bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Order This Cake
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CakeDetails;