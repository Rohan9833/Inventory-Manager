import { useEffect, useState } from "react";
import {
  ShoppingCart,
  FilePlus2,
  Calculator,
  CalendarDays,
  Search,
  Filter,
  Eye,
  Printer,
  ArrowLeft,
  ArrowRight,
  Users,
  Heart,
  Sprout,
} from "lucide-react";

import HomeHeader from "../components/Home/HomeHeader";
import SaleForm from "../components/Sales/SaleForm.sale";
import SaleTable from "../components/Sales/SaleTable.sale";

import { createSale, getSales } from "../api/sale.api";

import { getCustomers } from "../api/customer.api";
import { getProducts } from "../api/product.api";

import "../../src/css/Sale.css";

function Sale() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  // ==========================================
  // CUSTOMERS
  // ==========================================

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();

      const customerList =
        response.customers || response.data?.customers || response.data || [];

      setCustomers(
        Array.isArray(customerList)
          ? customerList.filter((customer) => customer.status)
          : [],
      );
    } catch (error) {
      console.log(error);
      setCustomers([]);
    }
  };

  // ==========================================
  // PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      const productList =
        response.products || response.data?.products || response.data || [];

      setProducts(
        Array.isArray(productList)
          ? productList.filter((product) => !product.isDeleted)
          : [],
      );
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  };

  // ==========================================
  // SALES
  // ==========================================

  const fetchSales = async () => {
    try {
      const response = await getSales();

      const saleList =
        response.sales || response.data?.sales || response.data || [];

      setSales(Array.isArray(saleList) ? saleList : []);
    } catch (error) {
      console.log(error);
      setSales([]);
    }
  };

  // ==========================================
  // CREATE SALE
  // ==========================================

  const handleCreate = async (data) => {
    try {
      const response = await createSale(data);

      alert(response.message || "Sale created successfully");

      await Promise.all([fetchSales(), fetchProducts(), fetchCustomers()]);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  // ==========================================
  // FILTER SALES
  // ==========================================

  const filteredSales = sales.filter((sale) => {
    const customerName = sale.customer?.name?.toLowerCase() || "";

    const saleId = sale.saleId?.toLowerCase() || sale._id?.toLowerCase() || "";

    const productNames =
      sale.items
        ?.map((item) => item.product?.name || "")
        .join(" ")
        .toLowerCase() || "";

    const matchesSearch =
      customerName.includes(search.toLowerCase()) ||
      saleId.includes(search.toLowerCase()) ||
      productNames.includes(search.toLowerCase());

    if (!matchesSearch) return false;

    const saleDate = new Date(sale.createdAt);
    const now = new Date();

    if (activeTab === "today") {
      return saleDate.toDateString() === now.toDateString();
    }

    if (activeTab === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);

      return saleDate >= weekAgo;
    }

    if (activeTab === "month") {
      return (
        saleDate.getMonth() === now.getMonth() &&
        saleDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });

  // ==========================================
  // LOAD
  // ==========================================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await Promise.all([fetchCustomers(), fetchProducts(), fetchSales()]);

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="sale-page">
      {/* ======================================
          HEADER
      ====================================== */}

      <HomeHeader />

      {/* ======================================
          PAGE CONTENT
      ====================================== */}

      <main className="sale-main">
        {/* Breadcrumb */}
        <div className="sale-breadcrumb">
          <span>Home</span>
          <span>›</span>
          <strong>Sales</strong>
        </div>

        {/* Page Header */}
        <section className="sale-page-header">
          <div className="sale-page-title-wrap">
            <div className="sale-page-icon">
              <ShoppingCart size={27} />
            </div>

            <div>
              <h1>Sales</h1>

              <p>Record today's sales and keep track of every transaction.</p>
            </div>
          </div>

          <div className="sale-date">
            <CalendarDays size={16} />

            <span>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </section>

        {/* ======================================
            SALE WORKSPACE
        ====================================== */}

        <section className="sale-workspace">
          <div className="sale-form-area">
            <div className="sale-section-heading">
              <div className="sale-section-heading-icon">
                <FilePlus2 size={20} />
              </div>

              <div>
                <h2>New Sale</h2>

                <p>Add customer, select products and complete the sale.</p>
              </div>
            </div>

            <SaleForm
              customers={customers}
              products={products}
              onCreate={handleCreate}
            />
          </div>

          {/* ==================================
              SUMMARY
          ================================== */}

          <div className="sale-summary-side">
            <div className="sale-summary-heading">
              <div className="sale-summary-heading-icon">
                <Calculator size={20} />
              </div>

              <div>
                <h2>Sale Summary</h2>

                <p>Review the details before completing the sale.</p>
              </div>
            </div>

            <div className="sale-live-summary">
              <div className="sale-live-row">
                <span>Subtotal</span>
                <strong>₹0.00</strong>
              </div>

              <div className="sale-live-row">
                <span>Discount</span>
                <strong>₹0.00</strong>
              </div>

              <div className="sale-live-total">
                <span>Total Amount</span>
                <strong>₹0.00</strong>
              </div>
            </div>

            <label className="sale-summary-label">
              Amount Paid <span>*</span>
            </label>

            <div className="sale-paid-box">
              <span>₹</span>

              <input type="number" placeholder="0.00" />
            </div>

            <div className="sale-remaining">
              <span>Remaining Due</span>

              <strong>₹0.00</strong>
            </div>

            <button className="sale-complete-btn" type="button">
              <Calculator size={18} />
              Complete Sale
            </button>

            <button className="sale-reset-btn" type="button">
              Reset
            </button>
          </div>
        </section>

        {/* ======================================
            SALES HISTORY
        ====================================== */}

        <section className="sale-history">
          <div className="sale-history-top">
            <div className="sale-tabs">
              <button
                className={activeTab === "all" ? "active" : ""}
                onClick={() => setActiveTab("all")}
              >
                All Sales
              </button>

              <button
                className={activeTab === "today" ? "active" : ""}
                onClick={() => setActiveTab("today")}
              >
                Today
              </button>

              <button
                className={activeTab === "week" ? "active" : ""}
                onClick={() => setActiveTab("week")}
              >
                This Week
              </button>

              <button
                className={activeTab === "month" ? "active" : ""}
                onClick={() => setActiveTab("month")}
              >
                This Month
              </button>
            </div>

            <div className="sale-history-actions">
              <div className="sale-history-search">
                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search sales by customer, product or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button className="sale-filter-btn">
                <Filter size={16} />
                Filter
              </button>
            </div>
          </div>

          <SaleTable sales={filteredSales} loading={loading} />
        </section>

        {/* ======================================
            BOTTOM GROWTH BANNER
        ====================================== */}

        <section className="sale-growth-banner">
          <div className="sale-growth-image" />

          <div className="sale-growth-content">
            <h2>Sales Drive Growth</h2>

            <p>Every sale is a step towards a bigger tomorrow.</p>
          </div>

          <div className="sale-growth-points">
            <div className="sale-growth-point">
              <div className="sale-growth-icon">
                <Users size={20} />
              </div>

              <div>
                <strong>More Sales</strong>
                <span>More Opportunities</span>
              </div>
            </div>

            <div className="sale-growth-point">
              <div className="sale-growth-icon">
                <Heart size={20} />
              </div>

              <div>
                <strong>Happier Customers</strong>
                <span>Stronger Relationships</span>
              </div>
            </div>

            <div className="sale-growth-point">
              <div className="sale-growth-icon">
                <Sprout size={20} />
              </div>

              <div>
                <strong>Bigger Tomorrow</strong>
                <span>Sustainable Growth</span>
              </div>
            </div>
          </div>

          <div className="sale-growth-quote">
            Keep
            <br />
            Growing
          </div>
        </section>
      </main>
    </div>
  );
}

export default Sale;
