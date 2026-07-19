const express = require("express");

const router = express.Router();

const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");

const verifyToken = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const { validateObjectId } = require("../middleware/validateObjectId.middleware");

const {
  createPaymentValidation,
  updatePaymentValidation,
} = require("../middleware/payment.middleware");

router.post("/create", verifyToken, createPaymentValidation, validate, createPayment);

router.get("/", verifyToken, getAllPayments);

router.get("/:id", verifyToken, validateObjectId, getPaymentById);

router.put(
  "/update/:id",
  verifyToken,
  validateObjectId,
  updatePaymentValidation,
  validate,
  updatePayment,
);

router.delete("/:id", verifyToken, validateObjectId, deletePayment);

module.exports = router;
