import React from 'react';
import { Cake, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <Cake className="h-8 w-8 text-primary-300 mr-2" />
              <span className="font-pacifico text-2xl text-white">90sCake</span>
            </div>
            <p className="mt-4 max-w-xs text-primary-200">
              Delicious handcrafted cakes with a nostalgic 90s twist. Making your celebrations sweeter since 2023.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center hover:bg-primary-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center hover:bg-primary-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center hover:bg-primary-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-primary-200 hover:text-white">Home</a></li>
                <li><a href="#gallery" className="text-primary-200 hover:text-white">Cakes</a></li>
                <li><a href="#pound-cakes" className="text-primary-200 hover:text-white">Pound Cakes</a></li>
                <li><a href="#contact" className="text-primary-200 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-primary-200 hover:text-white">Birthday Cakes</a></li>
                <li><a href="#" className="text-primary-200 hover:text-white">Wedding Cakes</a></li>
                <li><a href="#" className="text-primary-200 hover:text-white">Custom Orders</a></li>
                <li><a href="#" className="text-primary-200 hover:text-white">Corporate Events</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Visit Us</h3>
              <address className="not-italic text-primary-200">
                123 Cake Street<br />
                Sweet Lane, Dhaka<br />
                Bangladesh<br /><br />
                <span className="block mt-1">Open: 9 AM - 8 PM</span>
              </address>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-300 text-sm">
            © 2023 90sCake. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li><a href="#" className="text-primary-300 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-primary-300 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;