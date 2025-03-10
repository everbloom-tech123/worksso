import React, { useState, useEffect } from "react";
import { serviceStore } from "../store/serviceStore";
import { categoryStore } from "../store/categoryStore"; // Import categoryStore

const ServiceForm = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Added state to store categories
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "", // Store selected category
    location: "",
    number: "",
    email: "",
    images: [],
  });

  // Fetch categories when the component is mounted
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await categoryStore
        .getState()
        .fetchCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
          setFormData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...newImages],
          }));
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting Form Data:", formData);
      await serviceStore.getState().createService(formData); // Send data
      alert("Service submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting service:", error);
      alert("Failed to submit service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-2/6 p-6 bg-white rounded-md shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Post Your Service</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Service Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter service title"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter service description"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter service price"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Enter service location"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Contact Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              placeholder="Enter contact number"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Images</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleImageUpload}
              multiple
            />
          </div>

          {/* Preview Uploaded Images */}
          <div className="flex flex-wrap gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="uploaded preview"
                className="object-cover w-16 h-16 border rounded-md"
              />
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
