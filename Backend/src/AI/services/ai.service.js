const aiClient = require("../config/ai.config");

const {
  getProductsTool,
  createProductTool,
  getProductByIdTool,
  updateProductTool,
  deleteProductTool,
  restoreProductTool,
} = require("../tools/product.tools");
const { stockInTool, stockOutTool, getInventoryHistoryTool } = require("../tools/inventory.tools");
const {
  getCategoriesTool,
  getCategoryByIdTool,
  createCategoryTool,
  updateCategoryTool,
  changeCategoryStatusTool,
} = require("../tools/category.tools");

const {
  getCustomerTool,
  createCustomerTool,
  getCustomerByIdTool,
  updateCustomerTool,
  changeCustomerStatusTool,
} = require("../tools/customer.tool");
const {
  createPaymentTool,
  getPaymentsTool,
  getPaymentByIdTool,
  updatePaymentTool,
  deletePaymentTool,
} = require("../tools/payment.tool.js");
const {
  getSalesReportTool,
  getInventoryReportTool,
  getCustomerReportTool,
  getPaymentReportTool,
  getProductReportTool,
} = require("../tools/report.tool");
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
            description: "Name of the product",
          },

          category: {
            type: "string",
            description:
              "Name of the existing category the product belongs to",
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

  {
    type: "function",

    function: {
      name: "get_product_by_id",

      description: "Get a specific product by its MongoDB ID.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the product.",
          },
        },

        required: ["id"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "update_product",

      description:
        "Update an existing product's information such as name, category, cost price, selling price, or quantity.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the product.",
          },

          name: {
            type: "string",
            description: "Updated name of the product.",
          },

          category: {
            type: "string",
            description: "Updated name of the existing category.",
          },

          costPrice: {
            type: "number",
            description: "Updated purchase/cost price.",
          },

          sellingPrice: {
            type: "number",
            description: "Updated selling price.",
          },

          quantity: {
            type: "number",
            description: "Updated quantity of the product.",
          },
        },

        required: ["id"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "delete_product",

      description:
        "Delete an existing product from the inventory management system. Use this when the user explicitly asks to delete or remove a product.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the product.",
          },
        },

        required: ["id"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "restore_product",

      description:
        "Restore a previously deleted product in the inventory management system. Use this when the user explicitly asks to restore or recover a deleted product.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the product.",
          },
        },

        required: ["id"],
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

      description: "Get a specific category by its MongoDB ID.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the category.",
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

      description: "Create a new category in the inventory management system.",

      parameters: {
        type: "object",

        properties: {
          name: {
            type: "string",
            description: "Name of the new category.",
          },

          description: {
            type: "string",
            description: "Optional description of the category.",
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

      description: "Update an existing category's name or description.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the category.",
          },

          name: {
            type: "string",
            description: "New category name.",
          },

          description: {
            type: "string",
            description: "New category description.",
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

      description: "Activate or deactivate an existing category.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the category.",
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

  // ==========================================
  // CUSTOMERS
  // ==========================================

  {
    type: "function",

    function: {
      name: "get_customers",

      description:
        "Get all customers from the inventory management system. Use this when the user asks to see, list, show, or find customers.",

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
      name: "create_customer",

      description:
        "Create a new customer in the inventory management system.",

      parameters: {
        type: "object",

        properties: {
          name: {
            type: "string",
            description: "Name of the customer.",
          },

          phone: {
            type: "string",
            description: "Phone number of the customer.",
          },

          email: {
            type: "string",
            description: "Email address of the customer.",
          },

          address: {
            type: "string",
            description: "Address of the customer.",
          },
        },

        required: ["name", "phone"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "get_customer_by_id",

      description: "Get a specific customer by their MongoDB ID.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the customer.",
          },
        },

        required: ["id"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "update_customer",

      description: "Update an existing customer's information.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the customer.",
          },

          name: {
            type: "string",
            description: "Updated customer name.",
          },

          phone: {
            type: "string",
            description: "Updated customer phone number.",
          },

          email: {
            type: "string",
            description: "Updated customer email.",
          },

          address: {
            type: "string",
            description: "Updated customer address.",
          },
        },

        required: ["id"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "change_customer_status",

      description: "Activate or deactivate an existing customer.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the customer.",
          },

          isActive: {
            type: "boolean",
            description:
              "true to activate the customer, false to deactivate the customer.",
          },
        },

        required: ["id", "isActive"],
      },
    },
  },

  // ==========================================
  // INVENTORY
  // ==========================================

  {
    type: "function",

    function: {
      name: "stock_in",

      description:
        "Add stock to a product in the inventory. Use this when the user explicitly asks to add, receive, increase, or stock in product quantity.",

      parameters: {
        type: "object",

        properties: {
          product: {
            type: "string",
            description: "MongoDB ID of the product.",
          },

          quantity: {
            type: "number",
            description: "Quantity of stock to add.",
          },

          note: {
            type: "string",
            description: "Optional note for the stock-in transaction.",
          },
        },

        required: ["product", "quantity"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "stock_out",

      description:
        "Remove stock from a product in the inventory. Use this when the user explicitly asks to remove, decrease, sell, or stock out product quantity.",

      parameters: {
        type: "object",

        properties: {
          product: {
            type: "string",
            description: "MongoDB ID of the product.",
          },

          quantity: {
            type: "number",
            description: "Quantity of stock to remove.",
          },

          note: {
            type: "string",
            description: "Optional note for the stock-out transaction.",
          },
        },

        required: ["product", "quantity"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "get_inventory_history",

      description:
        "Get inventory stock movement history. Use this when the user asks to see, list, show, or check inventory stock in and stock out history.",

      parameters: {
        type: "object",

        properties: {},

        required: [],
      },
    },
  },

  // ==========================================
  // PAYMENTS
  // ==========================================

  {
    type: "function",

    function: {
      name: "create_payment",

      description:
        "Create a new customer payment. Use this when the user explicitly asks to record, add, or receive a payment from a customer.",

      parameters: {
        type: "object",

        properties: {
          customer: {
            type: "string",
            description: "MongoDB ID of the customer.",
          },

          amount: {
            type: "number",
            description: "Payment amount.",
          },

          paymentMethod: {
            type: "string",
            description:
              "Payment method used by the customer, such as cash, UPI, card, or bank transfer.",
          },

          note: {
            type: "string",
            description: "Optional note for the payment.",
          },
        },

        required: ["customer", "amount", "paymentMethod"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "get_payments",

      description:
        "Get all customer payments from the inventory management system. Use this when the user asks to see, list, show, or check payments.",

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
      name: "get_payment_by_id",

      description:
        "Get a specific customer payment by its MongoDB ID.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the payment.",
          },
        },

        required: ["id"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "update_payment",

      description:
        "Update an existing customer payment's amount, payment method, or note.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the payment.",
          },

          amount: {
            type: "number",
            description: "Updated payment amount.",
          },

          paymentMethod: {
            type: "string",
            description: "Updated payment method.",
          },

          note: {
            type: "string",
            description: "Updated payment note.",
          },
        },

        required: ["id"],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "delete_payment",

      description:
        "Delete an existing customer payment. Use this when the user explicitly asks to delete or remove a payment.",

      parameters: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "MongoDB ID of the payment.",
          },
        },

        required: ["id"],
      },
    },
  },

  // ==========================================
  // REPORTS
  // ==========================================

  {
    type: "function",

    function: {
      name: "get_sales_report",

      description:
        "Get a sales report from the inventory management system. Use this when the user asks for sales, revenue, sales summary, or sales performance.",

      parameters: {
        type: "object",

        properties: {
          startDate: {
            type: "string",
            description:
              "Optional start date for the report in YYYY-MM-DD format.",
          },

          endDate: {
            type: "string",
            description:
              "Optional end date for the report in YYYY-MM-DD format.",
          },
        },

        required: [],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "get_inventory_report",

      description:
        "Get an inventory report showing stock and inventory information. Use this when the user asks for an inventory report, stock report, or inventory summary.",

      parameters: {
        type: "object",

        properties: {
          startDate: {
            type: "string",
            description:
              "Optional start date for the report in YYYY-MM-DD format.",
          },

          endDate: {
            type: "string",
            description:
              "Optional end date for the report in YYYY-MM-DD format.",
          },
        },

        required: [],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "get_customer_report",

      description:
        "Get a customer report from the inventory management system. Use this when the user asks for customer statistics, customer summary, or customer report.",

      parameters: {
        type: "object",

        properties: {
          startDate: {
            type: "string",
            description:
              "Optional start date for the report in YYYY-MM-DD format.",
          },

          endDate: {
            type: "string",
            description:
              "Optional end date for the report in YYYY-MM-DD format.",
          },
        },

        required: [],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "get_payment_report",

      description:
        "Get a payment report from the inventory management system. Use this when the user asks for payment summary, payment statistics, or payment report.",

      parameters: {
        type: "object",

        properties: {
          startDate: {
            type: "string",
            description:
              "Optional start date for the report in YYYY-MM-DD format.",
          },

          endDate: {
            type: "string",
            description:
              "Optional end date for the report in YYYY-MM-DD format.",
          },
        },

        required: [],
      },
    },
  },

  {
    type: "function",

    function: {
      name: "get_product_report",

      description:
        "Get a product report from the inventory management system. Use this when the user asks for product statistics, product performance, or product report.",

      parameters: {
        type: "object",

        properties: {
          startDate: {
            type: "string",
            description:
              "Optional start date for the report in YYYY-MM-DD format.",
          },

          endDate: {
            type: "string",
            description:
              "Optional end date for the report in YYYY-MM-DD format.",
          },
        },

        required: [],
      },
    },
  },
];
// ==========================================
// TOOL EXECUTOR
// ==========================================

const executeTool = async (toolName, toolArguments, userId) => {
  switch (toolName) {
    // ==============================
    // PRODUCTS
    // ==============================

    case "get_products":
      return await getProductsTool(toolArguments, userId);

    case "create_product":
      return await createProductTool(toolArguments, userId);

    case "get_product_by_id":
      return await getProductByIdTool(toolArguments, userId);

    case "update_product":
      return await updateProductTool(toolArguments, userId);

    case "delete_product":
      return await deleteProductTool(toolArguments, userId);

    case "restore_product":
      return await restoreProductTool(toolArguments, userId);

    // ==============================
    // CATEGORIES
    // ==============================

    case "get_categories":
      return await getCategoriesTool(toolArguments, userId);

    case "get_category_by_id":
      return await getCategoryByIdTool(toolArguments, userId);

    case "create_category":
      return await createCategoryTool(toolArguments, userId);

    case "update_category":
      return await updateCategoryTool(toolArguments, userId);

    case "change_category_status":
      return await changeCategoryStatusTool(toolArguments, userId);

    // ==============================
    // CUSTOMERS
    // ==============================

    case "get_customers":
      return await getCustomerTool(toolArguments, userId);

    case "create_customer":
      return await createCustomerTool(toolArguments, userId);

    case "get_customer_by_id":
      return await getCustomerByIdTool(toolArguments, userId);

    case "update_customer":
      return await updateCustomerTool(toolArguments, userId);

    case "change_customer_status":
      return await changeCustomerStatusTool(toolArguments, userId);

    // ==============================
    // INVENTORY
    // ==============================

    case "stock_in":
      return await stockInTool(toolArguments, userId);

    case "stock_out":
      return await stockOutTool(toolArguments, userId);

    case "get_inventory_history":
      return await getInventoryHistoryTool(toolArguments, userId);

    // ==============================
    // PAYMENTS
    // ==============================

    case "create_payment":
      return await createPaymentTool(toolArguments, userId);

    case "get_payments":
      return await getPaymentsTool(toolArguments, userId);

    case "get_payment_by_id":
      return await getPaymentByIdTool(toolArguments, userId);

    case "update_payment":
      return await updatePaymentTool(toolArguments, userId);

    case "delete_payment":
      return await deletePaymentTool(toolArguments, userId);

    // ==============================
    // REPORTS
    // ==============================

    case "get_sales_report":
      return await getSalesReportTool(toolArguments, userId);

    case "get_inventory_report":
      return await getInventoryReportTool(toolArguments, userId);

    case "get_customer_report":
      return await getCustomerReportTool(toolArguments, userId);

    case "get_payment_report":
      return await getPaymentReportTool(toolArguments, userId);

    case "get_product_report":
      return await getProductReportTool(toolArguments, userId);

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

const chatWithAI = async (message, userId) => {
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

7. Never ask the user for their userId.

8. The userId is provided internally by the backend
   and must never be generated or modified by the AI.

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
CUSTOMER OPERATIONS
==========================================

Use customer tools when the user asks about customers.

Examples:

"mere saare customers dikha"
→ get_customers

"Rohan naam ka customer bana"
→ create_customer

"customer ki details dikha"
→ get_customer_by_id

"customer ka phone update kar"
→ update_customer

"customer deactivate kar"
→ change_customer_status

Do not invent customer information.

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

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    console.log(`\n========== AI ROUND ${round + 1} ==========`);

    const response = await aiClient.chat.completions.create({
      model: MODEL,

      messages,

      tools,

      tool_choice: "auto",

      temperature: 0.3,

      max_tokens: 10000,
    });

    const assistantMessage = response.choices[0].message;

    // ==========================================
    // NO MORE TOOLS
    // ==========================================

    if (!assistantMessage.tool_calls || assistantMessage.tool_calls.length === 0) {
      console.log("AI FINAL RESPONSE GENERATED");

      return assistantMessage.content;
    }

    // ==========================================
    // ADD AI RESPONSE
    // ==========================================

    messages.push(assistantMessage);

    // ==========================================
    // EXECUTE ALL TOOL CALLS
    // ==========================================

    for (const toolCall of assistantMessage.tool_calls) {
      const toolName = toolCall.function.name;

      let toolArguments = {};

      try {
        toolArguments = toolCall.function.arguments ? JSON.parse(toolCall.function.arguments) : {};
      } catch (error) {
        console.error("Tool arguments parse error:", error);

        throw new Error("Invalid tool arguments generated by AI.");
      }

      console.log("------------------------------------");

      console.log("AI TOOL:", toolName);

      console.log("AI TOOL ARGUMENTS:", toolArguments);

      console.log("AI USER ID:", userId);

      // ==========================================
      // EXECUTE TOOL
      // ==========================================

      let toolResult;

      try {
        toolResult = await executeTool(toolName, toolArguments, userId);

        console.log("AI TOOL SUCCESS:", toolName);

        console.log("AI TOOL RESULT:", toolResult);
      } catch (error) {
        console.error("AI TOOL ERROR:", error);

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

        content: JSON.stringify(toolResult),
      });
    }

    console.log(`========== END ROUND ${round + 1} ==========`);
  }

  throw new Error("AI reached the maximum number of tool execution rounds.");
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  testAI,
  chatWithAI,
};
