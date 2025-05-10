import { useState, useEffect } from 'react'
import CakeCard from './CakeCard'
import cakesData from '../../data/cakes.json'

const FeaturedCakes = () => {
  const [featuredCakes, setFeaturedCakes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading from API
    const loadData = () => {
      setIsLoading(true)
      
      // Get featured cakes
      const featured = cakesData.filter(cake => cake.featured)
      
      setTimeout(() => {
        setFeaturedCakes(featured)
        setIsLoading(false)
      }, 500)
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
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
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="font-serif text-3xl font-bold text-center mb-8 text-chocolate-600">
        Featured Cakes
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {featuredCakes.map(cake => (
          <CakeCard key={cake.id} cake={cake} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedCakes