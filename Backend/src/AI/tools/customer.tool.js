const customerService = require("../../services/customer.service");

const getCustomerTool = async()=>{
    const customer = await customerService.getAllCustomersService();

    return customer
}

const createCustomerTool = async()=>{
    const customer = await customerService.getAllCustomersService();

    return customer;
}

const getCustomerByIdTool = async()=>{
    const customer = await customerService.getCustomerByIdService();
    return customer;
}

const updateCustomerTool = async()=>{
    const customer = await customerService.updateCustomerService();
}

const changeCustomerStatusTool = async()=>{
    const customer = await customerService.changeCustomerStatusService();
    return customer;
}

module.exports = {
  getCustomerTool,
  createCustomerTool,
  getCustomerByIdTool,
  updateCustomerTool,
  changeCustomerStatusTool,
};