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


