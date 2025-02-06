import React, { useState } from "react";

const ServiceForm = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle service submission logic here
    alert("Service submitted successfully!");
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-2/6 p-6 bg-white rounded-md shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Post Your Service</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Service Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea className="w-full px-3 py-2 border rounded-md" required />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category:</label>
            <input
              type="text"
              name="category"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Location:</label>
            <input
              type="text"
              name="category"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Contact Number:</label>
            <input
              type="text"
              name="category"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              name="category"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Images:</label>
            <input type="file" name="images" multiple />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Submit
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
