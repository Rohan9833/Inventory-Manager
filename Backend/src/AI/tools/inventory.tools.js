const inventoryService = require("../../services/inventory.service");

const stockInTool = async (args, userId) => {
  const inventory = await inventoryService.stockIn(args, userId);

  return inventory;
};

const stockOutTool = async (args, userId) => {
  const inventory = await inventoryService.stockOut(args, userId);

  return inventory;
};

const getInventoryHistoryTool = async (args, userId) => {
  const history = await inventoryService.getInventoryHistory();

  return history;
};

module.exports = {
  stockInTool,
  stockOutTool,
  getInventoryHistoryTool,
};