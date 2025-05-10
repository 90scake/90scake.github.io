import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-display text-xl mb-4">90sCake</h3>
            <p className="text-white/80 mb-4">
              Delicious retro-themed cakes made with love for all your special occasions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xl mb-4">Contact Us</h3>
            <p className="text-white/80 mb-2">123 Cake Street, Dhaka</p>
            <p className="text-white/80 mb-2">Phone: +1234567890</p>
            <p className="text-white/80">Email: hello@90scake.com</p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-xl mb-4">Opening Hours</h3>
            <p className="text-white/80 mb-2">Monday - Friday: 9am - 7pm</p>
            <p className="text-white/80 mb-2">Saturday: 10am - 6pm</p>
            <p className="text-white/80">Sunday: 11am - 5pm</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} 90sCake. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;