import { Section } from "lucide-react";
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

  const categories = [
    {
      name: "Plumbing",
      imageUrl:
        "https://res.cloudinary.com/your-cloud-name/image/upload/plumbing.jpg",
    },
    {
      name: "Cleaning",
      imageUrl:
        "https://res.cloudinary.com/your-cloud-name/image/upload/cleaning.jpg",
    },
    // Add more categories here
  ];

  return (
    <div className="items-center justify-center w-full overflow-hidden">
      <div className="pt-[64px] max-w-[1740px] h-[600px] w-full m-auto py-16 px-4 relative mb-8 border-spacing-5">
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

      {/* {Categories} */}

      <section className="px-16 mb-10">
        <div className="flex items-center justify-between px-10 mb-4">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <button className="flex items-center space-x-1 text-blue-500">
            <span>View all</span>
            <BsChevronCompactRight />
          </button>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {categories.map((category) => (
            <div key={category} className="p-4 text-center border rounded-lg">
              <div className="h-16 mb-2 bg-gray-200">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="object-cover w-full h-16 mb-2 rounded-lg"
                />
              </div>
              <p>{category}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
