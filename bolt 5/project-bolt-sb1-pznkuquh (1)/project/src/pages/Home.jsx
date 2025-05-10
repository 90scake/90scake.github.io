import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import FeaturedCakes from '../components/home/FeaturedCakes'
import BasicCakeBanner from '../components/home/BasicCakeBanner'
import CakeCategories from '../components/home/CakeCategories'
import CakeDetailModal from '../components/modals/CakeDetailModal'
import BasicCakeModal from '../components/modals/BasicCakeModal'
import cakesData from '../data/cakes.json'
import { useCake } from '../context/CakeContext'

const Home = () => {
  const { setSelectedCake } = useCake()

  // Reset selected cake when component unmounts
  useEffect(() => {
    return () => {
      setSelectedCake(null)
    }
  }, [setSelectedCake])

  return (
    <>
      <Helmet>
        <title>90sCake - Delicious Cakes for Every Occasion</title>
        <meta name="description" content="Delicious custom cakes for all occasions. Order your perfect cake today!" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-100 to-white pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 animate-fade-in">
              Delicious Cakes for Every Celebration
            </h1>
            <p className="text-lg text-secondary-700 mb-8 animate-slide-up">
              From birthdays to weddings, we craft beautiful, delicious cakes 
              that will make your celebration unforgettable.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-16 h-16 bg-primary-300 rounded-full opacity-30 animate-pulse-slow hidden md:block"></div>
        <div className="absolute bottom-1/3 right-10 w-24 h-24 bg-primary-200 rounded-full opacity-30 animate-pulse-slow hidden md:block"></div>
      </section>

      {/* Basic Cake Banner */}
      <BasicCakeBanner />

      {/* Cake Categories */}
      <CakeCategories />

      {/* Featured Cakes */}
      <FeaturedCakes />

      {/* Testimonials Section */}
      <section className="bg-vanilla-100 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl font-bold text-center mb-10 text-chocolate-600">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-cake">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-600 font-bold">
                  SA
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Sarah A.</h3>
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-secondary-700">
                "The chocolate cake I ordered for my daughter's birthday was absolutely divine! 
                Everyone loved it, and the design was exactly what I had in mind."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-cake">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-600 font-bold">
                  RK
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Rahul K.</h3>
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-secondary-700">
                "I've ordered multiple cakes from 90sCake for various occasions, and they never 
                disappoint. Their red velvet cake is simply the best in town!"
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-cake">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center text-primary-600 font-bold">
                  MH
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Mariam H.</h3>
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-secondary-700">
                "The customized cake for my wedding was stunning! Not only did it look beautiful,
                but it tasted amazing too. Thank you for making our day special!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CakeDetailModal />
      <BasicCakeModal />
    </>
  )
}

export default Home