import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Cake, MessageCircle, Menu, X } from "lucide-react";
import { sendCustomCakeInquiry } from "../utils/whatsapp";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold mb-4 md:mb-0"
            >
              <Cake size={32} />
              <span className="font-extrabold tracking-wider">90sCake</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className="px-2 py-1 text-white hover:text-pink-200 transition-colors duration-200"
            >
              Home
            </NavLink>
            <NavLink
              to="/pound-cakes"
              className="px-2 py-1 text-white hover:text-pink-200 transition-colors duration-200"
            >
              Pound Cakes
            </NavLink>
            <button
              onClick={sendCustomCakeInquiry}
              className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-200"
            >
              <MessageCircle size={18} className="mr-2" />
              Custom Order
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-pink-600 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block px-3 py-2 rounded-md text-pink-600 font-medium"
                : "block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition-colors duration-200"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/pound-cakes"
            className={({ isActive }) =>
              isActive
                ? "block px-3 py-2 rounded-md text-pink-600 font-medium"
                : "block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-pink-600 transition-colors duration-200"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Pound Cakes
          </NavLink>
          <button
            onClick={() => {
              sendCustomCakeInquiry();
              setIsMenuOpen(false);
            }}
            className="w-full flex items-center justify-center px-3 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-colors duration-200"
          >
            <MessageCircle size={18} className="mr-2" />
            Custom Order
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
