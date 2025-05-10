import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiTwitter, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-chocolate-700 text-vanilla-200 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4 text-vanilla-100">90sCake</h3>
            <p className="mb-4">
              Delicious custom cakes for all occasions. From birthdays to weddings, 
              we craft beautiful, delicious cakes that will make your celebration unforgettable.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-vanilla-200 hover:text-primary-300 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-vanilla-200 hover:text-primary-300 transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-vanilla-200 hover:text-primary-300 transition-colors"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4 text-vanilla-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pound-cakes" className="hover:text-primary-300 transition-colors">
                  Pound Cakes
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/8801XXXXXXXXX?text=Hi%20there%2C%20I'm%20interested%20in%20ordering%20a%20customized%20cake" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-300 transition-colors"
                >
                  Custom Order
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4 text-vanilla-100">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-2 flex-shrink-0" />
                <span>123 Cake Street, Gulshan, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 flex-shrink-0" />
                <a 
                  href="tel:+8801XXXXXXXXX" 
                  className="hover:text-primary-300 transition-colors"
                >
                  +880 1XX XXXX XXX
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2 flex-shrink-0" />
                <a 
                  href="mailto:info@90scake.com" 
                  className="hover:text-primary-300 transition-colors"
                >
                  info@90scake.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-chocolate-600 mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} 90sCake. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer