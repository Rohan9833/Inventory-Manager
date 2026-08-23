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

module.exports = {
  getProductsTool,
  createProductTool,
};