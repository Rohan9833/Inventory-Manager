const Category = require("../models/category.model");

// ==========================================
// CREATE CATEGORY
// ==========================================

exports.createCategory = async (data) => {
  const { name, description } = data;

  if (!name) {
    throw new Error("Category name is required");
  }

  const existingCategory = await Category.findOne({
    name: {
      $regex: new RegExp(`^${name.trim()}$`, "i"),
    },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name: name.trim(),
    description,
  });

  return category;
};

// ==========================================
// GET ALL CATEGORIES
// ==========================================

exports.getAllCategories = async (active) => {
  const filter = {};

  if (active !== undefined) {
    filter.isActive = active;
  }

  const categories = await Category.find(filter).sort({
    createdAt: -1,
  });

  return categories;
};

// ==========================================
// GET CATEGORY BY ID
// ==========================================

exports.getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

// ==========================================
// UPDATE CATEGORY
// ==========================================

exports.updateCategory = async (id, data) => {
  const { name, description } = data;

  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  if (name) {
    const existingCategory = await Category.findOne({
      name: name.trim(),
      _id: { $ne: id },
    });

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    category.name = name.trim();
  }

  if (description !== undefined) {
    category.description = description;
  }

  await category.save();

  return category;
};

// ==========================================
// CHANGE CATEGORY STATUS
// ==========================================

exports.changeCategoryStatus = async (
  id,
  isActive
) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  if (typeof isActive !== "boolean") {
    throw new Error(
      "isActive must be true or false"
    );
  }

  category.isActive = isActive;

  await category.save();

  return category;
};