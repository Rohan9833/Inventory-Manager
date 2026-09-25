import { useEffect, useMemo, useState } from "react";
import "../css/Customer.css";

import CustomerForm from "../components/Customer/CustomerForm.customer";
import CustomerTable from "../components/Customer/CustomerTable.customer";
import HomeHeader from "../components/Home/HomeHeader";

import {
  createCustomer,
  getCustomers,
  updateCustomer,
  changeCustomerStatus,
} from "../api/customer.api";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // ===========================
  // Fetch Customers
  // ===========================

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();

      const customerList =
        response.customers ||
        response.data?.customers ||
        response.data ||
        [];

      setCustomers(
        Array.isArray(customerList) ? customerList : []
      );
    } catch (error) {
      console.log(error);
      setCustomers([]);
    }
  };

  // ===========================
  // Create
  // ===========================

  const handleCreate = async (data) => {
    try {
      const response = await createCustomer(data);

      alert(response.message);

      await fetchCustomers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ===========================
  // Update
  // ===========================

  const handleUpdate = async (id, data) => {
    try {
      const response = await updateCustomer(id, data);

      alert(response.message);

      setEditingCustomer(null);

      await fetchCustomers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ===========================
  // Status
  // ===========================

  const handleStatus = async (id) => {
    try {
      const response = await changeCustomerStatus(id);

      alert(response.message);

      await fetchCustomers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ===========================
  // Filter
  // ===========================

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const text = search.toLowerCase();

      const matchesSearch =
        customer.name?.toLowerCase().includes(text) ||
        customer.phone?.toLowerCase().includes(text) ||
        customer.email?.toLowerCase().includes(text) ||
        customer.address?.toLowerCase().includes(text);

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && customer.status) ||
        (activeTab === "inactive" && !customer.status);

      return matchesSearch && matchesTab;
    });
  }, [customers, search, activeTab]);

  // ===========================
  // Stats
  // ===========================

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status
  ).length;

  const newCustomers = customers.filter((customer) => {
    if (!customer.createdAt) return false;

    const created = new Date(customer.createdAt);
    const now = new Date();

    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  const totalReceivables = customers.reduce(
    (total, customer) =>
      total + Number(customer.balance || 0),
    0
  );

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      await fetchCustomers();

      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="customer-page">

      <HomeHeader />

      <main className="customer-content">

        {/* =================================================
            IMAGE HERO
        ================================================= */}

        <section className="customer-hero">

          <div className="customer-hero-content">

            <span className="customer-hero-label">
              CUSTOMER MANAGEMENT
            </span>

            <h1>Customers</h1>

            <p>
              Build lasting relationships,
              one customer at a time.
            </p>

            <div className="customer-hero-line" />

            <span className="customer-hero-small">
              Manage your customers. Grow your business.
            </span>

          </div>

          <div className="customer-hero-overlay" />

          <div className="customer-hero-side">

            <span className="customer-hero-side-small">
              GOOD RELATIONSHIPS
            </span>

            <strong>
              Build a business
              <br />
              people remember.
            </strong>

          </div>

        </section>


        {/* =================================================
            STATS
        ================================================= */}

        <section className="customer-stats">

          <div className="customer-stat-card">

            <div className="customer-stat-icon">
              👥
            </div>

            <div>
              <span>Total Customers</span>
              <strong>{totalCustomers}</strong>
            </div>

          </div>


          <div className="customer-stat-card">

            <div className="customer-stat-icon">
              ✦
            </div>

            <div>
              <span>New Customers</span>
              <strong>{newCustomers}</strong>
            </div>

          </div>


          <div className="customer-stat-card">

            <div className="customer-stat-icon">
              ₹
            </div>

            <div>
              <span>Total Receivables</span>
              <strong>
                ₹{totalReceivables.toLocaleString("en-IN")}
              </strong>
            </div>

          </div>


          <div className="customer-stat-card">

            <div className="customer-stat-icon">
              ✓
            </div>

            <div>
              <span>Active Customers</span>
              <strong>{activeCustomers}</strong>
            </div>

          </div>

        </section>


        {/* =================================================
            MAIN
        ================================================= */}

        <section className="customer-main-grid">

          <div className="customer-table-area">

            {/* Toolbar */}

            <div className="customer-toolbar">

              <div className="customer-tabs">

                <button
                  type="button"
                  className={
                    activeTab === "all"
                      ? "customer-tab active"
                      : "customer-tab"
                  }
                  onClick={() => setActiveTab("all")}
                >
                  All Customers
                </button>

                <button
                  type="button"
                  className={
                    activeTab === "active"
                      ? "customer-tab active"
                      : "customer-tab"
                  }
                  onClick={() => setActiveTab("active")}
                >
                  Active
                </button>

                <button
                  type="button"
                  className={
                    activeTab === "inactive"
                      ? "customer-tab active"
                      : "customer-tab"
                  }
                  onClick={() => setActiveTab("inactive")}
                >
                  Inactive
                </button>

              </div>


              <div className="customer-search-area">

                <div className="customer-search">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />

                    <path
                      d="m20 20-4-4"
                      strokeLinecap="round"
                    />
                  </svg>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search customers..."
                  />

                </div>

                <button
                  type="button"
                  className="customer-filter-btn"
                >
                  Filter
                </button>

              </div>

            </div>


            <CustomerTable
              customers={filteredCustomers}
              loading={loading}
              onEdit={setEditingCustomer}
              onStatus={handleStatus}
            />

          </div>


          {/* Form */}

          <div className="customer-form-area">

            <CustomerForm
              editingCustomer={editingCustomer}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onClose={() => setEditingCustomer(null)}
            />

          </div>

        </section>


        {/* =================================================
            BOTTOM DESIGN
        ================================================= */}

        <section className="customer-bottom-design">

          <div className="customer-bottom-glow" />

          <div className="customer-bottom-content">

            <span className="customer-bottom-label">
              CUSTOMER RELATIONSHIPS
            </span>

            <h2>
              Better relationships.
              <br />
              Better business.
            </h2>

            <p>
              Every customer is an opportunity
              to build something lasting.
            </p>

            <div className="customer-bottom-pills">

              <div className="customer-bottom-pill">
                <span>✦</span>
                Strong relationships
              </div>

              <div className="customer-bottom-pill">
                <span>↗</span>
                Business growth
              </div>

              <div className="customer-bottom-pill">
                <span>♡</span>
                Customer first
              </div>

            </div>

          </div>


          <div className="customer-bottom-decoration">

            <div className="bottom-circle circle-one" />
            <div className="bottom-circle circle-two" />
            <div className="bottom-circle circle-three" />

            <div className="bottom-leaf leaf-one" />
            <div className="bottom-leaf leaf-two" />
            <div className="bottom-leaf leaf-three" />

          </div>

        </section>

      </main>

    </div>
  );
}

export default Customer;