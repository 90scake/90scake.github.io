import React from 'react';
import { Link } from 'react-router-dom';
import { Cake } from 'lucide-react';
import ImageSlider from '../components/ui/ImageSlider';
import CakeGrid from '../components/cake/CakeGrid';

const Home = () => {
  // Featured cakes section - these would be from your cakes data
  const featuredCakesSection = () => (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Special Cakes</h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
            Handcrafted with love and the finest ingredients
          </p>
        </div>
        <CakeGrid />
        <div className="mt-10 text-center">
          <Link 
            to="/cakes"
            className="inline-block rounded-md bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-pink-700 hover:shadow-xl"
          >
            View All Cakes
          </Link>
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-100 to-purple-100">
        <div className="absolute inset-0 z-0 opacity-40">
          {/* 90s style patterns */}
          <div className="absolute left-[10%] top-[20%] h-20 w-20 rotate-45 rounded-lg bg-teal-300"></div>
          <div className="absolute left-[30%] top-[60%] h-16 w-16 rounded-full bg-purple-300"></div>
          <div className="absolute right-[15%] top-[40%] h-24 w-24 rotate-12 bg-yellow-300"></div>
          <div className="absolute right-[25%] top-[10%] h-12 w-12 rounded-full bg-pink-400"></div>
        </div>
        
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center px-4 py-16 sm:px-6 lg:flex-row lg:px-8 lg:py-20">
          <div className="relative z-10 mt-12 text-center lg:mt-0 lg:w-1/2 lg:text-left">
            <div className="relative">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                Delicious Cakes
                <span className="block text-pink-600">with 90s Vibes</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Bringing the nostalgic flavor of the 90s to your special occasions. 
                Our handcrafted cakes are made with love and the highest quality ingredients.
              </p>
              <div className="mt-8 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
                <Link
                  to="/cakes"
                  className="rounded-md bg-pink-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-pink-700 hover:shadow-xl"
                >
                  Order Now
                </Link>
                <Link
                  to="/basic-cake"
                  className="rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-pink-600 shadow-lg transition-all hover:bg-pink-50 hover:shadow-xl"
                >
                  Basic Cake
                </Link>
              </div>
            </div>
            
            {/* Basic cake promo banner */}
            <div className="relative mt-12 overflow-hidden rounded-xl bg-white p-6 shadow-lg lg:mt-16">
              <div className="absolute -right-8 -top-8 h-20 w-20 rotate-45 bg-pink-200 opacity-50"></div>
              <div className="absolute -left-4 -top-4 h-10 w-10 rounded-full bg-yellow-200 opacity-50"></div>
              <h3 className="text-xl font-bold text-gray-900">Basic Vanilla Cake</h3>
              <p className="mt-2 text-gray-600">Starting at just <span className="font-bold text-pink-600">750 BDT</span></p>
              <Link
                to="/basic-cake"
                className="mt-4 inline-block rounded-md bg-pink-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-700"
              >
                Order Now
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 lg:w-1/2">
            <div className="rounded-xl bg-white p-3 shadow-xl">
              <ImageSlider 
                images={[]} 
                alt="Featured Cake" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose Us</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500">
              We bring the 90s nostalgia to your taste buds
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 p-6 shadow-md transition-transform hover:scale-105">
              <div className="mb-4 rounded-full bg-pink-100 p-3 text-pink-600 w-12 h-12 flex items-center justify-center">
                <Cake size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Quality Ingredients</h3>
              <p className="mt-2 text-gray-600">We use only the finest, freshest ingredients for exceptional taste.</p>
            </div>
            
            <div className="rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 p-6 shadow-md transition-transform hover:scale-105">
              <div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600 w-12 h-12 flex items-center justify-center">
                <Cake size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Custom Designs</h3>
              <p className="mt-2 text-gray-600">Personalized cakes designed specifically for your occasion.</p>
            </div>
            
            <div className="rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 p-6 shadow-md transition-transform hover:scale-105">
              <div className="mb-4 rounded-full bg-teal-100 p-3 text-teal-600 w-12 h-12 flex items-center justify-center">
                <Cake size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Unique Flavors</h3>
              <p className="mt-2 text-gray-600">Exciting and nostalgic flavor combinations you won't find elsewhere.</p>
            </div>
            
            <div className="rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 p-6 shadow-md transition-transform hover:scale-105">
              <div className="mb-4 rounded-full bg-yellow-100 p-3 text-yellow-600 w-12 h-12 flex items-center justify-center">
                <Cake size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900">Fast Delivery</h3>
              <p className="mt-2 text-gray-600">Quick and careful delivery to preserve freshness and presentation.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cakes */}
      {featuredCakesSection()}
      
      {/* Call to Action */}
      <section className="relative overflow-hidden bg-pink-600 py-16">
        <div className="absolute inset-0 opacity-10">
          {/* 90s style patterns */}
          <div className="absolute left-[5%] top-[20%] h-32 w-32 rotate-45 bg-white"></div>
          <div className="absolute right-[10%] top-[30%] h-24 w-24 rounded-full bg-white"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Want a Customized Cake?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-pink-100">
            Contact us directly and let us know what you're looking for.
          </p>
          <div className="mt-8">
            <a 
              href="https://wa.me/+8801712345678?text=Hi%20there!%20I%20want%20to%20order%20a%20customized%20cake."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-white px-8 py-3 text-lg font-medium text-pink-600 shadow-lg transition-all hover:bg-pink-50 hover:shadow-xl"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;