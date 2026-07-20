const Sale = require("../models/sale.model");
const Customer = require("../models/customer.model");
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
  // Total Records
  // ===========================

  const totalRecords = await Inventory.countDocuments(filter);

  // ===========================
  // Inventory Data
  // ===========================

  const inventory = await Inventory.find(filter)
    .populate("product", "name")
    .sort({ createdAt: -1 })
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


