import { FiShoppingCart } from 'react-icons/fi'
import { useCake } from '../../context/CakeContext'

const BasicCakeBanner = () => {
  const { setIsBasicCakeModalOpen, updateOrderForm } = useCake()

  const handleOrderClick = () => {
    // Pre-fill form for basic cake
    updateOrderForm('cakeId', 'basic')
    updateOrderForm('flavor', 'Vanilla')
    updateOrderForm('pounds', 1)
    
    // Open modal
    setIsBasicCakeModalOpen(true)
  }

  return (
    <section className="relative bg-vanilla-100 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1 animate-slide-up z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-chocolate-600 mb-4">
              Basic Vanilla Cake
            </h2>
            <p className="text-secondary-700 mb-6 max-w-lg">
              Our classic vanilla cake is perfect for any occasion. Made with the finest ingredients 
              and baked to perfection. Simple, delicious, and ready for your celebration.
            </p>
            
            <div className="mb-6">
              <p className="text-xl font-medium">
                Starting at <span className="text-primary-600 font-bold">750 BDT</span>
              </p>
              <p className="text-sm text-secondary-600 mt-1">
                Chocolate flavor available for 800 BDT
              </p>
            </div>
            
            <button 
              className="btn btn-primary flex items-center"
              onClick={handleOrderClick}
            >
              <FiShoppingCart className="mr-2" />
              Order Now
            </button>
          </div>
          
          {/* Image */}
          <div className="order-1 md:order-2 relative z-10">
            <img 
              src="/cakes/basic-vanilla/main.jpg" 
              alt="Basic Vanilla Cake" 
              className="rounded-lg shadow-lg max-w-full md:max-w-md mx-auto"
              onError={(e) => {
                e.target.src = 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                e.target.onerror = null
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-300 rounded-full opacity-20 translate-y-1/3 -translate-x-1/3"></div>
    </section>
  )
}

export default BasicCakeBanner