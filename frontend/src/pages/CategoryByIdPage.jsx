import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryStore } from "../store/categoryStore";
import { serviceStore } from "../store/serviceStore";
import { BsStarFill } from "react-icons/bs";
import { Phone } from "lucide-react";

const CategoryByIdPage = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [services, setServices] = useState([]);
  const [isFetchingServices, setIsFetchingServices] = useState(false);
  const [error, setError] = useState(null);
  const { fetchCategories } = categoryStore();
  const { fetchServicesByCategory } = serviceStore();

  useEffect(() => {
    const loadCategoryAndServices = async () => {
      try {
        // Fetch categories to get the category name
        const categories = await fetchCategories();
        const category = categories.find((cat) => cat._id === categoryId);

        if (category) {
          setCategoryName(category.name);
        } else {
          setCategoryName("");
        }

        // Fetch services for the given category
        setIsFetchingServices(true);
        setError(null);
        const res = await fetchServicesByCategory(categoryId);
        console.log("API Response:", res); // Debugging

        if (Array.isArray(res)) {
          setServices(res);
        } else if (res?.services) {
          setServices(res.services);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch category and services");
        toast.error("Failed to fetch category and services");
      } finally {
        setIsFetchingServices(false);
      }
    };

    loadCategoryAndServices();
  }, [categoryId, fetchCategories, fetchServicesByCategory]);

  if (isFetchingServices) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="w-full max-w-4xl p-6 mt-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 md:text-left">
          Services in Category: {categoryName || categoryId}
        </h1>
        <div className="mt-6 space-y-6">
          {services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className="relative flex items-center p-4 px-6 bg-gray-100 rounded-lg shadow-sm"
              >
                {/* Service Image */}
                <img
                  src={service.images?.[0] || "https://via.placeholder.com/150"}
                  alt={service.title}
                  className="object-cover w-40 h-40 mr-4 rounded-lg"
                />

                {/* Service Details */}
                <div className="flex-1">
                  <h2 className="text-lg font-bold">{service.title}</h2>

                  {/* Rating */}
                  <div className="flex items-center my-1 text-yellow-500">
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
                  <div className="absolute font-semibold text-gray-600 top-2 right-4">
                    Price: <span className="text-black">${service.price}</span>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center mt-2 font-semibold text-red-500">
                    <Phone size={16} className="mr-2" /> {service.number}
                  </div>
                </div>

                {/* More Details Button */}
                <button className="absolute px-4 py-2 text-white bg-blue-500 rounded-lg bottom-4 right-4 hover:bg-blue-600">
                  More details
                </button>
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
  );
};

export default CategoryByIdPage;
