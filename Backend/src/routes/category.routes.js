const express = require("express");
const router = express.Router();
const { validateObjectId } = require("../middleware/validateObjectId.middleware");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  changeCategoryStatus,
} = require("../controllers/category.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/create", authMiddleware, createCategory);
router.get("/getall", authMiddleware, getAllCategories);
router.get("/getbyid/:id", authMiddleware, validateObjectId, getCategoryById);
router.put("/updatebyid/:id", authMiddleware, validateObjectId, updateCategory);
router.patch("/status/:id", authMiddleware, validateObjectId, changeCategoryStatus);

module.exports = router;
