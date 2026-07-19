const inventoryService = require("../services/inventory.service");

exports.stockIn = async (req, res) => {
  try {
    const inventory = await inventoryService.stockIn(req.body,req.user._id);

    return res.status(201).json({
      success: true,
      message: "Stock added successfully",
      data: inventory,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.stockOut = async (req, res) => {
  try {
    const inventory = await inventoryService.stockOut(req.body,req.user._id);

    return res.status(201).json({
      success: true,
      message: "Stock removed successfully",
      data: inventory,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInventoryHistory = async (req, res) => {
  try {
    const history = await inventoryService.getInventoryHistory();

    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};