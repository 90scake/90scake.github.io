import { useState, useEffect } from 'react';
import { Cake, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close menu when clicking a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-gradient-to-r from-pink-50 to-purple-50 py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-pink-600"
          onClick={closeMenu}
        >
          <Cake size={28} className="text-pink-600" />
          <span className="font-serif">90sCake</span>
          {/* 90s-style decorative element */}
          <span className="relative -right-1 -top-3 z-10 hidden rotate-12 rounded-sm bg-teal-400 px-2 py-0.5 text-xs font-semibold uppercase text-white shadow-sm sm:inline-block">
            Yummy!
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          <Link 
            to="/"
            className="text-gray-700 transition-colors hover:text-pink-600"
          >
            Home
          </Link>
          <Link 
            to="/cakes"
            className="text-gray-700 transition-colors hover:text-pink-600"
          >
            Cakes
          </Link>
          <Link 
            to="/basic-cake"
            className="text-gray-700 transition-colors hover:text-pink-600"
          >
            Basic Cake
          </Link>
          <a 
            href="https://wa.me/+8801712345678?text=Hi%20there!%20I%20want%20to%20order%20a%20customized%20cake."
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-pink-600 px-4 py-2 text-white transition-colors hover:bg-pink-700"
          >
            Custom Order
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="rounded-md p-2 text-gray-700 md:hidden"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} md:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="mx-auto max-w-7xl space-y-1 px-4 pb-4 pt-2 sm:px-6 lg:px-8">
          <Link 
            to="/"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/cakes"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600"
            onClick={closeMenu}
          >
            Cakes
          </Link>
          <Link 
            to="/basic-cake"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600"
            onClick={closeMenu}
          >
            Basic Cake
          </Link>
          <a 
            href="https://wa.me/+8801712345678?text=Hi%20there!%20I%20want%20to%20order%20a%20customized%20cake."
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md bg-pink-600 px-3 py-2 text-base font-medium text-white hover:bg-pink-700"
            onClick={closeMenu}
          >
            Custom Order
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;