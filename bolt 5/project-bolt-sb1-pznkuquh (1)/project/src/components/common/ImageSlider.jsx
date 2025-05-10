import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const ImageSlider = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600x400?text=Cake+Image'
    e.target.onerror = null
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="relative h-full">
      <div className="h-full">
        <img
          src={images[currentIndex]}
          alt={`${name} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
            aria-label="Previous image"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
            aria-label="Next image"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-4' : 'bg-white/60'
                }`}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageSlider