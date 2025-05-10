import { useEffect, useState } from 'react';
import PriceTooltip from '../ui/PriceTooltip';
import { useCakes } from '../../context/CakeContext';

const CakeCard = ({ cake }) => {
  const { openCakeModal } = useCakes();
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  // Choose the first image or a placeholder
  const imageUrl = cake.images && cake.images.length > 0 
    ? `/cakes/${cake.images[0]}`
    : 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  
  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
  }, [cake]);

  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      onClick={() => openCakeModal(cake.id)}
    >
      <div className="aspect-square overflow-hidden">
        {isLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-400 border-t-transparent"></div>
          </div>
        )}
        <img
          src={imageUrl}
          alt={cake.name}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${isLoading && !imageError ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
        />
        {imageError && (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
            <span>Image unavailable</span>
          </div>
        )}
      </div>
      
      <div className="relative p-4">
        {/* 90s-style decorative elements */}
        <div className="absolute -right-4 -top-12 h-16 w-16 rotate-45 bg-gradient-to-r from-purple-300 to-pink-300 opacity-20"></div>
        <div className="absolute -left-2 -top-4 h-8 w-8 rounded-full bg-teal-300 opacity-20"></div>
        
        <h3 className="mb-1 font-bold text-gray-900 md:text-lg">{cake.name}</h3>
        <p className="mb-2 text-sm text-gray-600 line-clamp-2">{cake.description}</p>
        
        <div className="mt-2">
          <PriceTooltip prices={cake.prices} />
        </div>
        
        <div className="mt-2 text-xs text-purple-700">
          <span className="inline-block">Click for details</span>
        </div>
      </div>
    </div>
  );
};

export default CakeCard;