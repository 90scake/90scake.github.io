import React from 'react';
import Hero from '../components/Hero';
import FeaturedCake from '../components/FeaturedCake';
import CakeGallery from '../components/CakeGallery';
import Contact from '../components/Contact';

function Home() {
  return (
    <>
      <Hero />
      <FeaturedCake />
      <CakeGallery />
      <Contact />
    </>
  );
}

export default Home;