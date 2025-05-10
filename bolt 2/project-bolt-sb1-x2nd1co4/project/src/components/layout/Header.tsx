import React from 'react';
import { Cake, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { openCustomOrderWhatsApp } from '../../utils/whatsappHelper';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Cake size={32} className="text-white" />
          <span className="font-display text-2xl text-white">90sCake</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-display text-white hover:text-accent transition-colors">
            Home
          </Link>
          <button
            onClick={openCustomOrderWhatsApp}
            className="font-display text-white bg-secondary px-4 py-2 rounded-full hover:bg-secondary-dark transition-colors"
          >
            Custom Order
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary-dark py-4 px-4 animate-fade-in-down">
          <nav className="flex flex-col gap-4">
            <Link
              to="/"
              className="font-display text-white hover:text-accent py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <button
              onClick={() => {
                openCustomOrderWhatsApp();
                setIsMenuOpen(false);
              }}
              className="font-display text-white bg-secondary py-2 rounded-full hover:bg-secondary-dark transition-colors"
            >
              Custom Order
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;