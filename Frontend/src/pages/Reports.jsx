import { useState } from "react";
import "../css/Reports.css";

import SalesReport from "../components/Reports/SalesReport.reports";
import ProductReport from "../components/Reports/ProductReport.reports";
import InventoryReport from "../components/Reports/InventoryReport.reports";
import CustomerReport from "../components/Reports/CustomerReport.reports";
import PaymentReport from "../components/Reports/PaymentReport.reports";
import HomeHeader from "../components/Home/HomeHeader";

function Reports() {
  const [activeTab, setActiveTab] = useState("sales");

  const tabs = [
    {
      key: "sales",
      label: "Sales Report",
      icon: "↗",
    },
    {
      key: "product",
      label: "Product Report",
      icon: "▣",
    },
    {
      key: "inventory",
      label: "Inventory Report",
      icon: "▤",
    },
    {
      key: "customer",
      label: "Customer Report",
      icon: "♙",
    },
    {
      key: "payment",
      label: "Payment Report",
      icon: "₹",
    },
  ];

  return (
    <div className="reports-page">

      <HomeHeader />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="reports-hero">

        <div className="reports-hero-content">

          <div className="reports-hero-text">

            <div className="reports-eyebrow">
              <span className="reports-eyebrow-dot"></span>
              REPORTS & INSIGHTS
            </div>

            <h1 className="reports-hero-title">
              Turn Your Data
              <br />
              Into <span>Growth</span>
            </h1>

            <p className="reports-hero-description">
              Get valuable insights into your sales, inventory,
              customers and payments. Filter, analyze and make
              better business decisions.
            </p>

            <div className="reports-hero-meta">

              <div className="reports-meta-item">
                <span className="reports-meta-icon">↗</span>
                <span>Track performance</span>
              </div>

              <div className="reports-meta-item">
                <span className="reports-meta-icon">◉</span>
                <span>Understand your business</span>
              </div>

            </div>

          </div>

          {/* Decorative report illustration */}

          <div className="reports-hero-visual">

            <div className="reports-chart-card">

              <div className="reports-chart-header">
                <span>Business Overview</span>
                <span className="reports-chart-menu">•••</span>
              </div>

              <div className="reports-chart-bars">

                <span style={{ height: "30%" }}></span>
                <span style={{ height: "48%" }}></span>
                <span style={{ height: "40%" }}></span>
                <span style={{ height: "62%" }}></span>
                <span style={{ height: "54%" }}></span>
                <span style={{ height: "78%" }}></span>
                <span style={{ height: "92%" }}></span>

              </div>

              <div className="reports-chart-line">
                <span>Sales growth</span>
                <strong>+18.4%</strong>
              </div>

            </div>

            <div className="reports-circle reports-circle-one"></div>
            <div className="reports-circle reports-circle-two"></div>

            <div className="reports-leaf reports-leaf-one"></div>
            <div className="reports-leaf reports-leaf-two"></div>
            <div className="reports-leaf reports-leaf-three"></div>

          </div>

        </div>

      </section>

      {/* =====================================================
          INSIGHT CARDS
      ===================================================== */}

      <section className="reports-insights">

        <div className="reports-insight-card">

          <div className="reports-insight-icon sales">
            ↗
          </div>

          <div>
            <span>Sales</span>
            <strong>Track Revenue</strong>
            <small>Monitor your business performance</small>
          </div>

        </div>

        <div className="reports-insight-card">

          <div className="reports-insight-icon product">
            □
          </div>

          <div>
            <span>Products</span>
            <strong>Know Your Stock</strong>
            <small>Understand product performance</small>
          </div>

        </div>

        <div className="reports-insight-card">

          <div className="reports-insight-icon customer">
            ♙
          </div>

          <div>
            <span>Customers</span>
            <strong>Know Your Customers</strong>
            <small>Track balances and relationships</small>
          </div>

        </div>

        <div className="reports-insight-card">

          <div className="reports-insight-icon payment">
            ₹
          </div>

          <div>
            <span>Payments</span>
            <strong>Follow Cash Flow</strong>
            <small>Monitor every payment</small>
          </div>

        </div>

      </section>

      {/* =====================================================
          REPORT TABS
      ===================================================== */}

      <section className="reports-tabs-section">

        <div className="reports-tabs-heading">

          <div>
            <span className="reports-section-label">
              BUSINESS REPORTS
            </span>

            <h2>
              Explore Your Data
            </h2>
          </div>

          <p>
            Select a report to analyze your business.
          </p>

        </div>

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

                <span className="reports-tab-icon">
                  {tab.icon}
                </span>

                <span>
                  {tab.label}
                </span>

              </button>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          ACTIVE REPORT
      ===================================================== */}

      <main className="reports-content">

        {activeTab === "sales" && (
          <SalesReport />
        )}

        {activeTab === "product" && (
          <ProductReport />
        )}

        {activeTab === "inventory" && (
          <InventoryReport />
        )}

        {activeTab === "customer" && (
          <CustomerReport />
        )}

        {activeTab === "payment" && (
          <PaymentReport />
        )}

      </main>

      {/* =====================================================
          BOTTOM DESIGN
      ===================================================== */}

      <section className="reports-bottom">

        <div className="reports-bottom-wave reports-wave-one"></div>
        <div className="reports-bottom-wave reports-wave-two"></div>

        <div className="reports-bottom-leaf reports-bottom-leaf-one"></div>
        <div className="reports-bottom-leaf reports-bottom-leaf-two"></div>

        <div className="reports-bottom-content">

          <div className="reports-bottom-heading">

            <span>
              SMARTER BUSINESS
            </span>

            <h2>
              Data Drives Better Decisions
            </h2>

            <p>
              Track. Analyze. Grow.
              <br />
              Make every business decision with confidence.
            </p>

          </div>

          <div className="reports-bottom-features">

            <div className="reports-bottom-feature">

              <div className="reports-bottom-feature-icon">
                ↗
              </div>

              <div>
                <strong>
                  Better Insights
                </strong>

                <span>
                  Make better decisions
                </span>
              </div>

            </div>

            <div className="reports-bottom-feature">

              <div className="reports-bottom-feature-icon">
                ♙
              </div>

              <div>
                <strong>
                  Understand Customers
                </strong>

                <span>
                  Build stronger relationships
                </span>
              </div>

            </div>

            <div className="reports-bottom-feature">

              <div className="reports-bottom-feature-icon">
                □
              </div>

              <div>
                <strong>
                  Optimize Inventory
                </strong>

                <span>
                  Reduce waste and improve profit
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Reports;