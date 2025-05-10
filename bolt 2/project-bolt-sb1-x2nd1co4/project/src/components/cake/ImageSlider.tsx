import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageSliderProps {
  images: string[];
  id: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, id }) => {
  return (
    <div className="mb-6">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-xl overflow-hidden"
        id={`cake-slider-${id}`}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Cake image ${index + 1}`}
              className="w-full h-64 md:h-80 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;