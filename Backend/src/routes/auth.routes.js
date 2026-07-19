const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware.js")

const { loginUser,getProfile } = require("../controllers/auth.controller.js");

router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;
