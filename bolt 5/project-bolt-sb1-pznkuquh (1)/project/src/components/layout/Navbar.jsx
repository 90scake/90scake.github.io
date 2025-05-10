import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import logo from '../../assets/logo.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center"
        >
          <img 
            src={logo || '/logo-placeholder.svg'} 
            alt="90sCake Logo" 
            className="h-10 mr-2"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40x40?text=90sCake'
              e.target.onerror = null
            }} 
          />
          <span className={`font-serif text-xl font-bold ${scrolled ? 'text-primary-900' : 'text-primary-700'}`}>
            90sCake
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `font-medium ${scrolled ? 'text-secondary-800' : 'text-secondary-700'} 
              hover:text-primary-600 transition-colors duration-200 
              ${isActive ? 'border-b-2 border-primary-500' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/pound-cakes" 
            className={({ isActive }) => 
              `font-medium ${scrolled ? 'text-secondary-800' : 'text-secondary-700'} 
              hover:text-primary-600 transition-colors duration-200 
              ${isActive ? 'border-b-2 border-primary-500' : ''}`
            }
          >
            Pound Cakes
          </NavLink>
          <a 
            href="https://wa.me/8801XXXXXXXXX?text=Hi%20there%2C%20I'm%20interested%20in%20ordering%20a%20customized%20cake" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Custom Order
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-secondary-800 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FiX size={24} />
          ) : (
            <FiMenu size={24} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `py-2 px-4 font-medium text-secondary-800 hover:bg-primary-50 rounded ${
                isActive ? 'bg-primary-50 text-primary-700' : ''
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/pound-cakes" 
            className={({ isActive }) => 
              `py-2 px-4 font-medium text-secondary-800 hover:bg-primary-50 rounded ${
                isActive ? 'bg-primary-50 text-primary-700' : ''
              }`
            }
          >
            Pound Cakes
          </NavLink>
          <a 
            href="https://wa.me/8801XXXXXXXXX?text=Hi%20there%2C%20I'm%20interested%20in%20ordering%20a%20customized%20cake" 
            target="_blank" 
            rel="noopener noreferrer"
            className="py-2 px-4 bg-primary-500 text-white rounded text-center font-medium"
          >
            Custom Order
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar