import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryStore } from "../store/categoryStore";
import { serviceStore } from "../store/serviceStore";
import { BsStarFill } from "react-icons/bs";
import { Phone, Search } from "lucide-react";

const CategoryByIdPage = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchCategories } = categoryStore();
  const { fetchServicesByCategory } = serviceStore();

  useEffect(() => {
    const loadCategoryAndServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const categories = await fetchCategories();
        const category = categories.find((cat) => cat._id === categoryId);
        setCategoryName(category ? category.name : "");

        const res = await fetchServicesByCategory(categoryId);
        const servicesData = Array.isArray(res) ? res : res?.services || [];
        setServices(servicesData);
        setFilteredServices(servicesData); // Initialize filtered services
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load services. Please try again later.");
        toast.error("Failed to fetch category and services");
      } finally {
        setLoading(false);
      }
    };

    loadCategoryAndServices();
  }, [categoryId, fetchCategories, fetchServicesByCategory]);

  // Filter services based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchTerm, services]);

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {categoryName ? `Services in ${categoryName}` : "Services"}
        </h1>

        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {loading ? (
          <div className="mt-6 text-center">Loading services...</div>
        ) : error ? (
          <div className="mt-6 text-center text-red-500">{error}</div>
        ) : filteredServices.length > 0 ? (
          <div className="mt-6 space-y-6">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-sm md:flex-row"
              >
                {/* Service Image */}
                <img
                  src={service.images?.[0] || "https://via.placeholder.com/150"}
                  alt={service.title}
                  className="object-cover w-40 h-40 mb-4 rounded-lg md:mr-4 md:mb-0"
                />

                {/* Service Details */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-lg font-bold">{service.title}</h2>

                  {/* Rating */}
                  <div className="flex items-center justify-center my-1 text-yellow-500 md:justify-start">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <BsStarFill key={i} size={16} />
                      ))}
                    <span className="ml-2 text-gray-500">(07)</span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="mt-2 font-semibold text-gray-600">
                    Price: <span className="text-black">${service.price}</span>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center justify-center mt-2 font-semibold text-red-500 md:justify-start">
                    <Phone size={16} className="mr-2" /> {service.number}
                  </div>
                </div>

                {/* More Details Button */}
                <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 md:mt-0 md:ml-4">
                  More details
                </button>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="mt-6 text-xl text-center">
            No services found matching "{searchTerm}"
          </div>
        ) : (
          <div className="mt-6 text-xl text-center">No services available.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryByIdPage;