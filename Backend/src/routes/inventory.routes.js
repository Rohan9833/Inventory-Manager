const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { inventoryValidation } = require("../middleware/inventory.middleware");
const { stockIn, stockOut, getInventoryHistory } = require("../controllers/inventory.controller");

router.post("/in", verifyToken, inventoryValidation, validate, stockIn);

router.post("/out", verifyToken, inventoryValidation, validate, stockOut);

router.get("/history", verifyToken, getInventoryHistory);

module.exports = router;
