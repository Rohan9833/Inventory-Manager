const express = require("express");

const {
  testAIController,
  chatController,
} = require("../controllers/ai.controller");

const router = express.Router();

router.get("/test", testAIController);

router.post("/chat", chatController);

module.exports = router;