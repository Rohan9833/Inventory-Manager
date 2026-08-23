const express = require("express");
const aiRoutes = require("./routes/ai.routes");

const aiApp = express();

aiApp.use(express.json());

aiApp.use("/", aiRoutes);

module.exports = aiApp;