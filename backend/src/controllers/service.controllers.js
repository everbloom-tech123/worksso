import Service from "../models/service.model.js"; // Your service model
import cloudinary from "../lib/cloudinary.js"; // Cloudinary configuration

// Create a new service
export const createService = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      category,
      location,
      images,
      number,
      email,
    } = req.body;
    const userId = req.user._id; // Get the userId from the authentication middleware

    // Check if category exists
    if (!category) {
      return res.status(400).json({ message: "Category is required." });
    }

    let uploadedImages = [];

    // If images are provided, upload them to Cloudinary
    if (images && images.length > 0) {
      uploadedImages = await Promise.all(
        images.map(async (image) => {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "services", // Cloudinary folder name
            resource_type: "image", // Ensure the file is an image
          });
          return uploadResponse.secure_url; // Save the Cloudinary image URL
        })
      );
    }

    // Create a new service object with provided data and uploaded image URLs
    const newService = new Service({
      title,
      price,
      description,
      category,
      location,
      images: uploadedImages, // Save the Cloudinary URLs
      number,
      email,
      userId, // Save the userId of the person adding the service
    });

    // Save the new service to the database
    await newService.save();

    // Return the created service
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error in createService controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const services = await Service.find()
      .populate("userId", "fullName") // Populate the provider name (assuming 'fullName' is the provider name)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalServices = await Service.countDocuments();

    res.status(200).json({ services, total: totalServices });
  } catch (error) {
    console.error("Error in getAllServices controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Controller to get services for authenticated user
export const getServiceByUserId = async (req, res) => {
  try {
    const userId = req.user._id; // Get the userId from the authenticated user

    // Find services that belong to the authenticated user
    const services = await Service.find({ userId });

    if (!services) {
      return res
        .status(404)
        .json({ message: "No services found for this user" });
    }

    // Return the services to the frontend
    res.status(200).json(services);
  } catch (error) {
    console.error("Error in getServiceByUserId controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Update a service (only description, location, images, number, and email)
export const updateService = async (req, res) => {
  try {
    const { title, price, description, location, images, number, email } =
      req.body;
    const serviceId = req.params.id; // Get the service ID from the route parameters

    // Find the existing service
    const existingService = await Service.findById(serviceId);
    if (!existingService) {
      return res.status(404).json({ message: "Service not found" });
    }

    let updatedImages = existingService.images; // Keep old images if no new ones are provided

    // If new images are provided, upload them to Cloudinary
    if (Array.isArray(images)) {
      if (images.length > 0) {
        // Delete existing images from Cloudinary
        await Promise.all(
          existingService.images.map(async (imageUrl) => {
            try {
              const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract Cloudinary public_id
              await cloudinary.uploader.destroy(`services/${publicId}`);
            } catch (err) {
              console.error("Error deleting image from Cloudinary:", err);
            }
          })
        );

        // Upload new images
        updatedImages = await Promise.all(
          images.map(async (image) => {
            try {
              const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "services",
                resource_type: "image",
              });
              return uploadResponse.secure_url;
            } catch (err) {
              console.error("Error uploading image to Cloudinary:", err);
              return null; // Handle errors without breaking the update process
            }
          })
        );

        // Remove any null values from failed uploads
        updatedImages = updatedImages.filter((url) => url !== null);
      } else {
        // If images array is empty, remove all images
        updatedImages = [];
      }
    }

    // Prepare updated fields
    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (price !== undefined) updatedFields.price = price;
    if (description !== undefined) updatedFields.description = description;
    if (location !== undefined) updatedFields.location = location;
    if (updatedImages !== undefined) updatedFields.images = updatedImages;
    if (number !== undefined) updatedFields.number = number;
    if (email !== undefined) updatedFields.email = email;

    // Update the service in the database
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error in updateService controller:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a service by its ID
export const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id; // Get the service ID from the route parameters

    // Find and delete the service by ID
    const service = await Service.findByIdAndDelete(serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Delete images from Cloudinary if they exist
    if (service.images && service.images.length > 0) {
      await Promise.all(
        service.images.map(async (imageUrl) => {
          const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public_id
          await cloudinary.uploader.destroy(`services/${publicId}`);
        })
      );
    }

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error in deleteService controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getServiceByCategoryID = async (req, res) => {
  try {
    const categoryId = req.params.id; // Get the category ID from the route parameters

    // Find services that belong to the category
    const services = await Service.find({ category: categoryId });

    if (!services) {
      return res
        .status(404)
        .json({ message: "No services found for this category" });
    }

    // Return the services to the frontend
    res.status(200).json(services);
  } catch (error) {
    console.error("Error in getServiceByCategoryID controller:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
