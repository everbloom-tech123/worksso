import React, { useState, useEffect } from "react";
import { BsChevronCompactRight, BsStarFill } from "react-icons/bs";
import { Star, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { serviceStore } from "../store/serviceStore";
import { categoryStore } from "../store/categoryStore";

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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      categoryStore.getState().fetchCategories(),
      fetchAllServices(1, 10),
    ])
      .then(([categoryResponse]) => {
        setCategories(categoryResponse);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchAllServices(nextPage, 10);
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  // Handle category click to navigate to category-specific service page
  const handleCategoryClick = (categoryId) => {
    navigate(`/services/${categoryId}`); // Navigate to ServicePage with categoryId
  };

  return (
    <div className="bg-gray-50">
      <div className="relative h-[600px] bg-cover bg-center transition-all duration-500 -mb-24">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-[500px] duration-500 bg-center bg-cover"
        ></div>

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

      <div className="container px-4 py-16 mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Browse by Categories
        </h2>
        <div className="grid grid-cols-2 gap-8 mt-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {loading ? (
            <div className="text-xl text-center col-span-full">
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="text-xl text-center col-span-full">
              No categories available.
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category._id}
                className="p-6 transition duration-300 transform bg-white rounded-lg shadow-lg hover:scale-105"
                onClick={() => handleCategoryClick(category._id)} // Add click handler
              >
                <img
                  src={category.logo}
                  alt={category.name}
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">
                  {category.name}
                </h3>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Popular Services
          </h2>
          <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {services?.length > 0 ? (
              services.map((service) => (
                <div
                  key={service._id}
                  className="overflow-hidden transition-all duration-300 transform bg-gray-100 rounded-lg shadow-md hover:scale-105"
                >
                  <img
                    src={
                      service.images?.[0] || "https://via.placeholder.com/150"
                    }
                    alt={service.title}
                    className="object-cover w-full h-64"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-500">
                        {Array(service.rating || 5)
                          .fill()
                          .map((_, i) => (
                            <BsStarFill key={i} size={18} />
                          ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        ({service.reviews || 0} reviews)
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-xl font-bold text-gray-900">
                        ${service.price}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone size={16} className="mr-2" />{" "}
                        {service.number || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xl text-center col-span-full">
                No services available.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-12 text-white bg-blue-500">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Post Your Service for Free
          </h2>
          <p className="mb-6 text-xl">
            Get more customers by posting your service on our platform
          </p>
          <button
            className="px-8 py-4 text-xl font-semibold text-blue-500 transition-all bg-white rounded-full hover:bg-gray-100"
            onClick={handleNavigateToProfile}
          >
            Post Your Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
