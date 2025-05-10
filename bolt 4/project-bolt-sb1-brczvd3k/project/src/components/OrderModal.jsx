import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';

const OrderModal = ({ isOpen, onClose, isFeatured = false }) => {
  // ... existing state declarations ...

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [onClose]);

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 modal-overlay"
        onClick={handleModalClick}
      ></div>
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-xl max-w-2xl w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Rest of the modal content remains the same */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;