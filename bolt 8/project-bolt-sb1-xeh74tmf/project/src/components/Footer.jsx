import { Cake, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <Cake className="h-6 w-6 text-pink-600 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">90sCake</h3>
            </div>
            <p className="text-gray-600">
              Delicious cakes made with love. Perfect for birthdays, weddings, and special occasions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <a href="/" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">Home</a>
            <a href="/pound-cakes" className="text-gray-600 hover:text-pink-600 transition-colors duration-200">Pound Cakes</a>
            <button 
              onClick={() => {
                // Send custom cake inquiry
                const phoneNumber = "1234567890";
                const message = encodeURIComponent("Hello, I'm interested in ordering a customized cake. Can you please help me?");
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
              }}
              className="text-left text-gray-600 hover:text-pink-600 transition-colors duration-200"
            >
              Custom Orders
            </button>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <div className="flex items-center">
              <Phone size={18} className="text-pink-600 mr-2" />
              <span className="text-gray-600">+880 1712 345678</span>
            </div>
            <div className="flex items-center">
              <Mail size={18} className="text-pink-600 mr-2" />
              <span className="text-gray-600">hello@90scake.com</span>
            </div>
            <p className="text-gray-600">
              123 Cake Street, Dhaka, Bangladesh
            </p>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 90sCake. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;