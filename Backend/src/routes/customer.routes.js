const express = require("express");

const router = express.Router();

const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  changeCustomerStatus,
} = require("../controllers/customer.controller");

const verifyToken = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { validateObjectId } = require("../middleware/validateObjectId.middleware");

const {
  createCustomerValidation,
  updateCustomerValidation,
} = require("../middleware/customer.middleware");

router.post("/create", verifyToken, createCustomerValidation, validate, createCustomer);

router.get("/getall", verifyToken, getAllCustomers);

router.get("/getbyid/:id", verifyToken, validateObjectId, getCustomerById);

router.put(
  "/update/:id",
  verifyToken,
  validateObjectId,
  updateCustomerValidation,
  validate,
  updateCustomer,
);

router.patch("/status/:id", verifyToken, validateObjectId, changeCustomerStatus);

module.exports = router;
