const Customer = require("../models/customer.model");

const createCustomerService = async (customerData, userId) => {
  const { phone } = customerData;

  const existingCustomer = await Customer.findOne({
    phone,
    createdBy: userId,
  });

  if (existingCustomer) {
    const error = new Error("Customer already exists");
    error.statusCode = 400;
    throw error;
  }

  const customer = await Customer.create({
    ...customerData,
    createdBy: userId,
  });

  return customer;
};

const getAllCustomersService = async (userId) => {
  return await Customer.find({ createdBy: userId }).sort({
    createdAt: -1,
  });
};

const getCustomerByIdService = async (customerId, userId) => {
  const customer = await Customer.findOne({
    _id: customerId,
    createdBy: userId,
  });

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  return customer;
};

const updateCustomerService = async (customerId, userId, customerData) => {
  const customer = await Customer.findOne({
    _id: customerId,
    createdBy: userId,
  });

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  if (customerData.phone && customerData.phone !== customer.phone) {
    const existingCustomer = await Customer.findOne({
      phone: customerData.phone,
      createdBy: userId,
    });

    if (existingCustomer) {
      const error = new Error("Phone number already exists");
      error.statusCode = 400;
      throw error;
    }
  }

  Object.assign(customer, customerData);

  await customer.save();

  return customer;
};

const changeCustomerStatusService = async (customerId, userId) => {
  const customer = await Customer.findOne({
    _id: customerId,
    createdBy: userId,
  });

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  customer.status = !customer.status;

  await customer.save();

  return customer;
};

module.exports = {
  createCustomerService,
  getAllCustomersService,
  getCustomerByIdService,
  updateCustomerService,
  changeCustomerStatusService,
};