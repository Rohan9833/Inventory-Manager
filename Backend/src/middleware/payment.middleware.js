const { body } = require("express-validator");

const createPaymentValidation = [
  body("customer")
    .notEmpty()
    .withMessage("Customer is required"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ min: 1 })
    .withMessage("Amount must be greater than 0"),

  body("paymentMethod")
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["CASH", "UPI", "CARD", "BANK"])
    .withMessage("Invalid payment method"),

  body("note")
    .optional()
    .trim(),
];

const updatePaymentValidation = [
  body("customer")
    .optional()
    .notEmpty()
    .withMessage("Customer cannot be empty"),

  body("amount")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("Amount must be greater than 0"),

  body("paymentMethod")
    .optional()
    .isIn(["CASH", "UPI", "CARD", "BANK"])
    .withMessage("Invalid payment method"),

  body("note")
    .optional()
    .trim(),
];

module.exports = {
  createPaymentValidation,
  updatePaymentValidation,
};