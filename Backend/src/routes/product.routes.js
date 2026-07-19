const express = require("express");

const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  restoreProduct,
} = require("../controllers/product.controller");
const { validate } = require("../middleware/validate.middleware");
const verifyToken = require("../middleware/auth.middleware");
const { validateObjectId } = require("../middleware/validateObjectId.middleware");
const {
  createProductValidation,
  updateProductValidation,
} = require("../middleware/product.middleware");

router.post("/create", verifyToken, createProductValidation, createProduct);
router.get("/getall", verifyToken, getAllProducts);
router.get("/getbyid/:id", verifyToken, validateObjectId, validate, getProductById);
router.put(
  "/updatebyid/:id",
  verifyToken,
  validateObjectId,
  updateProductValidation,
  validate,
  updateProduct,
);
router.delete("/delete/:id", verifyToken, validateObjectId, deleteProduct);
router.patch("/restore/:id", verifyToken, validateObjectId, restoreProduct);

module.exports = router;
