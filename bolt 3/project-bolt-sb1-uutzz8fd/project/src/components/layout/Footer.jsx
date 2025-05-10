import { Cake, Heart, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 bg-gradient-to-r from-pink-100 to-purple-100 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-2xl font-bold text-pink-600">
              <Cake size={28} />
              <span className="font-serif">90sCake</span>
            </div>
            <p className="mt-4 max-w-md text-gray-600">
              Bringing the nostalgic flavors of the 90s to your celebrations. Our handcrafted cakes
              are made with love and the highest quality ingredients.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                className="rounded-full bg-pink-600 p-2 text-white transition-colors hover:bg-pink-700"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-pink-600 p-2 text-white transition-colors hover:bg-pink-700"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="rounded-full bg-pink-600 p-2 text-white transition-colors hover:bg-pink-700"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/" className="text-gray-600 transition-colors hover:text-pink-600">Home</a>
              </li>
              <li>
                <a href="/cakes" className="text-gray-600 transition-colors hover:text-pink-600">Cakes</a>
              </li>
              <li>
                <a href="/basic-cake" className="text-gray-600 transition-colors hover:text-pink-600">Basic Cake</a>
              </li>
              <li>
                <a 
                  href="https://wa.me/+8801712345678?text=Hi%20there!%20I%20want%20to%20order%20a%20customized%20cake."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-pink-600"
                >
                  Custom Order
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">Address:</span> 123 Cake Street, Dhaka, Bangladesh
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Phone:</span> +880 171 234 5678
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Email:</span> hello@90scake.com
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Hours:</span> 9:00 AM - 6:00 PM, Every Day
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 py-6 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} 90sCake. All rights reserved. Made with <Heart size={14} className="inline text-pink-600" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;