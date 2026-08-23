const categoryService = require("../../services/category.service");

// ==========================================
// GET CATEGORIES
// ==========================================

const getCategoriesTool = async (args) => {
  const active =
    args?.active !== undefined
      ? args.active
      : undefined;

  return await categoryService.getAllCategories(
    active
  );
};

// ==========================================
// GET CATEGORY BY ID
// ==========================================

const getCategoryByIdTool = async (args) => {
  return await categoryService.getCategoryById(
    args.id
  );
};

// ==========================================
// CREATE CATEGORY
// ==========================================

const createCategoryTool = async (args) => {
  return await categoryService.createCategory(
    args
  );
};

// ==========================================
// UPDATE CATEGORY
// ==========================================

const updateCategoryTool = async (args) => {
  const { id, ...data } = args;

  return await categoryService.updateCategory(
    id,
    data
  );
};

// ==========================================
// CHANGE CATEGORY STATUS
// ==========================================

const changeCategoryStatusTool = async (
  args
) => {
  return await categoryService.changeCategoryStatus(
    args.id,
    args.isActive
  );
};

module.exports = {
  getCategoriesTool,
  getCategoryByIdTool,
  createCategoryTool,
  updateCategoryTool,
  changeCategoryStatusTool,
};