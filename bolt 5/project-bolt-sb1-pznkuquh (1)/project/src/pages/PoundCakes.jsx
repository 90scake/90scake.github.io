import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import CakeCard from '../components/home/CakeCard'
import CakeDetailModal from '../components/modals/CakeDetailModal'
import poundCakesData from '../data/poundCakes.json'
import { useCake } from '../context/CakeContext'

const PoundCakes = () => {
  const [poundCakes, setPoundCakes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { setSelectedCake } = useCake()

  // Reset selected cake when component unmounts
  useEffect(() => {
    return () => {
      setSelectedCake(null)
    }
  }, [setSelectedCake])

  useEffect(() => {
    // Simulate loading from API
    const loadData = () => {
      setIsLoading(true)
      
      setTimeout(() => {
        setPoundCakes(poundCakesData)
        setIsLoading(false)
      }, 500)
    }

    loadData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Pound Cakes - 90sCake</title>
        <meta name="description" content="Traditional and delicious pound cakes. Perfect for tea time or any occasion." />
      </Helmet>

      {/* Page Header */}
      <section className="bg-chocolate-600 pt-28 pb-10 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Pound Cakes
          </h1>
          <p className="text-vanilla-100 max-w-2xl mx-auto">
            Our rich, buttery pound cakes are made with the finest ingredients, following traditional recipes 
            that have been perfected over generations. Perfect for tea time or any occasion.
          </p>
        </div>
      </section>

      {/* Pound Cakes List */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {poundCakes.map(cake => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-vanilla-100 py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-chocolate-600 mb-6 text-center">
              About Our Pound Cakes
            </h2>
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-cake">
              <p className="mb-4 text-secondary-700">
                Our pound cakes are made with the perfect ratio of butter, sugar, flour, and eggs to 
                create that dense, rich texture and buttery flavor that pound cakes are known for.
              </p>
              <p className="mb-4 text-secondary-700">
                Originally, pound cakes got their name because they were made with a pound each of 
                four ingredients. While our recipes have been refined over time, we stay true to the 
                traditional methods that make these cakes so special.
              </p>
              <p className="text-secondary-700">
                Each cake is baked in small batches to ensure quality and freshness. We offer a variety 
                of flavors from classic vanilla to marble, chocolate chip, and seasonal favorites.
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-vanilla-50 p-4 rounded-lg border border-vanilla-200">
                  <h3 className="font-serif font-bold text-lg mb-2 text-chocolate-600">Perfect for Tea Time</h3>
                  <p className="text-sm text-secondary-700">
                    The dense, buttery texture makes pound cakes the perfect companion for your 
                    morning or afternoon tea.
                  </p>
                </div>
                <div className="bg-vanilla-50 p-4 rounded-lg border border-vanilla-200">
                  <h3 className="font-serif font-bold text-lg mb-2 text-chocolate-600">Great as Gifts</h3>
                  <p className="text-sm text-secondary-700">
                    Our pound cakes make wonderful gifts for birthdays, housewarmings, or just to show 
                    someone you care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CakeDetailModal />
    </>
  )
}

export default PoundCakes