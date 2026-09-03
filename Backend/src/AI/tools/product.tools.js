const productService = require("../../services/product.service");

// ==========================================
// GET PRODUCTS
// ==========================================

const getProductsTool = async () => {
  const products = await productService.getAllProducts();

  return products;
};

// ==========================================
// CREATE PRODUCT
// ==========================================

const createProductTool = async (data) => {
  const product = await productService.createProduct(data);

  return product;
};

// ==========================================
// GET PRODUCT BY ID
// ==========================================

const getProductByIdTool = async (args) => {
  const product = await productService.getProductById(args.id);

  return product;
};

// ==========================================
// UPDATE PRODUCT
// ==========================================

const updateProductTool = async (args) => {
  const product = await productService.updateProduct(
    args.id,
    args
  );

  return product;
};

// ==========================================
// DELETE PRODUCT
// ==========================================

const deleteProductTool = async (args) => {
  const product = await productService.deleteProduct(args.id);

  return product;
};

// ==========================================
// RESTORE PRODUCT
// ==========================================

const restoreProductTool = async (args) => {
  const product = await productService.restoreProduct(args.id);

  return product;
};

module.exports = {
  getProductsTool,
  createProductTool,
  getProductByIdTool,
  updateProductTool,
  deleteProductTool,
  restoreProductTool,
};