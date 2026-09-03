const reportService = require("../../services/report.service");

// ==========================================
// SALES REPORT
// ==========================================

const getSalesReportTool = async (args, userId) => {
  const report = await reportService.getSalesReportService(
    userId,
    args
  );

  return report;
};

// ==========================================
// INVENTORY REPORT
// ==========================================

const getInventoryReportTool = async (args, userId) => {
  const report = await reportService.getInventoryReportService(
    userId,
    args
  );

  return report;
};

// ==========================================
// CUSTOMER REPORT
// ==========================================

const getCustomerReportTool = async (args, userId) => {
  const report = await reportService.getCustomerReportService(
    userId,
    args
  );

  return report;
};

// ==========================================
// PAYMENT REPORT
// ==========================================

const getPaymentReportTool = async (args, userId) => {
  const report = await reportService.getPaymentReportService(
    userId,
    args
  );

  return report;
};

// ==========================================
// PRODUCT REPORT
// ==========================================

const getProductReportTool = async (args, userId) => {
  const report = await reportService.getProductReportService(
    userId,
    args
  );

  return report;
};

module.exports = {
  getSalesReportTool,
  getInventoryReportTool,
  getCustomerReportTool,
  getPaymentReportTool,
  getProductReportTool,
};