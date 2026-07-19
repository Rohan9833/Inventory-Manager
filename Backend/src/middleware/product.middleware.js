const { body } = require("express-validator");

const createProductValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required"),

  body("category").notEmpty().withMessage("Category is required"),

  body("costPrice")
    .isFloat({ min: 0 })
    .withMessage("Cost price must be greater than or equal to 0"),

  body("sellingPrice")
    .isFloat({ min: 0 })
    .withMessage("Selling price must be greater than or equal to 0"),

  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be greater than or equal to 0"),
];

const updateProductValidation = [
  body("name").optional().trim().notEmpty().withMessage("Product name cannot be empty"),

  body("category").optional().notEmpty().withMessage("Category is required"),

  body("costPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Cost price must be greater than or equal to 0"),

  body("sellingPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Selling price must be greater than or equal to 0"),

  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be greater than or equal to 0"),
];

module.exports = {
  createProductValidation,
  updateProductValidation,
};
