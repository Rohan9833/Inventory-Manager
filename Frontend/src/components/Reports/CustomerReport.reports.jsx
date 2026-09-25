import { useEffect, useState } from "react";
import "../../css/CustomerReport.css";

import { getCustomerReport } from "../../api/reports.api";

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
    <div className="customer-report">

      <div className="customer-report-header">

        <div>
          <span className="customer-report-kicker">
            CUSTOMER ANALYTICS
          </span>

          <h2 className="customer-report-title">
            Customer Report
          </h2>

          <p className="customer-report-subtitle">
            View customer information and pending balances
          </p>
        </div>

      </div>


      {/* Filters */}

      <div className="customer-report-filters">

        <div className="customer-report-filter-heading">

          <div className="customer-report-filter-icon">
            ♙
          </div>

          <div>
            <h3>
              Filter Customers
            </h3>

            <span>
              Find customers and balance information
            </span>
          </div>

        </div>


        <div className="customer-report-filter-grid">

          <div className="customer-report-filter-group">

            <label>
              Search
            </label>

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

          </div>


          <div className="customer-report-filter-group">

            <label>
              Balance
            </label>

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
              <option value="">
                All Customers
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="clear">
                Clear
              </option>

            </select>

          </div>


          <div className="customer-report-filter-group">

            <label>
              Sort By
            </label>

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
              <option value="">
                Newest
              </option>

              <option value="oldest">
                Oldest
              </option>

              <option value="name_asc">
                Name A-Z
              </option>

              <option value="name_desc">
                Name Z-A
              </option>

              <option value="balance_asc">
                Balance ↑
              </option>

              <option value="balance_desc">
                Balance ↓
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* Table */}

      <div className="customer-report-card">

        <div className="customer-report-table-header">

          <div className="customer-report-table-title">

            <span>
              ♙
            </span>

            <div>

              <h3>
                Customers
              </h3>

              <p>
                {customers.length} customer
                {customers.length !== 1 ? "s" : ""}
                {" "}found
              </p>

            </div>

          </div>

          <span className="customer-report-count">
            {customers.length} Records
          </span>

        </div>


        <div className="customer-report-table-wrapper">

          {loading ? (

            <div className="customer-report-state">

              <div className="customer-report-loader"></div>

              <h3>
                Loading...
              </h3>

            </div>

          ) : customers.length === 0 ? (

            <div className="customer-report-state">

              <h3>
                No Customers Found
              </h3>

              <p>
                No customers match your current filters.
              </p>

            </div>

          ) : (

            <table className="customer-report-table">

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

                    <td>
                      <div className="customer-report-name">

                        <div className="customer-report-avatar">
                          {customer.name
                            ?.charAt(0)
                            ?.toUpperCase() || "?"}
                        </div>

                        <strong>
                          {customer.name}
                        </strong>

                      </div>
                    </td>

                    <td>
                      {customer.phone}
                    </td>

                    <td>
                      {customer.email || "-"}
                    </td>

                    <td>

                      <span
                        className={
                          Number(customer.balance) > 0
                            ? "customer-report-balance pending"
                            : "customer-report-balance clear"
                        }
                      >
                        ₹{customer.balance || 0}
                      </span>

                    </td>

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

        </div>


        {!loading && customers.length > 0 && (

          <div className="customer-report-pagination">

            <button
              disabled={
                !pagination.currentPage ||
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

            <span>
              Page{" "}
              <strong>
                {pagination.currentPage || 1}
              </strong>{" "}
              of{" "}
              <strong>
                {pagination.totalPages || 1}
              </strong>
            </span>

            <button
              disabled={
                !pagination.totalPages ||
                pagination.currentPage >= pagination.totalPages
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

export default CustomerReport;