import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Cake, Flavor, Size } from '../../types';
import ImageSlider from '../cake/ImageSlider';
import OrderForm from '../forms/OrderForm';
import { useOrder } from '../../context/OrderContext';

interface CakeModalProps {
  cake: Cake;
  isOpen: boolean;
  onClose: () => void;
}

const CakeModal: React.FC<CakeModalProps> = ({ cake, isOpen, onClose }) => {
  const [step, setStep] = useState<'details' | 'order'>('details');
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor>('vanilla');
  const [selectedSize, setSelectedSize] = useState<Size>('1 pound');
  const [totalPrice, setTotalPrice] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const { setSelectedCakeId } = useOrder();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSelectedCakeId(cake.id);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, cake.id, setSelectedCakeId]);

  useEffect(() => {
    const price = cake.prices.find(
      p => p.size === selectedSize && p.flavor === selectedFlavor
    );
    setTotalPrice(price?.amount || 0);
  }, [selectedFlavor, selectedSize, cake.prices]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-2xl text-primary-dark">
              {step === 'details' ? cake.name : 'Place Order'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {step === 'details' ? (
            <>
              <ImageSlider images={cake.images} id={cake.id} />
              
              <div className="mb-6">
                <h3 className="font-display text-xl text-secondary-dark mb-2">Description</h3>
                <p className="text-gray-700">{cake.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-display text-xl text-secondary-dark mb-2">Ingredients</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {cake.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-display text-xl text-secondary-dark mb-2">Notes</h3>
                <p className="text-gray-700">{cake.notes}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="font-display text-xl text-secondary-dark mb-2">Price List</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {cake.prices.map((price, index) => (
                    <div key={index} className="bg-pink-50 p-2 rounded-lg">
                      <p className="text-sm font-semibold">{price.size}, {price.flavor}</p>
                      <p className="text-lg font-display text-primary-dark">{price.amount} BDT</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Flavor</label>
                      <select
                        value={selectedFlavor}
                        onChange={(e) => setSelectedFlavor(e.target.value as Flavor)}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                      >
                        {Array.from(new Set(cake.prices.map(p => p.flavor))).map((flavor) => (
                          <option key={flavor} value={flavor}>{flavor}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Size</label>
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value as Size)}
                        className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                      >
                        {Array.from(new Set(cake.prices.map(p => p.size))).map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">
                    Total Price: <span className="font-display text-primary-dark">{totalPrice} BDT</span>
                  </p>
                </div>
                
                <button
                  onClick={() => setStep('order')}
                  className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
                >
                  Place Order
                </button>
              </div>
            </>
          ) : (
            <OrderForm 
              cakeInfo={cake}
              selectedFlavor={selectedFlavor}
              selectedSize={selectedSize}
              totalPrice={totalPrice}
              onBack={() => setStep('details')}
              onOrderComplete={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CakeModal;