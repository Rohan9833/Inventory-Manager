import { useEffect, useState } from "react";
import { getCustomerReport } from "../api/reports.api";

function CustomerReport() {
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    search: "",
    balance: "",
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

      const response = await getCustomerReport(filters);

      setCustomers(response.customers || []);
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
      <h2>Customer Report</h2>

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
        value={filters.balance}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            balance: e.target.value,
            page: 1,
          }))
        }
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="clear">Clear</option>
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
        <option value="name_asc">Name A-Z</option>
        <option value="name_desc">Name Z-A</option>
        <option value="balance_asc">Balance ↑</option>
        <option value="balance_desc">Balance ↓</option>
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
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Balance</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.name}</td>

                <td>{customer.phone}</td>

                <td>{customer.email}</td>

                <td>₹{customer.balance}</td>

                <td>
                  {new Date(
                    customer.createdAt
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
            pagination.currentPage === 1
          }
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
          Page{" "}
          {pagination.currentPage} of{" "}
          {pagination.totalPages}
        </span>

        <button
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
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomerReport;