const { body } = require("express-validator");

const createCustomerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email address"),

  body("address")
    .optional()
    .trim(),

  body("balance")
    .optional()
    .isNumeric()
    .withMessage("Balance must be a number")
    .isFloat({ min: 0 })
    .withMessage("Balance cannot be negative"),
];

const updateCustomerValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("phone")
    .optional()
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only numbers"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email address"),

  body("address")
    .optional()
    .trim(),

  body("balance")
    .optional()
    .isNumeric()
    .withMessage("Balance must be a number")
    .isFloat({ min: 0 })
    .withMessage("Balance cannot be negative"),
];

module.exports = {
  createCustomerValidation,
  updateCustomerValidation,
};