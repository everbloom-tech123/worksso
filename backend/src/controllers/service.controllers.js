import Service from "../models/service.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createService = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      category,
      subCategory,
      serviceType,
      images,
    } = req.body;

    let uploadedImages = [];

    // Check if images exist and upload to Cloudinary
    if (images && images.length > 0) {
      uploadedImages = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.uploader.upload(image, {
            folder: "services", // Cloudinary folder name
          });
          return result.secure_url; // Store Cloudinary image URL
        })
      );
    }

    const newService = new Service({
      title,
      price,
      description,
      category,
      subCategory,
      serviceType,
      images: uploadedImages, // Save Cloudinary URLs
      userId: req.userId,
    });

    await newService.save();

    res.status(201).json(newService);
  } catch (error) {
    console.error("Error in createService controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllServices = async (res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error("Error in getAllServices controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json(service);
  } catch (error) {
    console.error("Error in getServiceById controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateService = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      category,
      subCategory,
      serviceType,
      images,
    } = req.body;

    let uploadedImages = [];

    // Check if images exist and upload to Cloudinary
    if (images && images.length > 0) {
      uploadedImages = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.uploader.upload(image, {
            folder: "services", // Cloudinary folder name
          });
          return result.secure_url; // Store Cloudinary image URL
        })
      );
    }

    const updatedService = {
      title,
      price,
      description,
      category,
      subCategory,
      serviceType,
      images: uploadedImages, // Save Cloudinary URLs
    };

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      updatedService,
      {
        new: true,
      }
    );

    res.status(200).json(service);
  } catch (error) {
    console.error("Error in updateService controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error in deleteService controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
