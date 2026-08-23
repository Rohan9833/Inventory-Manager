const { OpenAI } = require("openai");

const aiClient = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

module.exports = aiClient;