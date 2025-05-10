import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

const CakeCategories = () => {
  const categories = [
    {
      id: 'specialty',
      name: 'Specialty Cakes',
      description: 'Unique and delicious cakes for special occasions',
      image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/'
    },
    {
      id: 'pound',
      name: 'Pound Cakes',
      description: 'Traditional rich and buttery pound cakes',
      image: 'https://images.pexels.com/photos/6177680/pexels-photo-6177680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: '/pound-cakes'
    },
    {
      id: 'custom',
      name: 'Custom Cakes',
      description: 'Personalized cakes designed just for you',
      image: 'https://images.pexels.com/photos/265801/pexels-photo-265801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      link: 'https://wa.me/8801XXXXXXXXX?text=Hi%20there%2C%20I%27m%20interested%20in%20ordering%20a%20customized%20cake',
      external: true
    }
  ]

  return (
    <section className="bg-vanilla-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-center mb-8 text-chocolate-600">
          Explore Our Cakes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(category => (
            <div 
              key={category.id}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              {/* Background Image */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-serif text-xl font-bold mb-2">
                  {category.name}
                </h3>
                <p className="text-sm mb-4 opacity-90">
                  {category.description}
                </p>
                
                {category.external ? (
                  <a 
                    href={category.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary-200 hover:text-primary-100 transition-colors"
                  >
                    Explore <FiChevronRight className="ml-1" />
                  </a>
                ) : (
                  <Link 
                    to={category.link}
                    className="inline-flex items-center text-sm font-medium text-primary-200 hover:text-primary-100 transition-colors"
                  >
                    Explore <FiChevronRight className="ml-1" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CakeCategories