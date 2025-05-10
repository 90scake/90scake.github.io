import { useState } from 'react'
import { FiInfo, FiShoppingCart } from 'react-icons/fi'
import { useCake } from '../../context/CakeContext'

const CakeCard = ({ cake }) => {
  const { openCakeDetail } = useCake()
  const [currentImage, setCurrentImage] = useState(0)

  // Get the first price as the display price
  const displayPrice = cake.prices[0]?.price || 0

  // Get unique flavors
  const flavors = [...new Set(cake.prices.map(price => price.flavor))]

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=Cake+Image'
    e.target.onerror = null
  }

  // Cycle through images on hover if there are multiple
  const handleMouseEnter = () => {
    if (cake.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImage(current => (current + 1) % cake.images.length)
      }, 2000)
      
      return () => clearInterval(interval)
    }
  }

  const handleMouseLeave = () => {
    setCurrentImage(0)
  }

  return (
    <div 
      className="cake-card flex flex-col"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cake Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={cake.images[currentImage]}
          alt={cake.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={handleImageError}
        />
        {
          cake.featured && (
            <div className="absolute top-0 right-0 bg-primary-500 text-white px-2 py-1 text-xs font-medium">
              Featured
            </div>
          )
        }
      </div>

      {/* Cake Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-serif text-lg font-semibold text-secondary-800 mb-2">
          {cake.name}
        </h3>
        <p className="text-secondary-600 text-sm mb-4 flex-grow">
          {cake.description}
        </p>
        
        {/* Price and Details Button */}
        <div className="flex justify-between items-center mt-auto">
          <div className="has-tooltip">
            <span className="font-medium text-secondary-900">
              {displayPrice} BDT
            </span>
            
            {/* Price tooltip */}
            {cake.prices.length > 1 && (
              <div className="tooltip left-0 bottom-full mb-2">
                <div className="font-medium mb-1 border-b border-white/20 pb-1">
                  Available options:
                </div>
                <ul className="text-xs space-y-1">
                  {cake.prices.map((price, index) => (
                    <li key={index}>
                      {price.flavor} ({price.pounds} lb): {price.price} BDT
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              className="p-2 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors"
              onClick={() => openCakeDetail(cake)}
              aria-label="View details"
            >
              <FiInfo size={18} />
            </button>
            <button
              className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              onClick={() => openCakeDetail(cake)}
              aria-label="Order now"
            >
              <FiShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CakeCard