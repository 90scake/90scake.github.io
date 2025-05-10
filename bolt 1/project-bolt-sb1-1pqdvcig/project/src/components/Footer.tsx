import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">90sCake</h3>
            <p className="mb-4">Bringing you delicious cakes with a touch of 90s nostalgia since 2023.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-pink-300 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-pink-300 transition-colors duration-200">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <span>hello@90scake.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>123 Cake Street, Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Opening Hours</h3>
            <ul className="space-y-1">
              <li>Monday - Friday: 9AM - 6PM</li>
              <li>Saturday: 10AM - 4PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-700 mt-8 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} 90sCake. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;