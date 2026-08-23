import { useEffect, useState } from "react";
import "../css/SalesReport.css";

import {
  getSalesReport,
  exportSalesReport,
} from "../api/reports.api";

function SalesReport() {
  const [sales, setSales] = useState([]);
  const [summary, setSummary] = useState({});
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    search: "",
    paymentStatus: "",
    sort: "",
    page: 1,
    limit: 10,
  });

  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Report
  // ==========================

  const fetchReport = async () => {
    try {
      setLoading(true);

      const response = await getSalesReport(filters);

      setSales(response.sales || []);
      setSummary(response.summary || {});
      setPagination(response.pagination || {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [filters]);

  // ==========================
  // Export PDF
  // ==========================

  const handleExport = async () => {
    try {
      const blob = await exportSalesReport(filters);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "sales-report.pdf";

      document.body.appendChild(link);
      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Payment Status Class
  // ==========================

  const getStatusClass = (status) => {
    switch (status) {
      case "PAID":
        return "sales-report-status-paid";

      case "PARTIAL":
        return "sales-report-status-partial";

      case "UNPAID":
        return "sales-report-status-unpaid";

      default:
        return "";
    }
  };

  return (
    <div className="sales-report">
      {/* ==========================
          Header
      ========================== */}

      <div className="sales-report-header">
        <div>
          <h2 className="sales-report-title">Sales Report</h2>

          <p className="sales-report-subtitle">
            Analyze your sales performance and revenue
          </p>
        </div>

        <button
          className="sales-report-export-btn"
          onClick={handleExport}
        >
          <span>↓</span>
          Export PDF
        </button>
      </div>

      {/* ==========================
          Summary
      ========================== */}

      <div className="sales-report-summary">
        <div className="sales-report-summary-card">
          <div className="sales-report-summary-icon">
            #
          </div>

          <div className="sales-report-summary-content">
            <span className="sales-report-summary-label">
              Total Sales
            </span>

            <strong className="sales-report-summary-value">
              {summary.totalSales ?? 0}
            </strong>
          </div>
        </div>

        <div className="sales-report-summary-card">
          <div className="sales-report-summary-icon sales-report-revenue-icon">
            ₹
          </div>

          <div className="sales-report-summary-content">
            <span className="sales-report-summary-label">
              Total Revenue
            </span>

            <strong className="sales-report-summary-value">
              ₹{summary.totalRevenue ?? 0}
            </strong>
          </div>
        </div>
      </div>

      {/* ==========================
          Filters
      ========================== */}

      <div className="sales-report-filter-card">
        <div className="sales-report-filter-header">
          <h3>Filters</h3>

          <span>Filter and sort sales data</span>
        </div>

        <div className="sales-report-filters">
          <div className="sales-report-filter-field sales-report-search-field">
            <label>Search Customer</label>

            <input
              type="text"
              placeholder="Search customer..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                  page: 1,
                }))
              }
            />
          </div>

          <div className="sales-report-filter-field">
            <label>Payment Status</label>

            <select
              value={filters.paymentStatus}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  paymentStatus: e.target.value,
                  page: 1,
                }))
              }
            >
              <option value="">All Status</option>

              <option value="PAID">Paid</option>

              <option value="PARTIAL">Partial</option>

              <option value="UNPAID">Unpaid</option>
            </select>
          </div>

          <div className="sales-report-filter-field">
            <label>Sort By</label>

            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value,
                  page: 1,
                }))
              }
            >
              <option value="">Newest</option>

              <option value="oldest">Oldest</option>

              <option value="amount_asc">
                Amount ↑
              </option>

              <option value="amount_desc">
                Amount ↓
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* ==========================
          Table Card
      ========================== */}

      <div className="sales-report-table-card">
        <div className="sales-report-table-header">
          <div>
            <h3>Sales History</h3>

            <p>
              {sales.length} sales found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="sales-report-loading">
            <div className="sales-report-loader"></div>

            <span>Loading sales...</span>
          </div>
        ) : sales.length === 0 ? (
          <div className="sales-report-empty">
            <div className="sales-report-empty-icon">
              📊
            </div>

            <h3>No Sales Found</h3>

            <p>
              No sales match your current filters.
            </p>
          </div>
        ) : (
          <div className="sales-report-table-wrapper">
            <table className="sales-report-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((sale) => (
                  <tr key={sale._id}>
                    <td>
                      <div className="sales-report-customer">
                        <div className="sales-report-avatar">
                          {sale.customer?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "?"}
                        </div>

                        <span>
                          {sale.customer?.name || "-"}
                        </span>
                      </div>
                    </td>

                    <td>
                      {sale.customer?.phone || "-"}
                    </td>

                    <td className="sales-report-amount">
                      ₹{sale.totalAmount ?? 0}
                    </td>

                    <td>
                      <span
                        className={`sales-report-status ${getStatusClass(
                          sale.paymentStatus
                        )}`}
                      >
                        {sale.paymentStatus}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ==========================
            Pagination
        ========================== */}

        {!loading && sales.length > 0 && (
          <div className="sales-report-pagination">
            <button
              className="sales-report-page-btn"
              disabled={
                pagination.currentPage === 1
              }
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
            >
              ← Previous
            </button>

            <div className="sales-report-page-info">
              <span>Page</span>

              <strong>
                {pagination.currentPage || 1}
              </strong>

              <span>of</span>

              <strong>
                {pagination.totalPages || 1}
              </strong>
            </div>

            <button
              className="sales-report-page-btn"
              disabled={
                pagination.currentPage ===
                pagination.totalPages
              }
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalesReport;