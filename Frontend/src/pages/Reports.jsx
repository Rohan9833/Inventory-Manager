import { useState } from "react";
import "../css/Reports.css";

import SalesReport from "../components/SalesReport.reports";
import ProductReport from "../components/ProductReport.reports";
import InventoryReport from "../components/InventoryReport.reports";
import CustomerReport from "../components/CustomerReport.reports";
import PaymentReport from "../components/PaymentReport.reports";

function Reports() {
  const [activeTab, setActiveTab] = useState("sales");

  const tabs = [
    {
      key: "sales",
      label: "Sales",
    },
    {
      key: "product",
      label: "Products",
    },
    {
      key: "inventory",
      label: "Inventory",
    },
    {
      key: "customer",
      label: "Customers",
    },
    {
      key: "payment",
      label: "Payments",
    },
  ];

  return (
    <div className="reports-page">
      {/* ==========================
          Header
      ========================== */}

      <div className="reports-header">
        <div className="reports-header-content">
          <h1 className="reports-title">Reports</h1>

          <p className="reports-subtitle">
            Analyze your sales, inventory, customers and payments
          </p>
        </div>
      </div>

      {/* ==========================
          Tabs
      ========================== */}

      <div className="reports-tabs-wrapper">
        <div className="reports-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`reports-tab ${
                activeTab === tab.key
                  ? "reports-tab-active"
                  : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ==========================
          Report Content
      ========================== */}

      <div className="reports-content">
        {activeTab === "sales" && <SalesReport />}

        {activeTab === "product" && <ProductReport />}

        {activeTab === "inventory" && <InventoryReport />}

        {activeTab === "customer" && <CustomerReport />}

        {activeTab === "payment" && <PaymentReport />}
      </div>
    </div>
  );
}

export default Reports;