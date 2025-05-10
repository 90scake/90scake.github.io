import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { basicCakeDesigns } from '../../data/cakeData';
import OrderForm from '../forms/OrderForm';
import { useOrder } from '../../context/OrderContext';

interface BasicOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BasicOrderModal: React.FC<BasicOrderModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'design' | 'order'>('design');
  const [selectedDesign, setSelectedDesign] = useState<number>(1);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('vanilla');
  const [totalPrice, setTotalPrice] = useState(750);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const { updateOrderDetails, setIsBasicOrder } = useOrder();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsBasicOrder(true);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, setIsBasicOrder]);

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

  useEffect(() => {
    // Update price based on flavor
    if (selectedFlavor === 'vanilla') {
      setTotalPrice(750);
    } else if (selectedFlavor === 'chocolate') {
      setTotalPrice(800);
    } else if (selectedFlavor === 'strawberry') {
      setTotalPrice(800);
    } else if (selectedFlavor === 'butterscotch') {
      setTotalPrice(800);
    } else if (selectedFlavor === 'red velvet') {
      setTotalPrice(850);
    }
  }, [selectedFlavor]);

  const handleDesignSelect = (id: number) => {
    setSelectedDesign(id);
    updateOrderDetails({ selectedDesign: id });
  };

  const handleNext = () => {
    updateOrderDetails({ 
      selectedFlavor,
      selectedSize: '1 pound',
      selectedDesign
    });
    setStep('order');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-2xl text-primary-dark">
              {step === 'design' ? 'Choose Basic Cake Design' : 'Place Order'}
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {step === 'design' ? (
            <>
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {basicCakeDesigns.map((design) => (
                    <div 
                      key={design.id}
                      className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                        selectedDesign === design.id ? 'border-primary shadow-md' : 'border-gray-200'
                      }`}
                      onClick={() => handleDesignSelect(design.id)}
                    >
                      <img 
                        src={design.image} 
                        alt={design.name} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-display text-lg">{design.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Select Flavor</label>
                <select
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-2"
                >
                  <option value="vanilla">Vanilla</option>
                  <option value="chocolate">Chocolate</option>
                  <option value="strawberry">Strawberry</option>
                  <option value="butterscotch">Butterscotch</option>
                  <option value="red velvet">Red Velvet</option>
                </select>
                <p className="text-lg">
                  Price: <span className="font-display text-primary-dark">{totalPrice} BDT</span>
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
                >
                  Continue
                </button>
              </div>
            </>
          ) : (
            <OrderForm 
              selectedFlavor={selectedFlavor}
              selectedSize="1 pound"
              totalPrice={totalPrice}
              isBasicOrder={true}
              selectedDesign={selectedDesign}
              onBack={() => setStep('design')}
              onOrderComplete={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicOrderModal;