import { useEffect, useState } from "react";
import { getPaymentReport } from "../api/reports.api";

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

  return (
    <div>
      <h2>Payment Report</h2>

      {/* ==========================
          Summary
      ========================== */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <div>
          <strong>Total Payments</strong>
          <p>{summary.totalPayments}</p>
        </div>

        <div>
          <strong>Total Amount</strong>
          <p>₹{summary.totalAmount}</p>
        </div>

        <div>
          <strong>Average Payment</strong>
          <p>₹{summary.averagePayment}</p>
        </div>

        <div>
          <strong>Highest Payment</strong>
          <p>₹{summary.highestPayment}</p>
        </div>

        <div>
          <strong>Lowest Payment</strong>
          <p>₹{summary.lowestPayment}</p>
        </div>
      </div>

      <hr />

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
            search: e.target.value,
            page: 1,
          }))
        }
      />

      <select
        value={filters.paymentMethod}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            paymentMethod: e.target.value,
            page: 1,
          }))
        }
      >
        <option value="">All Methods</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
        <option value="Bank">Bank</option>
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
        <option value="">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

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
              <th>Amount</th>
              <th>Method</th>
              <th>Note</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.customer?.name}</td>

                <td>₹{payment.amount}</td>

                <td>{payment.paymentMethod}</td>

                <td>{payment.note || "-"}</td>

                <td>
                  {new Date(
                    payment.createdAt
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
          disabled={pagination.page === 1}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page - 1,
            }))
          }
        >
          Previous
        </button>

        <span>
          {" "}
          Page {pagination.page} of{" "}
          {pagination.totalPages}
        </span>

        <button
          disabled={
            pagination.page ===
            pagination.totalPages
          }
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page + 1,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaymentReport;