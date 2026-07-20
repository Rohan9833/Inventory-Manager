const Sale = require("../models/sale.model");
const Inventory = require("../models/inventory.model");
const Customer = require("../models/customer.model");
const Product = require("../models/product.model");
const Payment = require("../models/payment.model");
const PDFDocument = require("pdfkit");

exports.exportSalesReportService = async (userId, query, res) => {
  const filter = {
    createdBy: userId,
  };

  // Date Filter
  if (query.startDate && query.endDate) {
    const startDate = new Date(query.startDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(query.endDate);
    endDate.setHours(23, 59, 59, 999);

    filter.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  // Customer Filter
  if (query.customer) {
    filter.customer = query.customer;
  }

  // Payment Status Filter
  if (query.paymentStatus) {
    filter.paymentStatus = query.paymentStatus.toUpperCase();
  }

  // Search
  if (query.search?.trim()) {
    const customers = await Customer.find({
      createdBy: userId,
      name: {
        $regex: query.search.trim(),
        $options: "i",
      },
    }).select("_id");

    if (customers.length > 0) {
      filter.customer = {
        $in: customers.map((customer) => customer._id),
      };
    } else {
      filter.customer = null;
    }
  }

  const sales = await Sale.find(filter).populate("customer", "name phone").sort({ createdAt: -1 });

  const doc = new PDFDocument({
    margin: 40,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=sales-report.pdf");

  doc.pipe(res);

  doc.fontSize(22).text("Sales Report", {
    align: "center",
  });

  doc.moveDown();

  sales.forEach((sale, index) => {
    doc.fontSize(12).text(`${index + 1}. Customer : ${sale.customer.name}`);
    doc.text(`Phone : ${sale.customer.phone}`);
    doc.text(`Total : ₹${sale.totalAmount}`);
    doc.text(`Payment : ${sale.paymentStatus}`);
    doc.text(`Date : ${new Date(sale.createdAt).toLocaleDateString()}`);

    doc.moveDown();
  });

  doc.end();
};
exports.getSalesReportService = async (userId, query) => {
  // ===========================
  // Pagination
  // ===========================

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  // ===========================
  // Dynamic Filter
  // ===========================

  const filter = {
    createdBy: userId,
  };

  // ===========================
  // Date Filter
  // ===========================

  if (query.startDate && query.endDate) {
    const startDate = new Date(query.startDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(query.endDate);
    endDate.setHours(23, 59, 59, 999);

    filter.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  // ===========================
  // Customer Filter
  // ===========================

  if (query.customer) {
    filter.customer = query.customer;
  }

  // ===========================
  // Search By Customer Name
  // ===========================

  if (query.search?.trim()) {
    const search = query.search.trim();

    const customers = await Customer.find({
      createdBy: userId,
      name: {
        $regex: search,
        $options: "i",
      },
    }).select("_id");

    if (customers.length > 0) {
      filter.customer = {
        $in: customers.map((customer) => customer._id),
      };
    } else {
      return {
        sales: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalRecords: 0,
          limit,
        },
      };
    }
  }

  // ===========================
  // Payment Status Filter
  // ===========================

  if (query.paymentStatus) {
    filter.paymentStatus = query.paymentStatus.toUpperCase();
  }

  // ===========================
  // Total Records
  // ===========================

  const totalRecords = await Sale.countDocuments(filter);

  // ===========================
  // Sorting
  // ===========================

  let sortOption = {
    createdAt: -1,
  };
  if (query.sort === "oldest") {
    sortOption = {
      createdAt: 1,
    };
  }

  if (query.sort === "amount_asc") {
    sortOption = {
      totalAmount: 1,
    };
  }

  if (query.sort === "amount_desc") {
    sortOption = {
      totalAmount: -1,
    };
  }

  // ===========================
  // Sales Data
  // ===========================

  const sales = await Sale.find(filter)
    .populate("customer", "name phone")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  // ===========================
  // Pagination
  // ===========================

  const totalPages = Math.ceil(totalRecords / limit);

  return {
    sales,
    pagination: {
      currentPage: page,
      totalPages,
      totalRecords,
      limit,
    },
  };
};
exports.getInventoryReportService = async (userId, query) => {
  // ===========================
  // Pagination
  // ===========================

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  // ===========================
  // Dynamic Filter
  // ===========================

  const filter = {
    createdBy: userId,
  };

  // ===========================
  // Date Filter
  // ===========================

  if (query.startDate || query.endDate) {
    filter.createdAt = {};

    if (query.startDate) {
      filter.createdAt.$gte = new Date(query.startDate);
    }

    if (query.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);

      filter.createdAt.$lte = endDate;
    }
  }

  // ===========================
  // Product Filter
  // ===========================

  if (query.product) {
    filter.product = query.product;
  }
  // ===========================
  // Search By Product Name
  // ===========================

  if (query.search?.trim()) {
    const search = query.search.trim();

    const products = await Product.find({
      createdBy: userId,
      name: {
        $regex: search,
        $options: "i",
      },
    }).select("_id");

    if (products.length > 0) {
      filter.product = {
        $in: products.map((product) => product._id),
      };
    } else {
      return {
        inventory: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalRecords: 0,
          limit,
        },
      };
    }
  }

  // ===========================
  // Type Filter
  // ===========================

  if (query.type) {
    filter.type = query.type.toUpperCase();
  }

  // ===========================
  // Total Records
  // ===========================

  const totalRecords = await Inventory.countDocuments(filter);

  // ===========================
  // Sorting
  // ===========================

  let sortOption = {
    createdAt: -1,
  };

  if (query.sort === "oldest") {
    sortOption = {
      createdAt: 1,
    };
  }

  if (query.sort === "quantity_asc") {
    sortOption = {
      quantity: 1,
    };
  }

  if (query.sort === "quantity_desc") {
    sortOption = {
      quantity: -1,
    };
  }

  // ===========================
  // Inventory Data
  // ===========================

  const inventory = await Inventory.find(filter)
    .populate("product", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  // ===========================
  // Pagination
  // ===========================

  const totalPages = Math.ceil(totalRecords / limit);

  return {
    inventory,
    pagination: {
      currentPage: page,
      totalPages,
      totalRecords,
      limit,
    },
  };
};

exports.getCustomerReportService = async (userId, query) => {
  // ===========================
  // Pagination
  // ===========================

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  // ===========================
  // Dynamic Filter
  // ===========================

  const filter = {
    createdBy: userId,
  };
  // ===========================
  // Date Filter
  // ===========================

  if (query.startDate || query.endDate) {
    filter.createdAt = {};

    if (query.startDate) {
      filter.createdAt.$gte = new Date(query.startDate);
    }

    if (query.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);

      filter.createdAt.$lte = endDate;
    }
  }

  // ===========================
  // Search
  // ===========================

  if (query.search?.trim()) {
    filter.name = {
      $regex: query.search.trim(),
      $options: "i",
    };
  }

  // ===========================
  // Balance Filter
  // ===========================

  if (query.balance === "pending") {
    filter.balance = {
      $gt: 0,
    };
  }

  if (query.balance === "clear") {
    filter.balance = 0;
  }
  // ===========================
  // Total Records
  // ===========================

  const totalRecords = await Customer.countDocuments(filter);
  let sortOption = {
    createdAt: -1,
  };

  if (query.sort === "oldest") {
    sortOption = {
      createdAt: 1,
    };
  }

  if (query.sort === "balance_asc") {
    sortOption = {
      balance: 1,
    };
  }

  if (query.sort === "balance_desc") {
    sortOption = {
      balance: -1,
    };
  }

  if (query.sort === "name_asc") {
    sortOption = {
      name: 1,
    };
  }

  if (query.sort === "name_desc") {
    sortOption = {
      name: -1,
    };
  }

  // ===========================
  // Customer Data
  // ===========================

  const customers = await Customer.find(filter).sort(sortOption).skip(skip).limit(limit);

  // ===========================
  // Pagination
  // ===========================

  const totalPages = Math.ceil(totalRecords / limit);

  return {
    customers,
    pagination: {
      currentPage: page,
      totalPages,
      totalRecords,
      limit,
    },
  };
};



exports.getPaymentReportService = async (userId, query) => {
  // ===========================
  // Pagination
  // ===========================

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  // ===========================
  // Filters
  // ===========================

  const filter = {
    createdBy: userId,
  };

  // Payment Method Filter
  if (query.paymentMethod) {
    filter.paymentMethod = query.paymentMethod;
  }

  // Date Filter
  if (query.startDate || query.endDate) {
    filter.createdAt = {};

    if (query.startDate) {
      filter.createdAt.$gte = new Date(query.startDate);
    }

    if (query.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = endDate;
    }
  }

  // ===========================
  // Search
  // ===========================

  const search = query.search?.trim();

  // ===========================
  // Aggregation Pipeline
  // ===========================

  const pipeline = [
    {
      $match: filter,
    },
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $unwind: "$customer",
    },
  ];

  // Customer Name Search
  if (search) {
    pipeline.push({
      $match: {
        "customer.name": {
          $regex: search,
          $options: "i",
        },
      },
    });
  }

  // ===========================
  // Sorting
  // ===========================

  const sort = query.sort === "oldest" ? 1 : -1;

  pipeline.push({
    $sort: {
      createdAt: sort,
    },
  });

  // ===========================
  // Total Records
  // ===========================

  const countPipeline = JSON.parse(JSON.stringify(pipeline));

  countPipeline.push({
    $count: "totalRecords",
  });

  const countResult = await Payment.aggregate(countPipeline);

  const totalRecords = countResult[0]?.totalRecords || 0;

  // ===========================
  // Pagination
  // ===========================

  pipeline.push(
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  );

  // ===========================
  // Project
  // ===========================

  pipeline.push({
    $project: {
      _id: 1,
      amount: 1,
      paymentMethod: 1,
      note: 1,
      createdAt: 1,
      customer: {
        _id: "$customer._id",
        name: "$customer.name",
      },
    },
  });

  // ===========================
  // Summary
  // ===========================

  const summaryPipeline = JSON.parse(JSON.stringify(pipeline)).filter(
    (stage) => !stage.$sort && !stage.$skip && !stage.$limit && !stage.$project,
  );

  summaryPipeline.push({
    $group: {
      _id: null,
      totalPayments: {
        $sum: 1,
      },
      totalAmount: {
        $sum: "$amount",
      },
      averagePayment: {
        $avg: "$amount",
      },
      highestPayment: {
        $max: "$amount",
      },
      lowestPayment: {
        $min: "$amount",
      },
    },
  });

  const summaryResult = await Payment.aggregate(summaryPipeline);

  const summary = summaryResult[0] || {
    totalPayments: 0,
    totalAmount: 0,
    averagePayment: 0,
    highestPayment: 0,
    lowestPayment: 0,
  };

  // ===========================
  // Get Payments
  // ===========================

  const payments = await Payment.aggregate(pipeline);

  // ===========================
  // Return Response
  // ===========================

  return {
    summary,
    pagination: {
      page,
      limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
    },
    payments,
  };
};
