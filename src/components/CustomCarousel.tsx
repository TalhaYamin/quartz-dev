import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CustomCarouselProps {
    images: string[]
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ images }) => {

    return (
        <Carousel className='border border-pink-600'>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`image ${index + 1}`} />
                </div>
            ))}
        </Carousel>
    );
};

export default CustomCarousel;
