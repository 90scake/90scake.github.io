import React from 'react';
import { Link } from 'react-router-dom';
import { Cake } from 'lucide-react';

function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold mb-4 md:mb-0">
          <Cake size={32} />
          <span className="font-extrabold tracking-wider">90sCake</span>
        </Link>
        
        <nav className="flex flex-wrap justify-center space-x-6">
          <Link to="/" className="px-2 py-1 text-white hover:text-pink-200 transition-colors duration-200">
            Home
          </Link>
          <Link to="/pound-cakes" className="px-2 py-1 text-white hover:text-pink-200 transition-colors duration-200">
            Pound Cakes
          </Link>
          <Link to="/basic-order" className="px-2 py-1 text-white hover:text-pink-200 transition-colors duration-200">
            Basic Cakes
          </Link>
          <a 
            href={`https://wa.me/1234567890?text=${encodeURIComponent('I would like to order a custom cake')}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-4 py-1 bg-teal-500 rounded-full text-white hover:bg-teal-600 transition-colors duration-200"
          >
            Custom Order
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;