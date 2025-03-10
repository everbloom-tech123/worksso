import Contact from "../models/contact.model.js";

// Create a new contact message
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Create a new contact entry
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      user: req.user ? req.user._id : null, // Assuming user is authenticated and we have access to user ID from JWT
    });

    // Save the contact message to the database
    const savedContact = await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Contact message created successfully!",
      data: savedContact,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};

// Get all contact messages (Admin or User)
export const getAllContactMessages = async (req, res) => {
  try {
    const contactMessages = await Contact.find().populate("user", "name email"); // Populating user info if needed

    return res.status(200).json({
      success: true,
      data: contactMessages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};

// Get a single contact message by ID
export const getContactMessageById = async (req, res) => {
  try {
    const contactMessage = await Contact.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contactMessage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};

// Delete a contact message by ID
export const deleteContactMessage = async (req, res) => {
  try {
    const contactMessage = await Contact.findByIdAndDelete(req.params.id);

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error. Please try again later.",
    });
  }
};
