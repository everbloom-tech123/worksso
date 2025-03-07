import React, { useEffect, useState } from "react";
import { serviceStore } from "../store/serviceStore";
import { categoryStore } from "../store/categoryStore";
import { BsStarFill } from "react-icons/bs";
import { Phone } from "lucide-react";
import { useParams } from "react-router-dom";

const ServicePage = () => {
  const { services, fetchAllServices } = serviceStore();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

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
  }, [fetchAllServices]);

  useEffect(() => {
    setLoading(true);
    // Fetch services for the specific category
    fetchAllServices(1, 10, categoryId) // Pass categoryId for filtering
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, fetchAllServices]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredServices =
    selectedCategories.length > 0
      ? services.filter((service) =>
          selectedCategories.includes(service.category)
        )
      : services;

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex gap-4">
        {/* Filter Section */}
        <div className="flex-shrink-0 p-4 -ml-40 border-r bg-gray-50">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">
            Filter by Category
          </h3>
          {categories.map((category) => (
            <div key={category._id} className="mb-2">
              <input
                type="checkbox"
                id={category._id}
                value={category._id}
                checked={selectedCategories.includes(category._id)}
                onChange={() => handleCategoryChange(category._id)}
                className="mr-2"
              />
              <label htmlFor={category._id} className="text-gray-600">
                {category.name}
              </label>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div className="flex-1 p-4">
          <h2 className="text-3xl font-semibold text-gray-800">
            Popular Services
          </h2>
          <div className="flex flex-col mt-4">
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <div className="text-xl text-center col-span-full">
                  Loading...
                </div>
              ) : filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <div
                    key={service._id}
                    className="overflow-hidden transition duration-300 bg-gray-100 rounded-lg shadow-md hover:shadow-lg"
                  >
                    <img
                      src={
                        service.images?.[0] || "https://via.placeholder.com/150"
                      }
                      alt={service.title}
                      className="object-cover w-full h-56"
                    />
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-500">
                          {Array(service.rating || 5)
                            .fill()
                            .map((_, i) => (
                              <BsStarFill key={i} size={16} />
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          ({service.reviews || 0} reviews)
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-lg font-bold text-gray-900">
                          ${service.price}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone size={16} className="mr-1" />{" "}
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
    </div>
  );
};

export default ServicePage;
