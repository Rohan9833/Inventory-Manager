import { useEffect, useState } from "react";
import { getInventoryReport } from "../api/reports.api";
import "../css/InventoryReport.css";

function InventoryReport() {
  const [inventory, setInventory] = useState([]);
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    search: "",
    type: "",
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

      const response = await getInventoryReport(filters);

      setInventory(response.inventory || []);
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
    <div className="inventory-report">
      {/* ==========================
          Header
      ========================== */}

      <div className="inventory-report-header">
        <div>
          <h2 className="inventory-report-title">
            Inventory Report
          </h2>

          <p className="inventory-report-subtitle">
            Track your stock movements and inventory transactions
          </p>
        </div>
      </div>

      {/* ==========================
          Filters
      ========================== */}

      <div className="inventory-report-filter-section">
        {/* Search */}

        <div className="inventory-report-filter-group">
          <label
            className="inventory-report-filter-label"
            htmlFor="inventory-report-search"
          >
            Search
          </label>

          <input
            id="inventory-report-search"
            className="inventory-report-input"
            type="text"
            placeholder="Search Product"
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

        {/* Type */}

        <div className="inventory-report-filter-group">
          <label
            className="inventory-report-filter-label"
            htmlFor="inventory-report-type"
          >
            Transaction Type
          </label>

          <select
            id="inventory-report-type"
            className="inventory-report-select"
            value={filters.type}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                type: e.target.value,
                page: 1,
              }))
            }
          >
            <option value="">All</option>

            <option value="IN">
              Stock In
            </option>

            <option value="OUT">
              Stock Out
            </option>
          </select>
        </div>

        {/* Sort */}

        <div className="inventory-report-filter-group">
          <label
            className="inventory-report-filter-label"
            htmlFor="inventory-report-sort"
          >
            Sort By
          </label>

          <select
            id="inventory-report-sort"
            className="inventory-report-select"
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

            <option value="quantity_asc">
              Quantity ↑
            </option>

            <option value="quantity_desc">
              Quantity ↓
            </option>
          </select>
        </div>
      </div>

      {/* ==========================
          Table Section
      ========================== */}

      <div className="inventory-report-table-section">
        <div className="inventory-report-table-header">
          <div>
            <h3>Inventory History</h3>

            <p>
              Recent stock in and stock out transactions
            </p>
          </div>
        </div>

        {/* ==========================
            Loading
        ========================== */}

        {loading ? (
          <div className="inventory-report-state">
            <h3>Loading...</h3>
          </div>
        ) : inventory.length === 0 ? (
          <div className="inventory-report-state">
            <h3>No Inventory Records Found</h3>

            <p>
              No inventory transactions match your filters.
            </p>
          </div>
        ) : (
          /* ==========================
             IMPORTANT:
             ONLY TABLE SCROLLS
          ========================== */

          <div className="inventory-report-table-wrapper">
            <table className="inventory-report-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Reason</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {inventory.map((item) => (
                  <tr key={item._id}>
                    {/* Product */}

                    <td className="inventory-report-product">
                      {item.product?.name || "-"}
                    </td>

                    {/* Type */}

                    <td>
                      {item.type === "IN" ? (
                        <span className="inventory-report-type inventory-report-type-in">
                          Stock In
                        </span>
                      ) : (
                        <span className="inventory-report-type inventory-report-type-out">
                          Stock Out
                        </span>
                      )}
                    </td>

                    {/* Quantity */}

                    <td>
                      <span className="inventory-report-quantity">
                        {item.quantity}
                      </span>
                    </td>

                    {/* Reason */}

                    <td className="inventory-report-reason">
                      {item.reason || "-"}
                    </td>

                    {/* Date */}

                    <td>
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==========================
          Pagination
      ========================== */}

      <div className="inventory-report-pagination">
        <button
          className="inventory-report-pagination-btn"
          disabled={pagination.currentPage === 1}
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              page: prev.page - 1,
            }))
          }
        >
          Previous
        </button>

        <span className="inventory-report-pagination-info">
          Page {pagination.currentPage || 1} of{" "}
          {pagination.totalPages || 1}
        </span>

        <button
          className="inventory-report-pagination-btn"
          disabled={
            pagination.currentPage ===
              pagination.totalPages ||
            !pagination.totalPages
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

export default InventoryReport;