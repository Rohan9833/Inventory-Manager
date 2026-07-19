const express = require("express");

const router = express.Router();

const { createSale, getAllSales, getSaleById } = require("../controllers/sale.controller");
const verifyToken = require("../middleware/auth.middleware");
const { validateObjectId } = require("../middleware/validateObjectId.middleware");
const { validate } = require("../middleware/validate.middleware");
const { createSaleValidation } = require("../middleware/sale.middleware.js");


router.post("/create", verifyToken, createSaleValidation, validate, createSale);
router.get("/", verifyToken, getAllSales);
router.get("/:id", verifyToken, validateObjectId, getSaleById);

module.exports = router;
