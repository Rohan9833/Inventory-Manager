const reportservice = require("../services/report.service")


exports.getSalesReport = async (req, res, next) => {
  try {
    const report = await reportservice.getSalesReportService(req.user._id, req.query);

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};
exports.exportSalesReport = async (req, res, next) => {
  try {
    await reportservice.exportSalesReportService(req.user._id, req.query, res);
  } catch (error) {
    next(error);
  }
};
exports.getInventoryReport = async (req, res, next) => {
  try {
    const report = await reportservice.getInventoryReportService(
      req.user._id,
      req.query
    );

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};
exports.getCustomerReport = async (req, res, next) => {
  try {
    const report = await reportservice.getCustomerReportService(
      req.user._id,
      req.query
    );

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};
exports.getPaymentReport = async (req, res) => {
  try {
    const data = await reportservice.getPaymentReportService(req.user._id, req.query);

    return res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error("Get Payment Report Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


