const Product = require("../models/product.model");
const Customer = require("../models/customer.model");
const Sale = require("../models/sale.model");

const getDashboardService = async (userId) => {
  // ===========================
  // Today's Date Range
  // ===========================

  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

  // ===========================
  // Dashboard Queries
  // ===========================

  const [
    totalProducts,
    totalCustomers,
    todayOrders,
    lowStockProducts,
    todayRevenue,
    monthlyRevenue,
    pendingAmount,
  ] = await Promise.all([
    Product.countDocuments({
    //   createdBy: userId,
      isDeleted: false,
    }),

    Customer.countDocuments({
      createdBy: userId,
    }),

    Sale.countDocuments({
      createdBy: userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),

    Product.countDocuments({
      createdBy: userId,
      isDeleted: false,
      quantity: {
        $lte: 5,
      },
    }),

    // ===========================
    // Today's Revenue
    // ===========================

    Sale.aggregate([
      {
        $match: {
          createdBy: userId,
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },

      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]),
    Sale.aggregate([
      {
        $match: {
          createdBy: userId,
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]),
    // ===========================
    // Pending Amount
    // ===========================

    Customer.aggregate([
      {
        $match: {
          createdBy: userId,
        },
      },
      {
        $group: {
          _id: null,
          pendingAmount: {
            $sum: "$balance",
          },
        },
      },
    ]),
  ]);
  const revenue = todayRevenue[0]?.totalRevenue || 0;
  const monthly = monthlyRevenue[0]?.totalRevenue || 0;
  const pending = pendingAmount[0]?.pendingAmount || 0;
  // ===========================
  // Response
  // ===========================

  return {
  totalProducts,
  totalCustomers,
  todayOrders,
  todayRevenue: revenue,
  monthlyRevenue: monthly,
  pendingAmount: pending,
  lowStockProducts,
};
};

module.exports = {
  getDashboardService,
};
