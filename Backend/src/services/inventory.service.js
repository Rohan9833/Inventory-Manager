const Inventory = require("../models/inventory.model");
const Product = require("../models/product.model");

exports.stockIn = async (data, userId) => {
  const { product, quantity, note, costumer } = data;

  const existingProduct = await Product.findById(product);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  existingProduct.quantity += quantity;
  await existingProduct.save();
  const inventory = [];
  const tempinventory = await Inventory.create({
    product,
    type: "IN",
    quantity,
    note,
    createdBy: userId,
  });
  inventory.push(tempinventory);
  inventory.push({ productname: existingProduct.name });

  return inventory;
};

exports.stockOut = async (data, userId) => {
  const { product, quantity, note, costumer } = data;

  const existingProduct = await Product.findById(product);

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  if (existingProduct.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  existingProduct.quantity -= quantity;
  await existingProduct.save();
  const inventory = [];

  const tempinventory = await Inventory.create({
    product,
    type: "OUT",
    quantity,
    note,
    createdBy: userId,
  });
  inventory.push(tempinventory);
  inventory.push({ productname: existingProduct.name });
  return inventory;
};

exports.getInventoryHistory = async () => {
  const history = await Inventory.find()
    .populate("product", "name")
    .populate("createdBy", "name")
    .sort({ createdAt: -1 });

  return history;
};
