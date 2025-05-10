import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Cake, OrderDetails } from "../types";
import ImageSlider from "./ImageSlider";
import OrderForm from "./OrderForm";
import { sendWhatsAppMessage } from "../utils/whatsapp";

interface CakeModalProps {
  cake: Cake;
  onClose: () => void;
}

const CakeModal: React.FC<CakeModalProps> = ({ cake, onClose }) => {
  const [step, setStep] = useState<"details" | "order">("details");
  const [selectedFlavor, setSelectedFlavor] = useState(
    cake.flavors[0]?.id || ""
  );
  const [selectedPound, setSelectedPound] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  // Calculate current price based on selections
  const calculatePrice = (): number => {
    const priceObj = cake.prices.find(
      (p) => p.flavorId === selectedFlavor && p.pound === selectedPound
    );
    return priceObj?.price || 0;
  };

  const getFlavorName = (id: string): string => {
    return cake.flavors.find((f) => f.id === id)?.name || "";
  };

  const handleFlavorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFlavor(e.target.value);
  };

  const handlePoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPound(Number(e.target.value));
  };

  const handleOrderSubmit = (orderData: Partial<OrderDetails>) => {
    const orderDetails: OrderDetails = {
      cakeId: cake.id,
      cakeName: cake.name,
      flavorId: selectedFlavor,
      flavorName: getFlavorName(selectedFlavor),
      pound: selectedPound,
      price: calculatePrice(),
      customerName: orderData.customerName || "",
      email: orderData.email || "",
      phone: orderData.phone || "",
      deliveryDate: orderData.deliveryDate || "",
    };

    // Send WhatsApp message with order details
    sendWhatsAppMessage(orderDetails, cake.images[0]);
    onClose();
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        {/* Modal header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{cake.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-4">
          {step === "details" ? (
            <div className="space-y-6">
              <ImageSlider images={cake.images} />

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{cake.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {cake?.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Notes</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {cake.notes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Price List</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left pb-2">Flavor</th>
                        <th className="text-left pb-2">Size</th>
                        <th className="text-right pb-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cake.prices.map((price, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="py-2">
                            {getFlavorName(price.flavorId)}
                          </td>
                          <td className="py-2">{price.pound} pound</td>
                          <td className="text-right py-2">{price.price} BDT</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Place Your Order</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="flavor"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Choose Flavor
                    </label>
                    <select
                      id="flavor"
                      value={selectedFlavor}
                      onChange={handleFlavorChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    >
                      {cake.flavors.map((flavor) => (
                        <option key={flavor.id} value={flavor.id}>
                          {flavor.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="pound"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Choose Size
                    </label>
                    <select
                      id="pound"
                      value={selectedPound}
                      onChange={handlePoundChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                    >
                      {Array.from(new Set(cake.prices.map((p) => p.pound))).map(
                        (pound) => (
                          <option key={pound} value={pound}>
                            {pound} pound
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Selected: {getFlavorName(selectedFlavor)}, {selectedPound}{" "}
                      pound
                    </p>
                    <p className="text-xl font-bold text-pink-600 mt-1">
                      Total: {calculatePrice()} BDT
                    </p>
                  </div>

                  <button
                    onClick={() => setStep("order")}
                    className="px-6 py-2 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition-colors duration-200"
                  >
                    Continue to Order
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <OrderForm
              onBack={() => setStep("details")}
              onSubmit={handleOrderSubmit}
              cakeName={cake.name}
              flavorName={getFlavorName(selectedFlavor)}
              pound={selectedPound}
              price={calculatePrice()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CakeModal;
