import React, { useEffect, useState } from "react";
import { serviceStore } from "../store/serviceStore";
import { categoryStore } from "../store/categoryStore";
import { BsStarFill } from "react-icons/bs"; // Bootstrap Star Icon
import { Phone } from "lucide-react";

const ServicePage = () => {
  const { services, fetchAllServices } = serviceStore();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      categoryStore.getState().fetchCategories(),
      fetchAllServices(1, 10),
    ])
      .then(([categoryResponse, servicesResponse]) => {
        setCategories(categoryResponse);
        console.log("Services fetched:", servicesResponse);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchAllServices]); // Add fetchAllServices as a dependency to useEffect

  // Filter services based on selected category
  const filteredServices = selectedCategory
    ? services.filter((service) => service.category === selectedCategory)
    : services;

  return (
    <div>
      {/* Filter by Category */}
      <div className="py-4 bg-gray-50">
        <div className="container px-4 mx-auto">
          <label
            htmlFor="category"
            className="text-lg font-medium text-gray-700"
          >
            Filter by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 mt-2 border rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Popular Services
          </h2>
          <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="text-xl text-center col-span-full">
                Loading...
              </div>
            ) : filteredServices.length > 0 ? (
              filteredServices.map((service) => (
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
    </div>
  );
};

export default ServicePage;
