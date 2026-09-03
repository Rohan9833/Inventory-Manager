const { OpenAI } = require("openai");

const aiClient = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: process.env.AI_BASE_URL || "https://integrate.api.nvidia.com/v1",
});

module.exports = aiClient;