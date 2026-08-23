const aiClient = require("../config/ai.config");

const { getProductsTool, createProductTool } = require("../tools/product.tools");

// ==========================================
// DEBUG
// ==========================================

console.log("AI CLIENT:", !!aiClient);
console.log("AI CHAT:", !!aiClient?.chat);
console.log("AI COMPLETIONS:", !!aiClient?.chat?.completions);

// ==========================================
// MODEL
// ==========================================

const MODEL = "nvidia/nemotron-3-ultra-550b-a55b";

// ==========================================
// AI TOOLS
// ==========================================
const tools = [
  {
    type: "function",

    function: {
      name: "get_products",

      description:
        "Get all products from the inventory management system. Use this when the user asks to see, list, show, or know about their products.",

      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "create_product",

      description:
        "Create a new product in the inventory management system. Use this when the user explicitly asks to add, create, or register a new product.",

      parameters: {
        type: "object",

        properties: {
          name: {
            type: "string",
            description: "Name of the product",
          },

          category: {
            type: "string",
            description: "Name of the existing category the product belongs to",
          },

          costPrice: {
            type: "number",
            description: "Purchase/cost price of the product",
          },

          sellingPrice: {
            type: "number",
            description: "Selling price of the product",
          },

          quantity: {
            type: "number",
            description: "Initial quantity of the product",
          },
        },

        required: ["name", "category", "costPrice", "sellingPrice", "quantity"],
      },
    },
  },
];

// ==========================================
// TOOL EXECUTOR
// ==========================================

const executeTool = async (toolName, toolArguments) => {
  switch (toolName) {
    case "get_products":
      return await getProductsTool(toolArguments);
    case "create_product":
      return await createProductTool(toolArguments);

    default:
      throw new Error(`Unknown AI tool: ${toolName}`);
  }
};

// ==========================================
// TEST AI
// ==========================================

const testAI = async () => {
  const response = await aiClient.chat.completions.create({
    model: MODEL,

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
  const messages = [
    {
      role: "system",

      content: `
You are an AI assistant for an Inventory Management System.

You can help the user with:

- Products
- Categories
- Inventory
- Customers
- Sales
- Payments
- Reports

You have access to tools that can retrieve and modify real
inventory management data.

IMPORTANT RULES:

1. Never invent database information.
2. When the user asks for actual inventory data, use the appropriate tool.
3. Do not claim that an operation was completed unless a tool actually completed it.
4. After receiving tool results, explain them naturally.
5. Keep responses concise and useful.
`,
    },

    {
      role: "user",
      content: message,
    },
  ];

  // ==========================================
  // FIRST AI REQUEST
  // ==========================================

  const firstResponse = await aiClient.chat.completions.create({
    model: MODEL,

    messages,

    tools,

    tool_choice: "auto",

    temperature: 0.3,

    max_tokens: 1000,
  });

  const assistantMessage = firstResponse.choices[0].message;

  // ==========================================
  // NO TOOL CALL
  // ==========================================

  if (!assistantMessage.tool_calls || assistantMessage.tool_calls.length === 0) {
    return assistantMessage.content;
  }

  // ==========================================
  // ADD AI RESPONSE
  // ==========================================

  messages.push(assistantMessage);

  // ==========================================
  // EXECUTE TOOL CALLS
  // ==========================================

  for (const toolCall of assistantMessage.tool_calls) {
    const toolName = toolCall.function.name;

    let toolArguments = {};

    try {
      toolArguments = toolCall.function.arguments ? JSON.parse(toolCall.function.arguments) : {};
    } catch (error) {
      console.log("Tool arguments parse error:", error);

      throw new Error("Invalid tool arguments generated by AI.");
    }

    console.log("====================================");

    console.log("AI TOOL:", toolName);

    console.log("AI TOOL ARGUMENTS:", toolArguments);

    // Execute actual backend operation
    const toolResult = await executeTool(toolName, toolArguments);

    console.log("AI TOOL RESULT RECEIVED");

    // ========================================
    // SEND TOOL RESULT BACK TO AI
    // ========================================

    messages.push({
      role: "tool",

      tool_call_id: toolCall.id,

      content: JSON.stringify(toolResult),
    });
  }

  // ==========================================
  // FINAL AI RESPONSE
  // ==========================================

  const finalResponse = await aiClient.chat.completions.create({
    model: MODEL,

    messages,

    temperature: 0.3,

    max_tokens: 1000,
  });

  return finalResponse.choices[0].message.content;
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  testAI,
  chatWithAI,
};
