const aiClient = require("../config/ai.config");

const {
  getProductsTool,
  createProductTool,
} = require("../tools/product.tools");

const {
  getCategoriesTool,
  getCategoryByIdTool,
  createCategoryTool,
  updateCategoryTool,
  changeCategoryStatusTool,
} = require("../tools/category.tools");

// ==========================================
// DEBUG
// ==========================================

console.log("AI CLIENT:", !!aiClient);
console.log("AI CHAT:", !!aiClient?.chat);
console.log(
  "AI COMPLETIONS:",
  !!aiClient?.chat?.completions
);

// ==========================================
// MODEL
// ==========================================

const MODEL =
  "nvidia/nemotron-3-ultra-550b-a55b";

// ==========================================
// AI TOOLS
// ==========================================

const tools = [
  // ==========================================
  // PRODUCTS
  // ==========================================

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
            description:
              "Name of the product",
          },

          category: {
            type: "string",
            description:
              "Name of the existing category the product belongs to",
          },

          costPrice: {
            type: "number",
            description:
              "Purchase/cost price of the product",
          },

          sellingPrice: {
            type: "number",
            description:
              "Selling price of the product",
          },

          quantity: {
            type: "number",
            description:
              "Initial quantity of the product",
          },
        },

        required: [
          "name",
          "category",
          "costPrice",
          "sellingPrice",
          "quantity",
        ],
      },
    },
  },

  // ==========================================
  // CATEGORIES
  // ==========================================

  {
    type: "function",

    function: {
      name: "get_categories",

      description:
        "Get categories from the inventory management system. Use this when the user asks to see, list, show, or find categories. Also use this before creating a product when you need to check whether a requested category exists.",

      parameters: {
        type: "object",

        properties: {
          active: {
            type: "boolean",
            description:
              "Optional. If true, return only active categories. If false, return only inactive categories.",
          },
        },

        required: [],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "get_category_by_id",

      description:
        "Get a specific category by its MongoDB ID.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description:
              "MongoDB ID of the category.",
          },
        },

        required: ["id"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "create_category",

      description:
        "Create a new category in the inventory management system.",

      parameters: {
        type: "object",

        properties: {
          name: {
            type: "string",
            description:
              "Name of the new category.",
          },

          description: {
            type: "string",
            description:
              "Optional description of the category.",
          },
        },

        required: ["name"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "update_category",

      description:
        "Update an existing category's name or description.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description:
              "MongoDB ID of the category.",
          },

          name: {
            type: "string",
            description:
              "New category name.",
          },

          description: {
            type: "string",
            description:
              "New category description.",
          },
        },

        required: ["id"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "change_category_status",

      description:
        "Activate or deactivate an existing category.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description:
              "MongoDB ID of the category.",
          },

          isActive: {
            type: "boolean",
            description:
              "true to activate the category, false to deactivate it.",
          },
        },

        required: ["id", "isActive"],
      },
    },
  },
];

// ==========================================
// TOOL EXECUTOR
// ==========================================

const executeTool = async (
  toolName,
  toolArguments
) => {
  switch (toolName) {
    // ==============================
    // PRODUCTS
    // ==============================

    case "get_products":
      return await getProductsTool(
        toolArguments
      );

    case "create_product":
      return await createProductTool(
        toolArguments
      );

    // ==============================
    // CATEGORIES
    // ==============================

    case "get_categories":
      return await getCategoriesTool(
        toolArguments
      );

    case "get_category_by_id":
      return await getCategoryByIdTool(
        toolArguments
      );

    case "create_category":
      return await createCategoryTool(
        toolArguments
      );

    case "update_category":
      return await updateCategoryTool(
        toolArguments
      );

    case "change_category_status":
      return await changeCategoryStatusTool(
        toolArguments
      );

    default:
      throw new Error(
        `Unknown AI tool: ${toolName}`
      );
  }
};

// ==========================================
// TEST AI
// ==========================================

