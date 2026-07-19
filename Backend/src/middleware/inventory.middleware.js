const { body } = require("express-validator");

exports.inventoryValidation = [
  body("product")
    .notEmpty()
    .withMessage("Product is required"),

  // body("type")
  //   .notEmpty()
  //   .withMessage("Type is required")
  //   .isIn(["IN", "OUT"])
  //   .withMessage("Type must be IN or OUT"),

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be greater than 0"),

  body("note")
    .optional()
    .trim(),
];