import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const HomePage = () => {
  const slides = [
    {
      url: "https://blog.bayiq.com/hubfs/Automotive%20Technician%20Tool%20Box.jpeg",
    },
    {
      url: "https://images.prismic.io/houzz/2498f478-e7f6-4a0e-8fa0-66f20a0be42f_AdobeStock_358617383.jpeg?auto=compress,format",
    },
    {
      url: "https://mccoymart.com/post/wp-content/uploads/The-Top-10-Benefits-Of-Hiring-A-Professional-Carpenter.jpg",
    },
    {
      url: "https://chamblissplumbing.com/wp-content/webp-express/webp-images/uploads/2023/03/whats-a-plumber-1.jpg.webp",
    },
    {
      url: "https://www.truckandmovers.lk/images/slides/need-it-moved-.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous slide
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Function to go to the next slide
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Automatically change slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="pt-[64px] max-w-[1740px] h-[600px] w-full m-auto py-16 px-4 relative">
      {/* Slide */}
      <div
        style={{
          backgroundImage: `url(${slides[currentIndex].url})`,
        }}
        className="w-full h-[500px] duration-500 bg-center bg-cover rounded-2xl"
      ></div>

      {/* Dots */}
      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full mx-2 cursor-pointer ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
