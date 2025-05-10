import { useState, useRef, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { useCake } from '../../context/CakeContext'
import basicCakeDesigns from '../../data/basicCakeDesigns.json'

const BasicCakeModal = () => {
  const { 
    orderForm, 
    updateOrderForm, 
    resetForm,
    formErrors, 
    validateForm,
    submitOrder,
    isBasicCakeModalOpen, 
    setIsBasicCakeModalOpen
  } = useCake()
  
  const [selectedDesign, setSelectedDesign] = useState(basicCakeDesigns[0]?.id || '')
  const modalRef = useRef(null)
  
  // Set default values when modal opens
  useEffect(() => {
    if (isBasicCakeModalOpen) {
      updateOrderForm('cakeId', 'basic')
      updateOrderForm('flavor', 'Vanilla')
      updateOrderForm('pounds', 1)
      setSelectedDesign(basicCakeDesigns[0]?.id || '')
    }
  }, [isBasicCakeModalOpen, updateOrderForm])

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsBasicCakeModalOpen(false)
      }
    }

    if (isBasicCakeModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isBasicCakeModalOpen, setIsBasicCakeModalOpen])

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsBasicCakeModalOpen(false)
      }
    }

    if (isBasicCakeModalOpen) {
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isBasicCakeModalOpen, setIsBasicCakeModalOpen])

  if (!isBasicCakeModalOpen) return null

  const handleClose = () => {
    setIsBasicCakeModalOpen(false)
  }

  const handleDesignChange = (designId) => {
    setSelectedDesign(designId)
    updateOrderForm('design', basicCakeDesigns.find(d => d.id === designId)?.name || '')
  }

  const handleFlavorChange = (e) => {
    updateOrderForm('flavor', e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Update design in form before submitting
    updateOrderForm('design', basicCakeDesigns.find(d => d.id === selectedDesign)?.name || '')
    
    if (validateForm()) {
      if (submitOrder()) {
        handleClose()
      }
    }
  }

  return (
    <div className="modal-overlay">
      <div 
        ref={modalRef}
        className="modal-content max-w-2xl"
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
          onClick={handleClose}
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="font-serif text-2xl font-bold text-secondary-900 mb-6">
            Basic Cake Order
          </h2>
          
          <form onSubmit={handleSubmit}>
            {/* Cake Flavor */}
            <div className="mb-6">
              <label htmlFor="flavor" className="block text-secondary-700 font-medium mb-2">
                Choose Flavor
              </label>
              <div className="flex gap-4">
                <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all ${
                  orderForm.flavor === 'Vanilla' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="flavor"
                    value="Vanilla"
                    checked={orderForm.flavor === 'Vanilla'}
                    onChange={handleFlavorChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-vanilla-300 mx-auto mb-2"></div>
                    <div className="font-medium">Vanilla</div>
                    <div className="text-sm text-secondary-600">750 BDT</div>
                  </div>
                </label>
                <label className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all ${
                  orderForm.flavor === 'Chocolate' ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                }`}>
                  <input
                    type="radio"
                    name="flavor"
                    value="Chocolate"
                    checked={orderForm.flavor === 'Chocolate'}
                    onChange={handleFlavorChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-chocolate-400 mx-auto mb-2"></div>
                    <div className="font-medium">Chocolate</div>
                    <div className="text-sm text-secondary-600">800 BDT</div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Cake Designs */}
            <div className="mb-6">
              <label className="block text-secondary-700 font-medium mb-2">
                Choose Design
              </label>
              <div className="grid grid-cols-2 gap-4">
                {basicCakeDesigns.map(design => (
                  <label
                    key={design.id}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedDesign === design.id ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="design"
                      value={design.id}
                      checked={selectedDesign === design.id}
                      onChange={() => handleDesignChange(design.id)}
                      className="sr-only"
                    />
                    <div>
                      <img
                        src={design.image}
                        alt={design.name}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Cake+Design'
                          e.target.onerror = null
                        }}
                      />
                      <div className="p-2 text-center">
                        <div className="font-medium text-sm">{design.name}</div>
                        <div className="text-xs text-secondary-600">{design.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Customer Information */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactName" className="block text-secondary-700 font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={orderForm.contactName || ''}
                  onChange={(e) => updateOrderForm('contactName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    formErrors.contactName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your name"
                />
                {formErrors.contactName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.contactName}</p>
                )}
              </div>
              <div>
                <label htmlFor="contactNumber" className="block text-secondary-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={orderForm.contactNumber || ''}
                  onChange={(e) => updateOrderForm('contactNumber', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    formErrors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
                {formErrors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.contactNumber}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-secondary-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={orderForm.email || ''}
                  onChange={(e) => updateOrderForm('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="deliveryDate" className="block text-secondary-700 font-medium mb-2">
                  Delivery Date
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={orderForm.deliveryDate || ''}
                  onChange={(e) => updateOrderForm('deliveryDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    formErrors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.deliveryDate && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.deliveryDate}</p>
                )}
              </div>
            </div>
            
            {/* Price Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between font-medium text-lg">
                <span>Total Price:</span>
                <span className="text-primary-600">
                  {orderForm.flavor === 'Vanilla' ? 750 : 800} BDT
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
              <button 
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Clear Form
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
              >
                Submit Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BasicCakeModal