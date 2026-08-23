import { useEffect, useState } from "react";
import { getPaymentReport } from "../api/reports.api";
import "../css/PaymentReport.css";

function PaymentReport() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({});
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    search: "",
    paymentMethod: "",
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

      const response = await getPaymentReport(filters);

      setPayments(response.payments || []);
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
  // Search
  // ==========================

  const handleSearch = (e) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }));
  };

  // ==========================
  // Payment Method
  // ==========================

  const handlePaymentMethod = (e) => {
    setFilters((prev) => ({
      ...prev,
      paymentMethod: e.target.value,
      page: 1,
    }));
  };

  // ==========================
  // Sort
  // ==========================

  const handleSort = (e) => {
    setFilters((prev) => ({
      ...prev,
      sort: e.target.value,
      page: 1,
    }));
  };

  // ==========================
  // Pagination
  // ==========================

  const handlePrevious = () => {
    setFilters((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  const handleNext = () => {
    setFilters((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  // ==========================
  // Payment Badge
  // ==========================

  const getPaymentMethodClass = (method) => {
    switch (method?.toUpperCase()) {
      case "CASH":
        return "payment-report-method-cash";

      case "UPI":
        return "payment-report-method-upi";

      case "CARD":
        return "payment-report-method-card";

      case "BANK":
        return "payment-report-method-bank";

      default:
        return "";
    }
  };

  return (
    <div className="payment-report">

      {/* ==========================
          Header
      ========================== */}

      <div className="payment-report-header">
        <div>
          <h2>Payment Report</h2>

          <p>
            Track customer payments and payment activity
          </p>
        </div>
      </div>

      {/* ==========================
          Summary
      ========================== */}

      <div className="payment-report-summary">

        <div className="payment-report-card">
          <span>Total Payments</span>

          <strong>
            {summary.totalPayments ?? 0}
          </strong>
        </div>

        <div className="payment-report-card">
          <span>Total Amount</span>

          <strong>
            ₹{summary.totalAmount ?? 0}
          </strong>
        </div>

        <div className="payment-report-card">
          <span>Average Payment</span>

          <strong>
            ₹{summary.averagePayment ?? 0}
          </strong>
        </div>

        <div className="payment-report-card">
          <span>Highest Payment</span>

          <strong>
            ₹{summary.highestPayment ?? 0}
          </strong>
        </div>

        <div className="payment-report-card">
          <span>Lowest Payment</span>

          <strong>
            ₹{summary.lowestPayment ?? 0}
          </strong>
        </div>

      </div>

      {/* ==========================
          Filters
      ========================== */}

      <div className="payment-report-filter-box">

        <div className="payment-report-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search customer..."
            value={filters.search}
            onChange={handleSearch}
          />

        </div>

        <select
          value={filters.paymentMethod}
          onChange={handlePaymentMethod}
          className="payment-report-select"
        >
          <option value="">
            All Methods
          </option>

          <option value="CASH">
            Cash
          </option>

          <option value="UPI">
            UPI
          </option>

          <option value="CARD">
            Card
          </option>

          <option value="BANK">
            Bank
          </option>
        </select>

        <select
          value={filters.sort}
          onChange={handleSort}
          className="payment-report-select"
        >
          <option value="">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>
        </select>

      </div>

      {/* ==========================
          Table Section
      ========================== */}

      <div className="payment-report-table-section">

        <div className="payment-report-table-header">

          <div>
            <h3>Payment History</h3>

            <p>
              All recorded customer payments
            </p>
          </div>

          <span className="payment-report-count">
            {payments.length} Records
          </span>

        </div>

        {/* IMPORTANT:
            Only this container scrolls
        */}

        <div className="payment-report-table-wrapper">

          {loading ? (
            <div className="payment-report-loading">
              <h3>Loading payments...</h3>
            </div>
          ) : payments.length === 0 ? (
            <div className="payment-report-empty">
              <div className="payment-report-empty-icon">
                ₹
              </div>

              <h3>No Payments Found</h3>

              <p>
                There are no payments matching your filters.
              </p>
            </div>
          ) : (
            <table className="payment-report-table">

              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Note</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {payments.map((payment) => (
                  <tr key={payment._id}>

                    <td>
                      <div className="payment-report-customer">

                        <div className="payment-report-avatar">
                          {payment.customer?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "?"}
                        </div>

                        <div>
                          <strong>
                            {payment.customer?.name || "-"}
                          </strong>

                          <span>
                            {payment.customer?.phone || ""}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <strong className="payment-report-amount">
                        ₹{payment.amount}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`payment-report-method ${getPaymentMethodClass(
                          payment.paymentMethod
                        )}`}
                      >
                        {payment.paymentMethod}
                      </span>
                    </td>

                    <td>
                      <span className="payment-report-note">
                        {payment.note || "-"}
                      </span>
                    </td>

                    <td>
                      <span className="payment-report-date">
                        {new Date(
                          payment.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          )}

        </div>

        {/* ==========================
            Pagination
        ========================== */}

        {!loading && payments.length > 0 && (
          <div className="payment-report-pagination">

            <button
              disabled={
                pagination.page === 1 ||
                filters.page === 1
              }
              onClick={handlePrevious}
            >
              ← Previous
            </button>

            <div className="payment-report-page-info">
              <span>Page</span>

              <strong>
                {pagination.page || filters.page}
              </strong>

              <span>of</span>

              <strong>
                {pagination.totalPages || 1}
              </strong>
            </div>

            <button
              disabled={
                (pagination.page || filters.page) >=
                (pagination.totalPages || 1)
              }
              onClick={handleNext}
            >
              Next →
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default PaymentReport;