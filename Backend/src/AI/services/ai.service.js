const aiClient = require("../config/ai.config");

console.log("AI CLIENT:", aiClient);
console.log("AI CHAT:", aiClient?.chat);
console.log("AI COMPLETIONS:", aiClient?.chat?.completions);

// ==========================================
// TEST AI
// ==========================================

const testAI = async () => {
  const response = await aiClient.chat.completions.create({
    model: "nvidia/nemotron-3-ultra-550b-a55b",

    messages: [
      {
        role: "user",
        content: "Say hello in one short sentence.",
      },
    ],

    temperature: 0.7,
    max_tokens: 100,
  });

  return response.choices[0].message.content;
};

// ==========================================
// CHAT WITH AI
// ==========================================

const chatWithAI = async (message) => {
  const response = await aiClient.chat.completions.create({
    model: "nvidia/nemotron-3-ultra-550b-a55b",

    messages: [
      {
        role: "system",
        content: "You are an AI assistant for an Inventory Management System.",
      },
      {
        role: "user",
        content: message,
      },
    ],

    temperature: 0.3,
    max_tokens: 500,
  });

  return response.choices[0].message.content;
};

module.exports = {
  testAI,
  chatWithAI,
};
