"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["burger.png", "spag.png", "taco.png"];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensures rendering happens only after hydration
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMounted]);

  if (!isMounted) return null; // Prevents mismatched server/client output

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

      <div className="flex flex-col lg:flex-row items-center justify-center">
        {/* Images on the Right Side with Fade Animation */}
        <div className="w-full lg:w-1/2 transform">
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
        <motion.div
          className="relative z-10 flex flex-col items-center lg:items-start justify-center h-full text-white w-full lg:w-1/2 px-5"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl font-semibold font-Fruktur"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Welcome to{" "}
            <span className="text-primaryColor font-Fruktur">Edible</span> – A
            Taste of Perfection
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Fresh ingredients, bold flavors, and unforgettable meals. Indulge in
            a dining experience crafted with passion.
          </motion.p>

          <motion.button
            className="btn-order px-7 py-4 mt-6 text-primaryColor rounded-full neon-pulse hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ORDER NOW
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;