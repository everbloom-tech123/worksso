import express from "express";

const router = express.Router();

router.post("/createCategory", createCategory);
router.get("/getAllCategory", getAllCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
