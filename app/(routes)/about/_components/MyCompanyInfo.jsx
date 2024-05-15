import React from 'react';
import Image from 'next/image'; // Import for optimized images

const AboutUs = () => {
  return (
    <div className="sm:flex items-center max-w-screen-xl">
      <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
          <Image className='rounded-full'
            src={"/about.png"} 
            alt="About Us Image"
            width={400} 
            height={200} 
            layout="responsive" 
            priority 
          />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
          <h2 className="my-4 font-bold text-3xl sm:text-4xl">
            About <span className="text-indigo-600">Our Company</span>
          </h2>
          <p className="text-gray-700">
          Welcome to <span className='text-primary'>A1-Maids Cleaning Service LLC</span>, where we redefine clean living. With a passion for pristine spaces and a commitment to exceptional service, we are your trusted partner in maintaining the cleanliness and comfort of your home. Our team of dedicated professionals brings years of expertise and a meticulous attention to detail to every cleaning project, ensuring that your space is not just clean, but truly revitalized. From regular maintenance to deep cleans, we tailor our services to meet your unique needs, leaving no corner untouched. Experience the difference with  <span className='text-primary'>A1-Maids Cleaning Service LLC</span> – where cleanliness meets perfection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
