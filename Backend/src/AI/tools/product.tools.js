const productService = require("../../services/product.service");

// ==========================================
// GET ALL PRODUCTS
// ==========================================

const getProductsTool = async () => {
  const products = await productService.getAllProducts();

  return products;
};

// ==========================================
// GET PRODUCT BY ID
// ==========================================

const getProductByIdTool = async (id) => {
  const product = await productService.getProductById(id);

  return product;
};

module.exports = {
  getProductsTool,
  getProductByIdTool,
};