const testAI = async () => {
  const response =
    await aiClient.chat.completions.create({
      model: MODEL,

      messages: [
        {
          role: "user",
          content:
            "Say hello in one short sentence.",
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

You can manage:

- Products
- Categories
- Inventory
- Customers
- Sales
- Payments
- Reports

==========================================
LANGUAGE
==========================================

Understand:

- English
- Hindi
- Hinglish
- Roman Hindi
- Mixed English/Hindi
- Informal conversational language

Always understand the user's intent regardless of
language or spelling style.

Respond naturally in the user's language.

==========================================
IMPORTANT TOOL RULES
==========================================

1. Never invent database information.

2. When the user asks for actual database information,
   use the appropriate tool.

3. Never claim an operation succeeded unless the
   corresponding tool actually succeeded.

4. Never invent missing values.

5. If required information is missing, ask the user.

6. For dependent operations, perform the required
   operations step by step.

==========================================
DEPENDENT OPERATIONS
==========================================

If the user asks to create a product and specifies a
category:

FIRST check whether that category already exists.

Use:

get_categories

If the category exists:

→ create the product.

If the category does NOT exist:

→ create the category first.
→ wait for the category creation result.
→ then create the product.

Example:

User:
"Samsung phone bana, category Android Phones hai.
Agar category nahi hai toh bana dena."

Correct flow:

get_categories
↓
Check Android Phones
↓
If missing:
create_category
↓
Wait for result
↓
create_product
↓
Final response

Do NOT try to create the product before ensuring that
its category exists.

==========================================
MULTI-STEP OPERATIONS
==========================================

You are allowed to use multiple tools and multiple
rounds of tool calls for one user request.

After receiving a tool result, think again about whether
another tool is required to complete the user's request.

Continue using tools until the user's requested task
is completely finished.

Only provide the final response after all required
operations are completed.

==========================================
RESPONSE STYLE
==========================================

Keep responses concise and conversational.

If the user speaks Hinglish, respond in Hinglish.

If the user speaks Hindi, respond in Hindi.

If the user speaks English, respond in English.

Do not expose internal tool names, schemas, MongoDB IDs,
or implementation details unless explicitly asked.
`,
    },

    {
      role: "user",
      content: message,
    },
  ];

  // ==========================================
  // MULTI-STEP TOOL LOOP
  // ==========================================

  const MAX_TOOL_ROUNDS = 10;

  for (
    let round = 0;
    round < MAX_TOOL_ROUNDS;
    round++
  ) {
    console.log(
      `\n========== AI ROUND ${
        round + 1
      } ==========`
    );

    const response =
      await aiClient.chat.completions.create({
        model: MODEL,

        messages,

        tools,

        tool_choice: "auto",

        temperature: 0.3,

        max_tokens: 1000,
      });

    const assistantMessage =
      response.choices[0].message;

    // ==========================================
    // NO MORE TOOLS
    // ==========================================

    if (
      !assistantMessage.tool_calls ||
      assistantMessage.tool_calls.length === 0
    ) {
      console.log(
        "AI FINAL RESPONSE GENERATED"
      );

      return assistantMessage.content;
    }

    // ==========================================
    // ADD ASSISTANT TOOL CALL MESSAGE
    // ==========================================

    messages.push(assistantMessage);

    // ==========================================
    // EXECUTE ALL TOOL CALLS
    // ==========================================

    for (const toolCall of assistantMessage.tool_calls) {
      const toolName =
        toolCall.function.name;

      let toolArguments = {};

      try {
        toolArguments =
          toolCall.function.arguments
            ? JSON.parse(
                toolCall.function.arguments
              )
            : {};
      } catch (error) {
        console.error(
          "Tool arguments parse error:",
          error
        );

        throw new Error(
          "Invalid tool arguments generated by AI."
        );
      }

      console.log(
        "------------------------------------"
      );

      console.log(
        "AI TOOL:",
        toolName
      );

      console.log(
        "AI TOOL ARGUMENTS:",
        toolArguments
      );

      // ==========================================
      // EXECUTE TOOL
      // ==========================================

      let toolResult;

      try {
        toolResult =
          await executeTool(
            toolName,
            toolArguments
          );

        console.log(
          "AI TOOL SUCCESS:",
          toolName
        );

        console.log(
          "AI TOOL RESULT:",
          toolResult
        );
      } catch (error) {
        console.error(
          "AI TOOL ERROR:",
          error
        );

        toolResult = {
          success: false,
          error: error.message,
        };
      }

      // ==========================================
      // SEND RESULT BACK TO AI
      // ==========================================

      messages.push({
        role: "tool",

        tool_call_id: toolCall.id,

        content:
          JSON.stringify(toolResult),
      });
    }

    console.log(
      `========== END ROUND ${
        round + 1
      } ==========`
    );
  }

  throw new Error(
    "AI reached the maximum number of tool execution rounds."
  );
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  testAI,
  chatWithAI,
};