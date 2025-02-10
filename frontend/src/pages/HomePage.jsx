import React, { useState, useEffect } from "react";
import { BsChevronCompactRight } from "react-icons/bs";
import { serviceStore } from "../store/serviceStore";
import { Star, Phone } from "lucide-react";
import { BsStarFill } from "react-icons/bs"; // Bootstrap Star Icon
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { services, fetchAllServices } = serviceStore();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchAllServices(1, 10).then(() => {
      console.log("Services fetched:", services); // Debugging
    });
  }, []);

  const loadMore = () => {
    fetchAllServices(currentPage + 1, 10); // Fetch next page
  };

  const handleNavigateToProfile = () => {
    navigate("/profile"); // Navigates to Account Setting page
  };

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

      <div className="w-full p-6 mt-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 md:text-left">
          Services
        </h1>
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
          {services?.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className="flex p-6 transition-all bg-gray-100 border border-transparent rounded-lg shadow-sm hover:border-blue-500"
              >
                {/* Service Image */}
                <img
                  src={service.images?.[0] || "https://via.placeholder.com/150"}
                  alt={service.title}
                  className="object-cover w-32 h-32 mr-6 rounded-lg"
                />

                {/* Service Details */}
                <div className="flex-1">
                  <h2 className="text-lg font-bold">
                    {service.userId?.fullName || "Unknown User"}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center my-2 text-yellow-500">
                    {Array(service.rating || 5)
                      .fill()
                      .map((_, i) => (
                        <BsStarFill key={i} size={16} />
                      ))}
                    <span className="ml-2 text-gray-500">
                      ({service.reviews || 0})
                    </span>
                  </div>

                  <h2 className="text-lg font-bold">{service.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="mt-4 font-semibold text-gray-600">
                    Price: <span className="text-black">${service.price}</span>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center mt-2 font-semibold text-red-500">
                    <Phone size={16} className="mr-2" />{" "}
                    {service.number || "N/A"}
                  </div>
                </div>

                {/* More Details Button */}
                <button className="self-end px-4 py-2 ml-auto text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  More details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No services available.</p>
          )}
        </div>
      </div>

      {/* Create own Services */}
      <section className="p-6 text-center bg-blue-100 ">
        <h2 className="mb-4 text-4xl font-bold"> Post your Service free.</h2>
        <button
          className="px-6 py-3 text-white bg-blue-500 rounded-md"
          onClick={handleNavigateToProfile}
        >
          Click Here
        </button>
      </section>
    </div>
  );
};

export default HomePage;
