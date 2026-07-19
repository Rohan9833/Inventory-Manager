const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const authRoutes = require("./routes/auth.routes")
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const customerRoutes = require("./routes/customer.routes");
const paymentRoutes = require("./routes/payment.routes");
const saleRoutes = require("./routes/sale.routes");
const dashboardRoutes = require("./routes/dashboard.routes")




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/dashboard", dashboardRoutes);


module.exports = app; 

