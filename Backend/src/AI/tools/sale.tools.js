const saleService = require("../../services/sale.service");

// ==========================================
// GET SALES
// ==========================================

const getSalesTool = async (args, userId) => {
  const sales = await saleService.getAllSalesService(userId);

  return sales;
};

// ==========================================
// CREATE SALE
// ==========================================

const createSaleTool = async (args, userId) => {
  const sale = await saleService.createSaleService(
    args,
    userId
  );

  return sale;
};

// ==========================================
// GET SALE BY ID
// ==========================================

const getSaleByIdTool = async (args, userId) => {
  const sale = await saleService.getSaleByIdService(
    args.id,
    userId
  );

  return sale;
};

module.exports = {
  getSalesTool,
  createSaleTool,
  getSaleByIdTool,
};