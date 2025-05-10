import { useState, useRef, useEffect } from 'react'
import { FiX, FiChevronLeft, FiChevronRight, FiShoppingCart } from 'react-icons/fi'
import { useCake } from '../../context/CakeContext'
import ImageSlider from '../common/ImageSlider'
import OrderForm from '../forms/OrderForm'

const CakeDetailModal = () => {
  const { 
    selectedCake, 
    isCakeDetailModalOpen, 
    setIsCakeDetailModalOpen,
    isOrderFormModalOpen,
    setIsOrderFormModalOpen
  } = useCake()
  
  const [step, setStep] = useState(1) // 1: Details, 2: Order Form
  const modalRef = useRef(null)

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsCakeDetailModalOpen(false)
        setStep(1) // Reset to step 1 when closing
      }
    }

    if (isCakeDetailModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isCakeDetailModalOpen, setIsCakeDetailModalOpen])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsCakeDetailModalOpen(false)
        setStep(1) // Reset to step 1 when closing
      }
    }

    if (isCakeDetailModalOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isCakeDetailModalOpen, setIsCakeDetailModalOpen])

  // Reset step when cake changes
  useEffect(() => {
    setStep(1)
  }, [selectedCake])

  if (!isCakeDetailModalOpen || !selectedCake) return null

  const handleClose = () => {
    setIsCakeDetailModalOpen(false)
    setStep(1) // Reset to step 1 when closing
  }

  const handleOrderClick = () => {
    setStep(2)
  }

  const handleBackToDetails = () => {
    setStep(1)
  }

  return (
    <div className="modal-overlay">
      <div 
        ref={modalRef}
        className="modal-content max-w-4xl"
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          onClick={handleClose}
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        {step === 1 ? (
          /* Step 1: Cake Details */
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Slider */}
            <div className="relative h-64 md:h-auto overflow-hidden">
              <ImageSlider images={selectedCake.images} name={selectedCake.name} />
            </div>

            {/* Cake Details */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh]">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-secondary-900 mb-3">
                {selectedCake.name}
              </h2>
              
              <p className="text-secondary-700 mb-6">
                {selectedCake.description}
              </p>
              
              {/* Price Table */}
              <div className="mb-6">
                <h3 className="font-serif text-lg font-semibold mb-2 text-secondary-800">
                  Price Options
                </h3>
                <div className="bg-gray-50 rounded-lg p-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium">Flavor</th>
                        <th className="text-left py-2 font-medium">Size</th>
                        <th className="text-right py-2 font-medium">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCake.prices.map((price, index) => (
                        <tr key={index} className="border-b border-gray-200 last:border-0">
                          <td className="py-2">{price.flavor}</td>
                          <td className="py-2">{price.pounds} lb</td>
                          <td className="py-2 text-right font-medium">{price.price} BDT</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="font-serif text-lg font-semibold mb-2 text-secondary-800">
                  Ingredients
                </h3>
                <p className="text-secondary-700 text-sm">
                  {selectedCake.ingredients}
                </p>
              </div>
              
              {/* Allergens */}
              {selectedCake.allergens && (
                <div className="mb-6">
                  <h3 className="font-serif text-lg font-semibold mb-2 text-secondary-800">
                    Allergens
                  </h3>
                  <p className="text-secondary-700 text-sm">
                    {selectedCake.allergens}
                  </p>
                </div>
              )}
              
              {/* Notes */}
              <div className="mb-8">
                <h3 className="font-serif text-lg font-semibold mb-2 text-secondary-800">
                  Notes
                </h3>
                <p className="text-secondary-700 text-sm">
                  {selectedCake.notes}
                </p>
              </div>
              
              {/* Order Button */}
              <button 
                className="btn btn-primary w-full flex items-center justify-center"
                onClick={handleOrderClick}
              >
                <FiShoppingCart className="mr-2" /> Order Now
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Order Form */
          <div className="p-6 md:p-8">
            <button 
              className="mb-4 text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium"
              onClick={handleBackToDetails}
            >
              <FiChevronLeft className="mr-1" /> Back to details
            </button>
            
            <h2 className="font-serif text-2xl font-bold text-secondary-900 mb-6">
              Order {selectedCake.name}
            </h2>
            
            <OrderForm cake={selectedCake} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CakeDetailModal