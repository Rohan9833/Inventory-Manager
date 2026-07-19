const Product = require("../models/product.model");
const Category = require("../models/category.model");

exports.createProduct = async (data) => {
  const { name, category, costPrice, sellingPrice, quantity } = data;

  // Check if category exists
  const existingCategory = await Category.findOne({
    name: category,
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  // Check duplicate product in same category
  const existingProduct = await Product.findOne({
    name,
    category: existingCategory._id,
  });

  if (existingProduct) {
    throw new Error("Product already exists in this category");
  }
  // Create product
  const product = await Product.create({
    name,
    category: existingCategory._id,
    costPrice,
    sellingPrice,
    quantity,
  });

  return product;
};

exports.getAllProducts = async () => {
  const products = await Product.find().populate("category", "name");

  return products;
};
exports.getProductById = async (id) => {
  const product = await Product.findById(id).populate("category", "name");

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

exports.updateProduct = async (id, data) => {
  const { name, category, costPrice, sellingPrice, quantity } = data;

  // Check if product exists
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  // Check category exists
  let categoryId = product.category;

  if (category !== undefined) {
    const existingCategory = await Category.findOne({
      name: category,
    });

    if (!existingCategory) {
      throw new Error("Category not found");
    }

    categoryId = existingCategory._id;
  }

  // Check duplicate product
  if (name !== undefined) {
    const existingProduct = await Product.findOne({
      name,
      category: product.category,
      _id: { $ne: id },
    });

    if (existingProduct) {
      throw new Error("Product already exists in this category");
    }

    product.name = name;
  }
  // Update fields

  if (name !== undefined) {
    product.name = name;
  }
  if (costPrice !== undefined) {
    product.costPrice = costPrice;
  }
  if (sellingPrice !== undefined) {
    product.sellingPrice = sellingPrice;
  }
  if (quantity !== undefined) {
    product.quantity = quantity;
  }

  await product.save();

  return product;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findOne({
    _id: id,
    // isDeleted: false,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  product.isDeleted = true;
  await product.save();

  return product;
};

exports.restoreProduct = async (id) => {
  const product = await Product.findOne({
    _id: id,
    isDeleted: true,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  product.isDeleted = false;
  await product.save();

  return product;
};