const Sale = require("../models/sale.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");
const Payment = require("../models/payment.model");
const Inventory = require("../models/inventory.model");
const mongoose = require("mongoose");

const createSaleService = async (saleData, userId) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { customer, items, discount = 0, paidAmount = 0, note } = saleData;

    // ===========================
    // Step 1 - Customer Validation
    // ===========================

    const existingCustomer = await Customer.findOne({
      name: customer,
      createdBy: userId,
    }).session(session);

    if (!existingCustomer) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }

    // ===========================
    // Step 2 - Product Validation
    // ===========================

    let subtotal = 0;
    const saleItems = [];

    for (const item of items) {
      const existingProduct = await Product.findOne({
        name: item.product,
        isDeleted: false,
      }).session(session);

      if (!existingProduct) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      }

      if (existingProduct.quantity < item.quantity) {
        const error = new Error(
          `${existingProduct.name} has only ${existingProduct.quantity} items in stock`,
        );
        error.statusCode = 400;
        throw error;
      }

      const price = existingProduct.sellingPrice;
      const total = price * item.quantity;

      subtotal += total;

      saleItems.push({
        product: existingProduct._id,
        quantity: item.quantity,
        price,
        total,
      });
    }

    // ===========================
    // Step 3 - Amount Calculation
    // ===========================

    const totalAmount = subtotal - discount;

    console.log({
      subtotal,
      discount,
      totalAmount,
      paidAmount,
    });
    if (totalAmount < 0) {
      const error = new Error("Discount cannot be greater than subtotal", totalAmount);
      error.statusCode = 400;
      throw error;
    }

    if (paidAmount > totalAmount) {
      const error = new Error("Paid amount cannot be greater than total amount", totalAmount);
      error.statusCode = 400;
      throw error;
    }

    const dueAmount = totalAmount - paidAmount;

    let paymentStatus = "UNPAID";

    if (dueAmount === 0) {
      paymentStatus = "PAID";
    } else if (paidAmount > 0) {
      paymentStatus = "PARTIAL";
    }

    // ===========================
    // Step 4 - Create Sale
    // ===========================

    const [sale] = await Sale.create(
      [
        {
          customer: existingCustomer._id,
          items: saleItems,
          subtotal,
          discount,
          totalAmount,
          paidAmount,
          dueAmount,
          paymentStatus,
          note,
          createdBy: userId,
        },
      ],
      { session },
    );

    // ===========================
    // Step 5 - Update Product Quantity
    // ===========================

    for (const item of saleItems) {
      await Product.updateOne(
        {
          _id: item.product,
        },
        {
          $inc: {
            quantity: -item.quantity,
          },
        },
        {
          session,
        },
      );
    }

    // ===========================
    // Step 6 - Create Inventory OUT
    // ===========================

    const inventoryLogs = saleItems.map((item) => ({
      product: item.product,
      type: "OUT",
      quantity: item.quantity,
      note: "Product sold",
      createdBy: userId,
    }));

    await Inventory.create(inventoryLogs, { session });
    // ===========================
    // Step 7 - Update Customer Balance
    // ===========================

    if (dueAmount > 0) {
      existingCustomer.balance += dueAmount;

      await existingCustomer.save({ session });
    }
    // ===========================
    // Step 8 - Create Payment
    // ===========================

    if (paidAmount > 0) {
      await Payment.create(
        [
          {
            customer: existingCustomer._id,
            amount: paidAmount,
            paymentMethod: "CASH",
            note: "Payment received during sale",
            createdBy: userId,
          },
        ],
        { session },
      );
    }

    await session.commitTransaction();

    return sale;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllSalesService = async (userId) => {
  return await Sale.find({
    createdBy: userId,
  })
    .populate("customer", "name phone")
    .populate("items.product", "name")
    .sort({ createdAt: -1 });
};

const getSaleByIdService = async (saleId, userId) => {
  const sale = await Sale.findOne({
    _id: saleId,
    createdBy: userId,
  })
    .populate("customer", "name phone")
    .populate("items.product", "name");

  if (!sale) {
    const error = new Error("Sale not found");
    error.statusCode = 404;
    throw error;
  }

  return sale;
};

module.exports = {
  createSaleService,
  getAllSalesService,
  getSaleByIdService,
};
