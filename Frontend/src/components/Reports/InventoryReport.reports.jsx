import { useEffect, useState } from "react";
import "../../css/InventoryReport.css";

import { getInventoryReport } from "../../api/reports.api";

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

      <div className="inventory-report-header">

        <div>
          <span className="inventory-report-kicker">
            INVENTORY ANALYTICS
          </span>

          <h2 className="inventory-report-title">
            Inventory Report
          </h2>

          <p className="inventory-report-subtitle">
            Track your stock movements and inventory transactions
          </p>
        </div>

      </div>


      {/* Filters */}

      <div className="inventory-report-filter-section">

        <div className="inventory-report-filter-heading">

          <div className="inventory-report-filter-icon">
            ◫
          </div>

          <div>
            <h3>Filter Inventory</h3>
            <span>
              Customize your inventory history
            </span>
          </div>

        </div>


        <div className="inventory-report-filter-grid">

          <div className="inventory-report-filter-group">

            <label>
              Search Product
            </label>

            <input
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


          <div className="inventory-report-filter-group">

            <label>
              Transaction Type
            </label>

            <select
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
              <option value="IN">Stock In</option>
              <option value="OUT">Stock Out</option>
            </select>

          </div>


          <div className="inventory-report-filter-group">

            <label>
              Sort By
            </label>

            <select
              className="inventory-report-select"
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

              <option value="quantity_asc">
                Quantity ↑
              </option>

              <option value="quantity_desc">
                Quantity ↓
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* Table */}

      <div className="inventory-report-table-section">

        <div className="inventory-report-table-header">

          <div className="inventory-report-table-title">

            <span>
              ◫
            </span>

            <div>

              <h3>
                Inventory History
              </h3>

              <p>
                Recent stock in and stock out transactions
              </p>

            </div>

          </div>

          <span className="inventory-report-count">
            {inventory.length} Records
          </span>

        </div>


        {loading ? (

          <div className="inventory-report-state">

            <div className="inventory-report-loader"></div>

            <h3>
              Loading...
            </h3>

          </div>

        ) : inventory.length === 0 ? (

          <div className="inventory-report-state">

            <h3>
              No Inventory Records Found
            </h3>

            <p>
              No inventory transactions match your filters.
            </p>

          </div>

        ) : (

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

                    <td className="inventory-report-product">
                      {item.product?.name || "-"}
                    </td>

                    <td>

                      {item.type === "IN" ? (

                        <span className="inventory-report-type inventory-report-type-in">
                          + Stock In
                        </span>

                      ) : (

                        <span className="inventory-report-type inventory-report-type-out">
                          − Stock Out
                        </span>

                      )}

                    </td>

                    <td>
                      <span className="inventory-report-quantity">
                        {item.quantity}
                      </span>
                    </td>

                    <td className="inventory-report-reason">
                      {item.reason || "-"}
                    </td>

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


        {!loading && inventory.length > 0 && (

          <div className="inventory-report-pagination">

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

export default InventoryReport;