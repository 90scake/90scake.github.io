import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { sendWhatsAppMessage } from "../utils/whatsapp";

const BasicCakeOrder = ({ onClose }) => {
  const [basicCake, setBasicCake] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    deliveryDate: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch basic cake data
  useEffect(() => {
    fetch("/data/basicCake.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load basic cake data");
        }
        return response.json();
      })
      .then((data) => {
        setBasicCake(data);
        // Set default values
        if (data.flavors.length > 0) setSelectedFlavor(data.flavors[0].id);
        if (data.designs.length > 0) setSelectedDesign(data.designs[0].id);
        setTotalPrice(data.basePrice);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (basicCake) {
      calculateTotalPrice();
    }
  }, [selectedFlavor, basicCake]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "flavor") {
      setSelectedFlavor(value);
    } else if (name === "design") {
      setSelectedDesign(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error when field is being edited
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const calculateTotalPrice = () => {
    if (!basicCake) return;

    let price = basicCake.basePrice;

    // Add flavor price adjustment
    const selectedFlavorObj = basicCake.flavors.find(
      (f) => f.id === selectedFlavor
    );
    if (selectedFlavorObj && "priceAdjustment" in selectedFlavorObj) {
      price += selectedFlavorObj.priceAdjustment;
    }

    setTotalPrice(price);
  };

  const getFlavorName = (id) => {
    if (!basicCake) return "";
    return basicCake.flavors.find((f) => f.id === id)?.name || "";
  };

  const getDesignName = (id) => {
    if (!basicCake) return "";
    return basicCake.designs.find((d) => d.id === id)?.name || "";
  };

  const getDesignImage = (id) => {
    if (!basicCake) return "";
    return basicCake.designs.find((d) => d.id === id)?.image || "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!formData.deliveryDate.trim()) {
      newErrors.deliveryDate = "Delivery date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!basicCake) return;

    if (validateForm()) {
      const orderDetails = {
        cakeId: basicCake.id,
        cakeName: basicCake.name,
        flavorId: selectedFlavor,
        flavorName: getFlavorName(selectedFlavor),
        pound: 1, // Basic cake is always 1 pound
        price: totalPrice,
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        deliveryDate: formData.deliveryDate,
        designId: selectedDesign,
        designName: getDesignName(selectedDesign),
      };

      // Send WhatsApp message with order details
      sendWhatsAppMessage(orderDetails, getDesignImage(selectedDesign));
      onClose();
    }
  };

  // Get tomorrow's date for minimum delivery date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Error</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <p className="text-red-500">{error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!basicCake) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Order {basicCake.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-700">
              Customize your basic cake with your preferred flavor and design.
              Our standard cake is 1 pound and perfect for small celebrations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">
                1. Select Your Flavor
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {basicCake.flavors.map((flavor) => (
                  <label
                    key={flavor.id}
                    className={`flex items-center justify-between border rounded-md p-3 cursor-pointer transition-all duration-200 ${
                      selectedFlavor === flavor.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="flavor"
                        value={flavor.id}
                        checked={selectedFlavor === flavor.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-medium">{flavor.name}</span>
                    </div>
                    {flavor.priceAdjustment ? (
                      <span className="text-sm text-gray-600">
                        +{flavor.priceAdjustment} BDT
                      </span>
                    ) : null}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">
                2. Choose Your Design
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {basicCake.designs.map((design) => (
                  <label
                    key={design.id}
                    className={`relative border rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${
                      selectedDesign === design.id
                        ? "border-pink-500 ring-2 ring-pink-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="design"
                      value={design.id}
                      checked={selectedDesign === design.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="h-48">
                      <img
                        src={design.image}
                        alt={design.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-white">
                      <span className="font-medium">{design.name}</span>
                    </div>
                    {selectedDesign === design.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Price:</span>
                <span className="text-xl font-bold text-pink-600">
                  {totalPrice} BDT
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">
                3. Your Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
                      errors.customerName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., 017........"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="deliveryDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    min={getTomorrowDate()}
                    className={`w-full p-2 border rounded-md focus:ring-pink-500 focus:border-pink-500 ${
                      errors.deliveryDate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.deliveryDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.deliveryDate}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition-colors duration-200"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicCakeOrder;
