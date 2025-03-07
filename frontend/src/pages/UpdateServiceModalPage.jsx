import React, { useState, useEffect } from "react";

const UpdateServiceModal = ({ service, onClose, onUpdate }) => {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);
  const [number, setNumber] = useState(service.number);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { title, description, price, number };
    onUpdate(updatedData); // Call onUpdate to handle the update logic
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg">
        <h2 className="text-xl font-semibold">Update Service</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="number" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="text"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onClose} // Close modal on cancel
              className="w-full p-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full p-2 text-sm font-semibold text-white bg-blue-500 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateServiceModal;
