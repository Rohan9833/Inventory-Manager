import { useEffect, useState } from "react";

import InventoryForm from "../components/Inventory/InventoryForm.inventory";
import InventoryTable from "../components/Inventory/InventoryTable.inventory";
import HomeHeader from "../components/Home/HomeHeader";

import {
  stockIn,
  stockOut,
  getInventoryHistory,
} from "../api/inventory.api";

import { getProducts } from "../api/product.api";

import "../css/Inventory.css";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // =============================
  // Products
  // =============================

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      const activeProducts = response.data.filter(
        (product) => !product.isDeleted
      );

      setProducts(activeProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // =============================
  // History
  // =============================

  const fetchHistory = async () => {
    try {
      const response = await getInventoryHistory();

      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // =============================
  // Stock In
  // =============================

  const handleStockIn = async (data) => {
    try {
      const response = await stockIn(data);

      alert(response.message);

      await fetchHistory();
      await fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // =============================
  // Stock Out
  // =============================

  const handleStockOut = async (data) => {
    try {
      const response = await stockOut(data);

      alert(response.message);

      await fetchHistory();
      await fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // =============================
  // Load Data
  // =============================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([
        fetchProducts(),
        fetchHistory(),
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="inventory-page">

      <HomeHeader />

      {/* =========================================
          PAGE HERO
      ========================================= */}

      <section className="inventory-page-hero">

        <div className="inventory-page-hero-content">

          <div className="inventory-breadcrumb">
            <span>Home</span>
            <span className="inventory-breadcrumb-arrow">›</span>
            <strong>Inventory</strong>
          </div>

          <div className="inventory-hero-text">
            <span className="inventory-hero-label">
              STOCK TODAY. GROW TOMORROW.
            </span>

            <h1>Inventory Management</h1>

            <p>
              Track your stock, manage transactions and never run out
              of what matters.
            </p>
          </div>

        </div>

        {/* Decorative warehouse */}
        <div className="inventory-hero-decoration">

          <div className="inventory-warehouse">

            <div className="inventory-box inventory-box-one"></div>
            <div className="inventory-box inventory-box-two"></div>
            <div className="inventory-box inventory-box-three"></div>
            <div className="inventory-box inventory-box-four"></div>
            <div className="inventory-box inventory-box-five"></div>

          </div>

          <div className="inventory-leaf inventory-leaf-one"></div>
          <div className="inventory-leaf inventory-leaf-two"></div>
          <div className="inventory-leaf inventory-leaf-three"></div>

          <div className="inventory-hero-quote">
            Stock
            <br />
            Smarter
            <br />
            Grow
            <br />
            Faster
          </div>

        </div>

      </section>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="inventory-main">

        {/* =======================================
            LEFT - HISTORY
        ======================================= */}

        <section className="inventory-history-area">

          <InventoryTable
            history={history}
            loading={loading}
          />

        </section>

        {/* =======================================
            RIGHT - FORM + STATS
        ======================================= */}

        <aside className="inventory-side-area">

          <InventoryForm
            products={products}
            onStockIn={handleStockIn}
            onStockOut={handleStockOut}
          />

          {/* =====================================
              QUICK STATS
          ===================================== */}

          {/* <section className="inventory-stats">

            <div className="inventory-stats-header">

              <div className="inventory-stats-title">

                <div className="inventory-stats-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 20V10" />
                    <path d="M10 20V4" />
                    <path d="M16 20v-7" />
                    <path d="M22 20H2" />
                  </svg>
                </div>

                <div>
                  <h2>Quick Stats</h2>
                  <p>Overview of your inventory</p>
                </div>

              </div>

              <div className="inventory-stats-period">
                This Month
                <span>⌄</span>
              </div>

            </div>

            <div className="inventory-stat-grid">

              <div className="inventory-stat-card inventory-stat-in">

                <div className="inventory-stat-card-icon">
                  ↓
                </div>

                <strong>
                  {history.filter(
                    (item) => item.type === "IN"
                  ).length}
                </strong>

                <span>Stock In</span>

              </div>

              <div className="inventory-stat-card inventory-stat-out">

                <div className="inventory-stat-card-icon">
                  ↑
                </div>

                <strong>
                  {history.filter(
                    (item) => item.type === "OUT"
                  ).length}
                </strong>

                <span>Stock Out</span>

              </div>

              <div className="inventory-stat-card inventory-stat-total">

                <div className="inventory-stat-card-icon">
                  📦
                </div>

                <strong>
                  {products.length}
                </strong>

                <span>Total Products</span>

              </div>

            </div>

          </section> */}

        </aside>

      </main>

    </div>
  );
}

export default Inventory;