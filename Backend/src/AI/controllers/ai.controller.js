const { testAI, chatWithAI } = require("../services/ai.service");

// ==========================================
// TEST AI
// ==========================================

const testAIController = async (req, res) => {
  try {
    const response = await testAI();

    res.status(200).json({
      success: true,
      message: "AI connection successful",
      data: response,
    });
  } catch (error) {
    console.error("AI Test Error:", error);

    res.status(500).json({
      success: false,
      message: "AI connection failed",
      error: error.message,
    });
  }
};

// ==========================================
// CHAT
// ==========================================
const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await chatWithAI(message, req.user._id);

    res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: response,
    });
  } catch (error) {
    console.error("AI Chat Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
      error: error.message,
    });
  }
};
module.exports = {
  testAIController,
  chatController,
};
