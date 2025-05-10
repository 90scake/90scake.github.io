import React from 'react';
import { PhoneCall, Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const whatsappNumber = '8801700000000';
    const message = encodeURIComponent('Hello! I would like to order a customized cake.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };
  
  return (
    <section id="contact" className="py-16 bg-pastel-purple/10">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="title-section text-center">Contact Us</h2>
          <p className="subtitle-section text-center">
            Have a special occasion in mind? Get in touch for custom cake orders, special designs, or any questions.
          </p>
          
          <div className="bg-white shadow-md rounded-xl overflow-hidden mt-8">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-pacifico text-primary-600 mb-4">Get in Touch</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <PhoneCall className="h-5 w-5 text-primary-600" />
                      </div>
                      <span className="text-gray-700">+880 17 0000 0000</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                        <Mail className="h-5 w-5 text-primary-600" />
                      </div>
                      <span className="text-gray-700">info@90scake.com</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button 
                      className="btn-primary w-full justify-center"
                      onClick={handleWhatsAppClick}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Contact on WhatsApp
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-pacifico text-primary-600 mb-4">Custom Orders</h3>
                  <p className="text-gray-700 mb-4">
                    Need a special cake for a birthday, wedding, or any celebration? We specialize in custom designs 
                    tailored to your exact requirements.
                  </p>
                  <div className="bg-pastel-yellow/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">How It Works:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700">
                      <li>Contact us via WhatsApp or email</li>
                      <li>Share your cake ideas and requirements</li>
                      <li>We'll discuss design options and pricing</li>
                      <li>Approve the design and place your order</li>
                      <li>Enjoy your custom cake!</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;