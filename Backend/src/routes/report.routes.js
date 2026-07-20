const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/auth.middleware");


const reportcontroller = require("../controllers/report.controller")

router.get("/sales", verifyToken, reportcontroller.getSalesReport);
router.get("/sales/export", verifyToken, reportcontroller.exportSalesReport);
router.get("/inventory", verifyToken, reportcontroller.getInventoryReport);
router.get("/customers", verifyToken, reportcontroller.getCustomerReport);
router.get("/payment", verifyToken, reportcontroller.getPaymentReport);

module.exports = router;