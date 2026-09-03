const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware")
const {
  testAIController,
  chatController,
} = require("../controllers/ai.controller");

const router = express.Router();

router.get("/test", testAIController);

router.post("/chat", authMiddleware,chatController);

module.exports = router;