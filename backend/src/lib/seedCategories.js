import mongoose from "mongoose";
import Category from "../models/category.model.js";
import dotnev from "dotenv";

dotnev.config();

const categories = [
  { name: "Web Development" },
  { name: "Mobile Development" },
  { name: "UI/UX Design" },
  { name: "Data Science" },
  { name: "Digital Marketing" },
  { name: "Programming Languages" },
  { name: "Game Development" },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Category.deleteMany();
    await Category.insertMany(categories);

    console.log("Categories seeded successfully");
  } catch (error) {
    console.error("Error seeding categories:", error.message);
    process.exit(1);
  }
};

seedCategories();
