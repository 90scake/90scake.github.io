import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';
import OrderModal from './OrderModal';

const CakeModal = ({ cake, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { updateOrderDetails } = useOrder();
  
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);
  
  if (!isOpen) return null;

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

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
        onClick={handleModalClick}
      ></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Rest of the modal content remains the same */}
          {/* ... */}
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