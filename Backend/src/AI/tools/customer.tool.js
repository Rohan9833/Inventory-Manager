const customerService = require("../../services/customer.service");

const getCustomerTool = async (args, userId) => {
  const customer = await customerService.getAllCustomersService(userId);

  return customer;
};

const createCustomerTool = async (args, userId) => {
  const customer = await customerService.createCustomerService(
    args,
    userId
  );

  return customer;
};

const getCustomerByIdTool = async (args, userId) => {
  const customer = await customerService.getCustomerByIdService(
    args.id,
    userId
  );

  return customer;
};

const updateCustomerTool = async (args, userId) => {
  const customer = await customerService.updateCustomerService(
    args.id,
    userId,
    args
  );

  return customer;
};

const changeCustomerStatusTool = async (args, userId) => {
  const customer = await customerService.changeCustomerStatusService(
    args.id,
    userId
  );

  return customer;
};

module.exports = {
  getCustomerTool,
  createCustomerTool,
  getCustomerByIdTool,
  updateCustomerTool,
  changeCustomerStatusTool,
};