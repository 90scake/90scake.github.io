import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Reset to first image when images change
    setCurrentIndex(0);
    setIsLoading(true);
  }, [images]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsLoading(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsLoading(true);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
    setIsLoading(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!images || images.length === 0) {
    return <div className="h-64 bg-gray-200 flex items-center justify-center">No images available</div>;
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        )}
        <img
          src={images[currentIndex]}
          alt={`Cake preview ${currentIndex + 1}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
        />
        
        {/* Navigation arrows */}
        <button 
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 p-2 rounded-r-lg text-white transition-all duration-200"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 p-2 rounded-l-lg text-white transition-all duration-200"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Thumbnail navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-pink-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;