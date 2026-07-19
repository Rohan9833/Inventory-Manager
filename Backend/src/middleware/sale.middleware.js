const { body } = require("express-validator");

const createSaleValidation = [
  body("customer")
    .notEmpty()
    .withMessage("Customer is required"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one product is required"),

  body("discount")
    .optional()
    .isNumeric()
    .withMessage("Discount must be a number"),

  body("paidAmount")
    .optional()
    .isNumeric()
    .withMessage("Paid amount must be a number"),

  body("paymentMethod")
    .optional()
    .isIn(["CASH", "UPI", "CARD", "BANK"])
    .withMessage("Invalid payment method"),
];

module.exports = {
  createSaleValidation,
};