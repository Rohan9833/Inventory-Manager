const Payment = require("../models/payment.model");
const Customer = require("../models/customer.model");

const createPaymentService = async (paymentData, userId) => {
  const { customer, amount, paymentMethod, note } = paymentData;

  const existingCustomer = await Customer.findOne({
    _id: customer,
    createdBy: userId,
  });

  if (!existingCustomer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  if (amount > existingCustomer.balance) {
    const error = new Error("Payment amount cannot be greater than pending balance");
    error.statusCode = 400;
    throw error;
  }

  const payment = await Payment.create({
    customer,
    amount,
    paymentMethod,
    note,
    createdBy: userId,
  });

  existingCustomer.balance -= amount;

  await existingCustomer.save();

  return payment;
};

const getAllPaymentsService = async (userId) => {
  return await Payment.find({ createdBy: userId })
    .populate("customer", "name phone")
    .sort({ createdAt: -1 });
};

const getPaymentByIdService = async (paymentId, userId) => {
  const payment = await Payment.findOne({
    _id: paymentId,
    createdBy: userId,
  }).populate("customer", "name phone");

  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }

  return payment;
};

const updatePaymentService = async (paymentId, userId, paymentData) => {
  const payment = await Payment.findOne({
    _id: paymentId,
    createdBy: userId,
  });

  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }

  const customer = await Customer.findById(payment.customer);
  if (paymentData.amount > availableBalance) {
    const error = new Error("Payment amount cannot be greater than pending balance");
    error.statusCode = 400;
    throw error;
  }
  // Purana payment wapas add karo
  customer.balance += payment.amount;

  // Naya payment minus karo
  customer.balance -= paymentData.amount;

  payment.amount = paymentData.amount;
  payment.paymentMethod = paymentData.paymentMethod;
  payment.note = paymentData.note;

  await payment.save();
  await customer.save();

  return payment;
};

const deletePaymentService = async (paymentId, userId) => {
  const payment = await Payment.findOne({
    _id: paymentId,
    createdBy: userId,
  });

  if (!payment) {
    const error = new Error("Payment not found");
    error.statusCode = 404;
    throw error;
  }

  const customer = await Customer.findById(payment.customer);

  customer.balance += payment.amount;

  await customer.save();

  await payment.deleteOne();

  return;
};

module.exports = {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
};
