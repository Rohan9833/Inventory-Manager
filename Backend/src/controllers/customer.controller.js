const {
  createCustomerService,
  getAllCustomersService,
  getCustomerByIdService,
  updateCustomerService,
  changeCustomerStatusService,
} = require("../services/customer.service");

const createCustomer = async (req, res) => {
  try {
    const customer = await createCustomerService(req.body, req.user._id);

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      customer,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomersService(req.user._id);

    return res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await getCustomerByIdService(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await updateCustomerService(req.params.id, req.user._id, req.body);

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const changeCustomerStatus = async (req, res) => {
  try {
    const customer = await changeCustomerStatusService(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      message: `Customer ${customer.status ? "Activated" : "Deactivated"} successfully`,
      customer,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  changeCustomerStatus,
};
