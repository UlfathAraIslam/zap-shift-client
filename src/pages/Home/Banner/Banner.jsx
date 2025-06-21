import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner1 from '../../../assets/banner/banner1.png'
import banner2 from '../../../assets/banner/banner2.png'
import banner3 from '../../../assets/banner/banner3.png'
const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        interval={3000}
        transitionTime={800}
        className="rounded-xl overflow-hidden"
      >
        <div>
          <img src={banner1} alt="Slide 1" className="object-cover" />
          <div className="absolute bottom-5 left-5 bg-black bg-opacity-50 text-white p-4 rounded">
            <h2 className="text-xl md:text-3xl font-bold">Welcome to Our Platform</h2>
            <Link to="/about" className="btn btn-sm mt-2">Learn More</Link>
          </div>
        </div>

        <div>
          <img src={banner2} alt="Slide 2" className="object-cover" />
        </div>

        <div>
          <img src={banner3} alt="Slide 3" className="object-cover" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
