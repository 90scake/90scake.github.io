import { Cake, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <Cake className="h-6 w-6 text-pink-100 mr-2" />
              <h3 className="text-xl font-bold text-gray-100">90sCake</h3>
            </div>
            <p className="text-white">
              Delicious cakes made with love. Perfect for birthdays, weddings,
              and special occasions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61550595911246"
                className="text-gray-100 hover:text-pink-200 transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Quick Links</h3>
            <a
              href="#"
              className="text-gray-100 hover:text-pink-100 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/pound-cakes"
              className="text-gray-100 hover:text-pink-100 transition-colors duration-200"
            >
              Pound Cakes
            </a>
            <button
              onClick={() => {
                // Send custom cake inquiry
                const phoneNumber = "+8801704159550";
                const message = encodeURIComponent(
                  "Hello, I'm interested in ordering a customized cake. Can you please help me?"
                );
                window.open(
                  `https://wa.me/${phoneNumber}?text=${message}`,
                  "_blank"
                );
              }}
              className="text-left text-gray-100 hover:text-pink-100 transition-colors duration-200"
            >
              Custom Orders
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Contact Us</h3>
            <div className="flex items-center">
              <Phone size={18} className="text-pink-100 mr-2" />
              <span className="text-gray-100">+880 1704159550</span>
            </div>
            <div className="flex items-center">
              <Mail size={18} className="text-pink-100 mr-2" />
              <span className="text-gray-100">90s.cake.bd@gmail.com</span>
            </div>
            <p className="text-gray-100">Puran Kochukhet, Dhaka, Bangladesh</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-100 text-sm">
            &copy; {new Date().getFullYear()} 90sCake. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
