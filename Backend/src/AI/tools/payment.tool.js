const paymentService = require("../../services/payment.service");

// ==========================================
// CREATE PAYMENT
// ==========================================

const createPaymentTool = async (args, userId) => {
  const payment = await paymentService.createPaymentService(
    args,
    userId
  );

  return payment;
};

// ==========================================
// GET PAYMENTS
// ==========================================

const getPaymentsTool = async (args, userId) => {
  const payments = await paymentService.getAllPaymentsService(
    userId
  );

  return payments;
};

// ==========================================
// GET PAYMENT BY ID
// ==========================================

const getPaymentByIdTool = async (args, userId) => {
  const payment = await paymentService.getPaymentByIdService(
    args.id,
    userId
  );

  return payment;
};

// ==========================================
// UPDATE PAYMENT
// ==========================================

const updatePaymentTool = async (args, userId) => {
  const payment = await paymentService.updatePaymentService(
    args.id,
    userId,
    args
  );

  return payment;
};

// ==========================================
// DELETE PAYMENT
// ==========================================

const deletePaymentTool = async (args, userId) => {
  const payment = await paymentService.deletePaymentService(
    args.id,
    userId
  );

  return payment;
};

module.exports = {
  createPaymentTool,
  getPaymentsTool,
  getPaymentByIdTool,
  updatePaymentTool,
  deletePaymentTool,
};