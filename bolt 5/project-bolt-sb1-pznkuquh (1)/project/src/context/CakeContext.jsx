import { createContext, useContext, useState, useEffect } from 'react'

// Create a context
const CakeContext = createContext()

// Provider component
export function CakeProvider({ children }) {
  // Form state for ordering
  const [orderForm, setOrderForm] = useState({
    cakeId: '',
    flavor: '',
    pounds: 1,
    design: '',
    contactName: '',
    contactNumber: '',
    email: '',
    deliveryDate: '',
  })

  // Selected cake for detail view
  const [selectedCake, setSelectedCake] = useState(null)
  
  // Modal states
  const [isCakeDetailModalOpen, setIsCakeDetailModalOpen] = useState(false)
  const [isOrderFormModalOpen, setIsOrderFormModalOpen] = useState(false)
  const [isBasicCakeModalOpen, setIsBasicCakeModalOpen] = useState(false)
  
  // Form validation
  const [formErrors, setFormErrors] = useState({})

  // Load form data from localStorage on mount
  useEffect(() => {
    const savedOrderForm = localStorage.getItem('orderFormData')
    if (savedOrderForm) {
      try {
        setOrderForm(JSON.parse(savedOrderForm))
      } catch (e) {
        console.error('Error parsing saved form data:', e)
        localStorage.removeItem('orderFormData')
      }
    }
  }, [])

  // Save form data to localStorage when it changes
  useEffect(() => {
    if (Object.values(orderForm).some(Boolean)) {
      localStorage.setItem('orderFormData', JSON.stringify(orderForm))
    }
  }, [orderForm])

  // Function to reset form
  const resetForm = () => {
    setOrderForm({
      cakeId: '',
      flavor: '',
      pounds: 1,
      design: '',
      contactName: '',
      contactNumber: '',
      email: '',
      deliveryDate: '',
    })
    setFormErrors({})
    localStorage.removeItem('orderFormData')
  }

  // Function to update form
  const updateOrderForm = (name, value) => {
    setOrderForm(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const errors = {}
    
    if (!orderForm.flavor) errors.flavor = 'Please select a flavor'
    if (!orderForm.pounds || orderForm.pounds < 1) errors.pounds = 'Please select valid pounds'
    if (!orderForm.contactName) errors.contactName = 'Name is required'
    if (!orderForm.contactNumber) errors.contactNumber = 'Contact number is required'
    if (!orderForm.email) errors.email = 'Email is required'
    if (!orderForm.deliveryDate) errors.deliveryDate = 'Delivery date is required'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Function to handle WhatsApp order submission
  const submitOrder = () => {
    if (!validateForm()) return false
    
    // Calculate total price based on flavor and pounds
    const price = calculateTotalPrice()
    
    // Create WhatsApp message
    const message = `
*New Cake Order*
Product: ${selectedCake?.name || 'Basic Vanilla Cake'}
ID: ${orderForm.cakeId || 'basic'}
Flavor: ${orderForm.flavor}
Size: ${orderForm.pounds} pound(s)
Design: ${orderForm.design || 'Standard'}
Price: ${price} BDT

*Customer Details*
Name: ${orderForm.contactName}
Contact: ${orderForm.contactNumber}
Email: ${orderForm.email}
Delivery Date: ${orderForm.deliveryDate}
    `.trim()
    
    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message)
    
    // WhatsApp API link (replace with your number)
    const whatsappLink = `https://wa.me/8801XXXXXXXXX?text=${encodedMessage}`
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank')
    
    // Clear form after successful submission
    resetForm()
    
    // Close modals
    setIsCakeDetailModalOpen(false)
    setIsOrderFormModalOpen(false)
    setIsBasicCakeModalOpen(false)
    
    return true
  }

  // Calculate total price based on selected options
  const calculateTotalPrice = () => {
    if (!selectedCake && !orderForm.flavor) return 0
    
    if (orderForm.cakeId === 'basic') {
      // Basic cake pricing
      return orderForm.flavor === 'Vanilla' ? 750 : 800
    } else if (selectedCake) {
      // Find the price for selected flavor and pounds
      const priceOption = selectedCake.prices.find(
        p => p.flavor === orderForm.flavor && p.pounds === Number(orderForm.pounds)
      )
      return priceOption?.price || 0
    }
    
    return 0
  }

  // Function to open cake detail modal
  const openCakeDetail = (cake) => {
    setSelectedCake(cake)
    setIsCakeDetailModalOpen(true)
    
    // Pre-fill form with first options
    if (cake && cake.prices.length > 0) {
      const firstPrice = cake.prices[0]
      setOrderForm(prev => ({
        ...prev,
        cakeId: cake.id,
        flavor: firstPrice.flavor,
        pounds: firstPrice.pounds
      }))
    }
  }

  // Provide value to consumers
  const contextValue = {
    orderForm,
    updateOrderForm,
    resetForm,
    validateForm,
    formErrors,
    selectedCake,
    setSelectedCake,
    isCakeDetailModalOpen,
    setIsCakeDetailModalOpen,
    isOrderFormModalOpen,
    setIsOrderFormModalOpen,
    isBasicCakeModalOpen,
    setIsBasicCakeModalOpen,
    openCakeDetail,
    submitOrder,
    calculateTotalPrice
  }

  return (
    <CakeContext.Provider value={contextValue}>
      {children}
    </CakeContext.Provider>
  )
}

// Custom hook for using the cake context
export function useCake() {
  const context = useContext(CakeContext)
  if (!context) {
    throw new Error('useCake must be used within a CakeProvider')
  }
  return context
}