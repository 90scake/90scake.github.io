import { useState, useEffect } from "react";
import CakeCard from "../components/CakeCard";
import BasicCakeOrder from "../components/BasicCakeOrder";

const Home = () => {
  const [cakes, setCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showBasicCakeModal, setShowBasicCakeModal] = useState(false);

  useEffect(() => {
    fetch("/data/cakes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cakes");
        }
        return response.json();
      })
      .then((data) => {
        // Filter out pound cakes for the home page
        const filteredCakes = data.filter(
          (cake) => cake.category !== "poundcake"
        );
        setCakes(filteredCakes);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Delicious Cakes for Every Occasion
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Hand-crafted with love using the finest ingredients. Make your
                special moments even more memorable.
              </p>
              <div
                className="bg-white rounded-lg shadow-md p-4 border-l-4 border-pink-500 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => setShowBasicCakeModal(true)}
              >
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Basic Vanilla Cake</span>{" "}
                  starting at
                  <span className="font-bold text-pink-600 mx-1">800 BDT</span>
                </p>
                <button className="text-pink-600 font-medium hover:text-pink-700 transition-colors duration-200">
                  Order Now →
                </button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg"
                alt="Beautiful Birthday Cake"
                className="rounded-lg shadow-lg w-full h-auto max-h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cake listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Signature Cakes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </div>

      {/* Basic Cake Order Modal */}
      {showBasicCakeModal && (
        <BasicCakeOrder onClose={() => setShowBasicCakeModal(false)} />
      )}
    </div>
  );
};

export default Home;
