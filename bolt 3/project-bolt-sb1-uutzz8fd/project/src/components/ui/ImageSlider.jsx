import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ images, alt = "Product Image" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Placeholder images when actual images aren't available
  const placeholderImages = [
    "https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/264939/pexels-photo-264939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ];

  // Get the image sources (either provided images or placeholders)
  const imageSources = images?.length > 0 
    ? images.map(img => `/cakes/${img}`) 
    : placeholderImages;

  useEffect(() => {
    // Reset current index when images change
    setCurrentIndex(0);
    setIsLoading(true);
  }, [images]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? imageSources.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === imageSources.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-100">
      <div className="relative h-64 md:h-80 w-full">
        <img
          src={imageSources[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.target.src = placeholderImages[currentIndex % placeholderImages.length];
            setIsLoading(false);
          }}
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-400 border-t-transparent"></div>
          </div>
        )}
      </div>
      
      {imageSources.length > 1 && (
        <>
          <button 
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 shadow-md transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 shadow-md transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
          
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {imageSources.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-pink-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;