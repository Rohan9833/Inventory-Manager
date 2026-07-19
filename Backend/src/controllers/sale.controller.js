const {
  createSaleService,
  getAllSalesService,
  getSaleByIdService,
} = require("../services/sale.service");

const createSale = async (req, res) => {
  try {
    const sale = await createSaleService(req.body, req.user._id);

    return res.status(201).json({
      success: true,
      message: "Sale created successfully",
      sale,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getAllSales = async (req, res) => {
  try {
    const sales = await getAllSalesService(req.user._id);

    return res.status(200).json({
      success: true,
      count: sales.length,
      sales,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const getSaleById = async (req, res) => {
  try {
    const sale = await getSaleByIdService(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      sale,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// const getAllSalesService = async (userId) => {
//   return await Sale.find({
//     createdBy: userId,
//   })
//     .populate("customer", "name phone")
//     .populate("items.product", "name")
//     .sort({ createdAt: -1 });
// };

// const getSaleByIdService = async (saleId, userId) => {
//   const sale = await Sale.findOne({
//     _id: saleId,
//     createdBy: userId,
//   })
//     .populate("customer", "name phone")
//     .populate("items.product", "name");

//   if (!sale) {
//     const error = new Error("Sale not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   return sale;
// };

module.exports = {
  createSale,
  getAllSales,
  getSaleById
};
