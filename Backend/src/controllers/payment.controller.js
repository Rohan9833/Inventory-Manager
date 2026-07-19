const {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
} = require("../services/payment.service");

const createPayment = async (req, res) => {
  try {
    const payment = await createPaymentService(req.body, req.user._id);

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await getAllPaymentsService(req.user._id);

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await getPaymentByIdService(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await updatePaymentService(req.params.id, req.user._id, req.body);

    return res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      payment,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const deletePayment = async (req, res) => {
  try {
    await deletePaymentService(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
