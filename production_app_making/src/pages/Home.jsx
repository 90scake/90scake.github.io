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
      <div className="bg-gradient-to-r from-pink-200 to-purple-200 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Delicious Cakes for Every Occasion
              </h1>

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
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/images/showcase/showpic.jpeg"
                alt="Basic Vanilla Cake"
                className="h-64 md:h-80 object-cover rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
            {/* Decorative elements for 90s feel */}
            <div className="absolute top-20 left-4 w-16 h-16 bg-yellow-500 rounded-full opacity-50"></div>
            <div className="absolute top-15 right-10 w-12 h-12 bg-teal-300 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-pink-400 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>

      {/* Cake listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Cake Collection
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
