export const sendWhatsAppMessage = (orderDetails, imageUrl) => {
  const phoneNumber = "+8801704159550"; // Replace with your actual WhatsApp number

  let message = `*New Order*\n\n`;
  message += `*Product*: ${orderDetails.cakeName}\n`;
  message += `*Product ID*: ${orderDetails.cakeId}\n`;
  message += `*Flavor*: ${orderDetails.flavorName}\n`;
  message += `*Size*: ${orderDetails.pound} pound\n`;
  message += `*Price*: ${orderDetails.price} BDT\n\n`;
  message += `*Customer*: ${orderDetails.customerName}\n`;
  message += `*Phone*: ${orderDetails.phone}\n`;
  message += `*Email*: ${orderDetails.email}\n`;
  message += `*Delivery Date*: ${orderDetails.deliveryDate}\n\n`;

  if (orderDetails.designId) {
    message += `*Design*: ${orderDetails.designName}\n`;
  }

  // Add image URL if available
  if (imageUrl) {
    message += `\n*Cake Image*: ${window.location.origin}${imageUrl}\n`;
  }

  // Encode the message for the URL
  const encodedMessage = encodeURIComponent(message);

  // Create the WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open in a new window/tab
  window.open(whatsappUrl, "_blank");
};

export const sendCustomCakeInquiry = () => {
  const phoneNumber = "+8801704159550"; // Replace with your actual WhatsApp number
  const message = encodeURIComponent(
    "Hello, I'm interested in ordering a customized cake. Can you please help me?"
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");
};
