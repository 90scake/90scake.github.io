import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cake, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Cake className="h-8 w-8 text-primary-500 mr-2" />
          <span className="font-pacifico text-2xl text-primary-600">90sCake</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary-500 font-medium">Home</Link>
          <Link to="/pound-cakes" className="text-gray-700 hover:text-primary-500 font-medium">Pound Cakes</Link>
          <a href="#contact" className="text-gray-700 hover:text-primary-500 font-medium">Contact</a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ${
          isOpen ? 'max-h-60 py-4' : 'max-h-0 overflow-hidden'
        }`}
      >
        <div className="container-custom flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-primary-500 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/pound-cakes" 
            className="text-gray-700 hover:text-primary-500 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Pound Cakes
          </Link>
          <a 
            href="#contact" 
            className="text-gray-700 hover:text-primary-500 font-medium"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;