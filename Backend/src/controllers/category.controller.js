const categoryService = require("../services/category.service.js");

// ==========================================
// CREATE
// ==========================================

exports.createCategory = async (req, res) => {
  try {
    const category =
      await categoryService.createCategory(
        req.body
      );

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error(
      "Create Category Error:",
      error
    );

    const statusCode =
      error.message ===
      "Category already exists"
        ? 409
        : 400;

    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET ALL
// ==========================================

exports.getAllCategories = async (
  req,
  res
) => {
  try {
    const active =
      req.query.active !== undefined
        ? req.query.active === "true"
        : undefined;

    const categories =
      await categoryService.getAllCategories(
        active
      );

    return res.status(200).json({
      success: true,
      message:
        "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error(
      "Get Categories Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================================
// GET BY ID
// ==========================================

exports.getCategoryById = async (
  req,
  res
) => {
  try {
    const category =
      await categoryService.getCategoryById(
        req.params.id
      );

    return res.status(200).json({
      success: true,
      message:
        "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE
// ==========================================

exports.updateCategory = async (
  req,
  res
) => {
  try {
    const category =
      await categoryService.updateCategory(
        req.params.id,
        req.body
      );

    return res.status(200).json({
      success: true,
      message:
        "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// CHANGE STATUS
// ==========================================

exports.changeCategoryStatus = async (
  req,
  res
) => {
  try {
    const category =
      await categoryService.changeCategoryStatus(
        req.params.id,
        req.body.isActive
      );

    return res.status(200).json({
      success: true,
      message: `Category ${
        req.body.isActive
          ? "activated"
          : "deactivated"
      } successfully`,
      data: category,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};