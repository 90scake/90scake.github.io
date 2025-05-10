import { useEffect } from 'react'
import { useCake } from '../../context/CakeContext'

const OrderForm = ({ cake }) => {
  const { 
    orderForm, 
    updateOrderForm, 
    validateForm,
    formErrors,
    submitOrder,
    calculateTotalPrice
  } = useCake()

  // Update form when cake changes
  useEffect(() => {
    if (cake) {
      // Default to first price option
      if (cake.prices && cake.prices.length > 0) {
        const firstPrice = cake.prices[0]
        updateOrderForm('flavor', firstPrice.flavor)
        updateOrderForm('pounds', firstPrice.pounds)
      }
      updateOrderForm('cakeId', cake.id)
    }
  }, [cake, updateOrderForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      submitOrder()
    }
  }

  // Calculate current price based on flavor and pounds
  const totalPrice = calculateTotalPrice()

  // Get unique flavors and pounds
  const flavors = [...new Set(cake?.prices.map(price => price.flavor) || [])]
  const pounds = [...new Set(cake?.prices.map(price => price.pounds) || [])]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Flavor Selection */}
      <div>
        <label htmlFor="flavor" className="block text-secondary-700 font-medium mb-2">
          Choose Flavor
        </label>
        <select
          id="flavor"
          name="flavor"
          value={orderForm.flavor || ''}
          onChange={(e) => updateOrderForm('flavor', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
            formErrors.flavor ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select flavor</option>
          {flavors.map((flavor) => (
            <option key={flavor} value={flavor}>
              {flavor}
            </option>
          ))}
        </select>
        {formErrors.flavor && (
          <p className="text-red-500 text-sm mt-1">{formErrors.flavor}</p>
        )}
      </div>

      {/* Pounds Selection */}
      <div>
        <label htmlFor="pounds" className="block text-secondary-700 font-medium mb-2">
          Size (in pounds)
        </label>
        <select
          id="pounds"
          name="pounds"
          value={orderForm.pounds || ''}
          onChange={(e) => updateOrderForm('pounds', Number(e.target.value))}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300 ${
            formErrors.pounds ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select size</option>
          {pounds.map((pound) => (
            <option key={pound} value={pound}>
              {pound} pound
            </option>
          ))}
        </select>
        {formErrors.pounds && (
          <p className="text-red-500 text-sm mt-1">{formErrors.pounds}</p>
        )}
      </div>

      {/* Customer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between font-medium text-lg">
          <span>Total Price:</span>
          <span className="text-primary-600">{totalPrice} BDT</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        Place Order
      </button>
    </form>
  )
}

export default OrderForm