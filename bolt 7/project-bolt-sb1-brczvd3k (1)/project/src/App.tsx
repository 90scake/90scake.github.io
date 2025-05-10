import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCake from './components/FeaturedCake';
import CakeGallery from './components/CakeGallery';
import PoundCakes from './components/PoundCakes';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-dots text-gray-800">
      <Navbar />
      <Hero />
      <FeaturedCake />
      <CakeGallery />
      <PoundCakes />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;