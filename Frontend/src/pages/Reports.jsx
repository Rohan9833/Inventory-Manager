import { useState } from "react";

import SalesReport from "../components/SalesReport.reports";
import ProductReport from "../components/ProductReport.reports";
import InventoryReport from "../components/InventoryReport.reports";
import CustomerReport from "../components/CustomerReport.reports";
import PaymentReport from "../components/PaymentReport.reports";

function Reports() {
  const [activeTab, setActiveTab] =
    useState("sales");

  return (
    <div>
      <h1>Reports</h1>

      {/* ==========================
          Tabs
      ========================== */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() =>
            setActiveTab("sales")
          }
        >
          Sales
        </button>

        <button
          onClick={() =>
            setActiveTab("product")
          }
        >
          Products
        </button>

        <button
          onClick={() =>
            setActiveTab("inventory")
          }
        >
          Inventory
        </button>

        <button
          onClick={() =>
            setActiveTab("customer")
          }
        >
          Customers
        </button>

        <button
          onClick={() =>
            setActiveTab("payment")
          }
        >
          Payments
        </button>
      </div>

      {/* ==========================
          Report Content
      ========================== */}

      {activeTab === "sales" && (
        <SalesReport />
      )}

      {activeTab === "product" && (
        <ProductReport />
      )}

      {activeTab ===
        "inventory" && (
        <InventoryReport />
      )}

      {activeTab ===
        "customer" && (
        <CustomerReport />
      )}

      {activeTab ===
        "payment" && (
        <PaymentReport />
      )}
    </div>
  );
}

export default Reports;