import { useEffect, useState } from "react";

import {
  getSalesReport,
  exportSalesReport,
} from "../api/reports.api";

function SalesReport() {
  const [sales, setSales] = useState([]);
  const [summary, setSummary] = useState({});
  const [pagination, setPagination] =
    useState({});

  const [filters, setFilters] = useState({
    search: "",
    paymentStatus: "",
    sort: "",
    page: 1,
    limit: 10,
  });

  const [loading, setLoading] =
    useState(true);

  // ==========================
  // Fetch Report
  // ==========================

  const fetchReport = async () => {
    try {
      setLoading(true);

      const response =
        await getSalesReport(filters);

      setSales(response.sales || []);

      setSummary(response.summary || {});

      setPagination(
        response.pagination || {}
      );
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

  const handleExport =
    async () => {
      try {
        const blob =
          await exportSalesReport(
            filters
          );

        const url =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          "sales-report.pdf";

        link.click();

        window.URL.revokeObjectURL(
          url
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
      <h2>Sales Report</h2>

      {/* ==========================
          Summary
      ========================== */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div>
          <strong>
            Total Sales
          </strong>

          <p>
            {
              summary.totalSales
            }
          </p>
        </div>

        <div>
          <strong>
            Revenue
          </strong>

          <p>
            ₹
            {
              summary.totalRevenue
            }
          </p>
        </div>
      </div>

      {/* ==========================
          Filters
      ========================== */}

      <input
        type="text"
        placeholder="Search Customer"
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            search:
              e.target.value,
            page: 1,
          }))
        }
      />

      <select
        value={
          filters.paymentStatus
        }
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            paymentStatus:
              e.target.value,
            page: 1,
          }))
        }
      >
        <option value="">
          All
        </option>

        <option value="PAID">
          Paid
        </option>

        <option value="PARTIAL">
          Partial
        </option>

        <option value="UNPAID">
          Unpaid
        </option>
      </select>

      <select
        value={filters.sort}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            sort: e.target.value,
          }))
        }
      >
        <option value="">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="amount_asc">
          Amount ↑
        </option>

        <option value="amount_desc">
          Amount ↓
        </option>
      </select>

      <button
        onClick={handleExport}
      >
        Export PDF
      </button>

      <hr />

      {/* ==========================
          Table
      ========================== */}

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
        >
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
                  {
                    sale.customer
                      ?.name
                  }
                </td>

                <td>
                  {
                    sale.customer
                      ?.phone
                  }
                </td>

                <td>
                  ₹
                  {
                    sale.totalAmount
                  }
                </td>

                <td>
                  {
                    sale.paymentStatus
                  }
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
      )}

      {/* ==========================
          Pagination
      ========================== */}

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <button
          disabled={
            pagination.currentPage ===
            1
          }
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page:
                prev.page - 1,
            }))
          }
        >
          Previous
        </button>

        <span>
          {" "}
          Page{" "}
          {
            pagination.currentPage
          }{" "}
          of{" "}
          {
            pagination.totalPages
          }{" "}
        </span>

        <button
          disabled={
            pagination.currentPage ===
            pagination.totalPages
          }
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page:
                prev.page + 1,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SalesReport;