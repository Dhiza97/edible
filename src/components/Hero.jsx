"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["burger.png", "spag.png", "taco.png"];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden px-5 lg:px-8 xl:px-[8%] pt-24">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="bg_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-row-reverse items-center justify-center">
        {/* Images on the Right Side with Fade Animation */}
        <div className="w-1/2 transform">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-white w-1/2">
          <h1 className="text-6xl font-semibold font-Fruktur">
            Welcome to <span className="text-primaryColor font-Fruktur">Edible</span> – A
            Taste of Perfection
          </h1>
          <p className="text-base mt-6">
            Fresh ingredients, bold flavors, and unforgettable meals. Indulge in
            a dining experience crafted with passion.
          </p>

          <button className="btn-order px-7 py-4 mt-6 text-primaryColor rounded-full neon-pulse hover:text-white">ORDER NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
