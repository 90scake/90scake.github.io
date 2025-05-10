import { useState, useEffect } from "react";
import CakeCard from "../components/CakeCard";

const PoundCakes = () => {
  const [poundCakes, setPoundCakes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/poundCakes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch pound cakes");
        }
        return response.json();
      })
      .then((data) => {
        // Filter for pound cakes
        const filteredCakes = data.filter(
          (cake) => cake.category === "poundcake"
        );
        setPoundCakes(filteredCakes);
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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Pound Cakes Collection
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Rich, buttery, and delicious. Our pound cakes are perfect for
            everyday indulgence or as a thoughtful gift for someone special.
          </p>
        </div>
      </div>

      {/* Pound Cakes listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {poundCakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>

        {poundCakes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No pound cakes available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoundCakes;
