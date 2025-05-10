import { OrderDetails } from '../types';
import { Cake } from '../types';

export const sendWhatsAppMessage = (
  orderDetails: OrderDetails,
  cakeInfo?: Cake,
  totalPrice?: number
) => {
  const whatsappNumber = '1234567890'; // Replace with your WhatsApp number
  
  let message = 'Hello! I would like to place an order for a cake:\n\n';
  
  if (cakeInfo) {
    message += `*Cake:* ${cakeInfo.name}\n`;
    message += `*Flavor:* ${orderDetails.selectedFlavor}\n`;
    message += `*Size:* ${orderDetails.selectedSize}\n`;
    message += `*Price:* ${totalPrice} BDT\n\n`;
  } else if (orderDetails.selectedDesign !== null) {
    message += `*Basic Cake Order*\n`;
    message += `*Design #:* ${orderDetails.selectedDesign}\n`;
    message += `*Flavor:* ${orderDetails.selectedFlavor}\n`;
    message += `*Size:* ${orderDetails.selectedSize}\n\n`;
  }
  
  message += `*Name:* ${orderDetails.name}\n`;
  message += `*Phone:* ${orderDetails.phone}\n`;
  message += `*Address:* ${orderDetails.address}\n`;
  message += `*Delivery Date:* ${orderDetails.deliveryDate}\n`;
  
  if (orderDetails.specialInstructions) {
    message += `\n*Special Instructions:* ${orderDetails.specialInstructions}\n`;
  }
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};

export const openCustomOrderWhatsApp = () => {
  const whatsappNumber = '1234567890'; // Replace with your WhatsApp number
  const message = encodeURIComponent('Hello! I would like to order a customized cake. Can you help me?');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  
  window.open(whatsappUrl, '_blank');
};