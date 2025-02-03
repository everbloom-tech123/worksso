import React, { useState, useEffect } from "react";
import { BsChevronCompactRight } from "react-icons/bs";

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
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically change slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const categories = [
    {
      name: "Plumbing",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3063/3063481.png",
    },
    {
      name: "Cleaning",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/2200/2200210.png",
    },
    {
      name: "Electrical",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/3159/3159370.png",
    },
    {
      name: "Carpentry",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/919/919655.png",
    },
    {
      name: "Moving",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/679/679922.png",
    },
    {
      name: "Painting",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/5767/5767413.png",
    },
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

      {/* Categories */}
      <section className="px-16 mb-10">
        <div className="flex items-center justify-between px-10 mb-4">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <button className="flex items-center space-x-1 text-blue-500">
            <span>View all</span>
            <BsChevronCompactRight />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="p-4 text-center border rounded-lg shadow-lg"
            >
              <div className="flex items-center justify-center h-16 mb-2">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="object-contain w-16 h-16"
                />
              </div>
              <p className="font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Create own Services */}
      <section className="p-6 text-center bg-blue-100 ">
        <h2 className="mb-4 text-4xl font-bold"> Post your Service free.</h2>
        <button className="px-6 py-3 text-white bg-blue-500 rounded-md">
          Click Here
        </button>
      </section>
    </div>
  );
};

export default HomePage;
